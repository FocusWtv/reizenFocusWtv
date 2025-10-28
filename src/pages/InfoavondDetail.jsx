import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

// Rest van uw component

const Icon = ({ children }) => (
  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#162b58] text-white text-xs mr-2">
    {children}
  </span>
);

const InfoavondDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bepaal juiste redirect voor FormSubmit afhankelijk van omgeving
  const nextRedirectBase = import.meta.env.PROD
    ? "https://reizen.focus-wtv.be/bedankt"
    : "http://localhost:5173/bedankt";
  const nextRedirectUrl = `${nextRedirectBase}?fs=1`;

  // FormSubmit action zonder querystring; redirect gebeurt via hidden _next veld
  const formSubmitTo =
    import.meta.env.VITE_FORMSUBMIT_TO || "cruise@focus-wtv.be";
  const formActionUrl = `https://formsubmit.co/${encodeURIComponent(
    formSubmitTo
  )}`;

  // Fallback provider (optioneel): Web3Forms access key via env
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

  // Helper: fetch met timeout
  const postWithTimeout = async (url, body, timeoutMs = 8000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: controller.signal,
      });
      clearTimeout(id);
      return res;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  };

  // Submit handler met fallback-keten: FormSubmit -> Web3Forms -> mailto
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isSubmitting) return; // Prevent double submission
      setIsSubmitting(true);
      
      const form = e.currentTarget;

      // Honeypot check
      const honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value) {
        return; // stil negeren
      }

      const valueOf = (name) =>
        (form.querySelector(`[name="${name}"]`)?.value || "").toString();

      const naam = valueOf("Naam");
      const voornaam = valueOf("Voornaam");
      const email = valueOf("email");
      const telefoon = valueOf("Telefoonnummer");
      const personen = valueOf("Aantal personen") || valueOf("Personen");
      const opmerkingen =
        valueOf("Vragen of opmerkingen") || valueOf("opmerkingen");
      const infoavondTitel = event?.title || slug;

      // 1) Probeer FormSubmit (server-side redirect kan falen; we forceren client redirect op success)
      try {
        const params = new URLSearchParams();
        params.set("_subject", `Inschrijving infoavond: ${infoavondTitel}`);
        params.set("_template", "table");
        params.set("_captcha", "false");
        params.set("Infoavond", infoavondTitel);
        params.set("Naam", naam);
        params.set("Voornaam", voornaam);
        params.set("email", email);
        params.set("Telefoonnummer", telefoon);
        params.set("Aantal personen", personen || "1");
        params.set("Vragen of opmerkingen", opmerkingen);

        const res = await postWithTimeout(
          formActionUrl,
          params.toString(),
          8000
        );
        if (res && (res.ok || (res.status >= 200 && res.status < 400))) {
          sessionStorage.setItem("formVerzonden", "true");
          setIsSubmitting(false);
          window.location.href = nextRedirectUrl;
          return;
        }
        // anders door naar fallback
      } catch (_err) {
        setIsSubmitting(false);
      }

      // 2) Fallback: Web3Forms (alleen als key gezet is)
      if (web3formsKey) {
        try {
          const fd = new FormData();
          fd.set("access_key", web3formsKey);
          fd.set("subject", `Inschrijving infoavond: ${infoavondTitel}`);
          fd.set("Infoavond", infoavondTitel);
          fd.set("Naam", naam);
          fd.set("Voornaam", voornaam);
          fd.set("email", email);
          fd.set("Telefoonnummer", telefoon);
          fd.set("Aantal personen", personen || "1");
          fd.set("Vragen of opmerkingen", opmerkingen);

          const res2 = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: fd,
          });
          if (res2 && res2.ok) {
            sessionStorage.setItem("formVerzonden", "true");
            setIsSubmitting(false);
            window.location.href = nextRedirectUrl;
            return;
          }
        } catch (_err2) {
          setIsSubmitting(false);
        }
      }

      // 3) Laatste redmiddel: open mailto met prefilled body en redirect
      const lijnen = [
        `Infoavond: ${infoavondTitel}`,
        `Naam: ${naam}`,
        `Voornaam: ${voornaam}`,
        `Email: ${email}`,
        `Telefoonnummer: ${telefoon}`,
        `Aantal personen: ${personen || "1"}`,
        `Vragen/opmerkingen: ${opmerkingen}`,
      ];
      const mailto = `mailto:${formSubmitTo}?subject=${encodeURIComponent(
        `Inschrijving infoavond: ${infoavondTitel}`
      )}&body=${encodeURIComponent(lijnen.join("\n"))}`;
      window.location.href = mailto;
      // direct ook naar bedankt-pagina voor een consistente UX
      setTimeout(() => {
        sessionStorage.setItem("formVerzonden", "true");
        setIsSubmitting(false);
        window.location.href = nextRedirectUrl;
      }, 300);
    } catch (_e) {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "events"),
          where("slug", "==", slug),
          limit(1)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          setEvent({ id: snap.docs[0].id, ...snap.docs[0].data() });
        } else {
          setError("Infoavond niet gevonden");
        }
      } catch (e) {
        setError("Fout bij laden van infoavond");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  // Check if form was submitted (from sessionStorage)
  useEffect(() => {
    const formSubmitted = sessionStorage.getItem("formVerzonden");
    if (formSubmitted === "true") {
      setSent(true);
      sessionStorage.removeItem("formVerzonden");
    }
  }, []);

  if (loading) return <div className="text-center py-12">Laden...</div>;
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!event) return null;

  return (
    <div className="mx-4 lg:mx-32 py-8">
      {event.heroUrl && (
        <div className="mb-6">
          <img
            src={event.heroUrl}
            alt={event.title}
            className="w-full max-h-[480px] object-cover rounded"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold text-[#162b58] mb-2">{event.title}</h1>
      {event.dateTime && <p className="text-gray-700 mb-3">{event.dateTime}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          {event.locationName && (
            <p className="text-gray-800 flex items-start mb-2">
              <Icon>📍</Icon>
              <span>{event.locationName}</span>
            </p>
          )}
          {event.address && (
            <p className="text-gray-800 flex items-start mb-2">
              <Icon>🏢</Icon>
              <span>{event.address}</span>
            </p>
          )}
        </div>
      </div>

      {event.description && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Over deze infoavond</h2>
          <p className="text-gray-800 whitespace-pre-line">
            {event.description}
          </p>
        </div>
      )}

      <div className="bg-white p-6 rounded border-2 shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Inschrijven</h2>
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* FormSubmit hidden fields */}
          <input
            type="hidden"
            name="_subject"
            value={`Inschrijving infoavond: ${event?.title || slug}`}
          />
          <input type="hidden" name="_next" value={nextRedirectUrl} />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          {/* Honeypot veld tegen spam */}
          <div className="sr-only" aria-hidden="true">
            <label>Laat dit veld leeg</label>
            <input type="text" name="_honey" tabIndex="-1" autoComplete="off" />
          </div>
          <input type="hidden" name="Infoavond" value={event?.title || ""} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Naam *
            </label>
            <input
              name="Naam"
              type="text"
              className="w-full px-3 py-2 border-4 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Voornaam *
            </label>
            <input
              name="Voornaam"
              type="text"
              className="w-full px-3 py-2 border-4 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E‑mailadres *
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-3 py-2 border-4 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefoonnummer
            </label>
            <input
              name="Telefoonnummer"
              type="text"
              className="w-full px-3 py-2 border-4 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aantal personen*
            </label>
            <div className="relative">
              <input
                name="Aantal personen"
                type="number"
                min="1"
                max="8"
                defaultValue="1"
                className="w-full px-3 py-2 pr-12 border-4 rounded bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="absolute right-2 top-0 h-full flex flex-col justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.target.parentElement.previousElementSibling;
                    const currentValue = parseInt(input.value) || 1;
                    if (currentValue < 8) {
                      input.value = currentValue + 1;
                    }
                  }}
                  className="text-gray-600 hover:text-gray-800 text-xs leading-none pb-1"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.target.parentElement.previousElementSibling;
                    const currentValue = parseInt(input.value) || 1;
                    if (currentValue > 1) {
                      input.value = currentValue - 1;
                    }
                  }}
                  className="text-gray-600 hover:text-gray-800 text-xs leading-none pt-1"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eventuele vragen/opmerkingen indien u deze niet terug vindt op de
              reis pagina
            </label>
            <textarea
              name="Vragen of opmerkingen"
              rows={4}
              className="w-full px-3 py-2 border-4 rounded"
            />
          </div>
          <div className="md:col-span-2 flex items-start gap-2">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              className="mt-1"
              required
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              Ik geef toestemming om mij te contacteren over deze infoavond.
            </label>
          </div>
          <div className="md:col-span-2 flex justify-end gap-2">
            {sent && (
              <span className="text-green-600 text-sm self-center">
                Je inschrijving werd verstuurd. Je ontvangt zodadelijk een
                bevestiging per e-mail.
              </span>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Verzenden...
                </span>
              ) : (
                'Inschrijven'
              )}
            </button>
          </div>
        </form>
      </div>

      {(event.contactText || event.contactPhone || event.contactEmail) && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Contact & reservatie</h2>
          {event.contactText && (
            <div
              className="text-gray-800 mb-3"
              dangerouslySetInnerHTML={{ __html: event.contactText }}
            />
          )}
          {event.contactPhone && (
            <p className="text-gray-800 flex items-start mb-2">
              <Icon>📞</Icon>
              <span>
                {event.contactPhoneLabel ? `${event.contactPhoneLabel} ` : ""}
                {event.contactPhone}
              </span>
            </p>
          )}
          {event.contactEmail && (
            <p className="text-gray-800 flex items-start mb-2">
              <Icon>✉️</Icon>
              <span>
                {event.contactEmailLabel ? `${event.contactEmailLabel} ` : ""}
                <a
                  className="text-blue-700 underline"
                  href={`mailto:${event.contactEmail}`}
                >
                  {event.contactEmail}
                </a>
              </span>
            </p>
          )}
        </div>
      )}

      <div className="mt-10 flex justify-start">
        <a
          href="/"
          className="px-6 py-2 rounded-full text-white bg-[#162b58] hover:bg-[#4ab0e1]"
        >
          Terug naar reizen
        </a>
      </div>
    </div>
  );
};

export default InfoavondDetail;
