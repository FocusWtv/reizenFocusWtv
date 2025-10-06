import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { Analytics } from "@vercel/analytics/react";

// Rest van uw component

const Icon = ({ children }) => (
  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#162b58] text-white text-xs mr-2">{children}</span>
);

const InfoavondDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', consent: false, persons: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'events'), where('slug', '==', slug), limit(1));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setEvent({ id: snap.docs[0].id, ...snap.docs[0].data() });
        } else {
          setError('Infoavond niet gevonden');
        }
      } catch (e) {
        setError('Fout bij laden van infoavond');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Naam is verplicht';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Geldig e‑mailadres is verplicht';
    if (!form.consent) return 'Gelieve toestemming te geven voor contact';
    if (!accessKey) return 'Web3Forms access key ontbreekt (VITE_WEB3FORMS_ACCESS_KEY)';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) { alert(msg); return; }

    try {
      setSending(true);

      // Web3Forms verwacht form-data (niet JSON)
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('subject', `Inschrijving infoavond: ${event?.title || slug}`);
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone || '-');
      formData.append('persons', form.persons || '-');
      formData.append('message', form.message || '-');
      formData.append('event_title', event?.title || '');
      formData.append('event_date', event?.dateTime || '');
      formData.append('event_location', event?.locationName || '');
      formData.append('event_address', event?.address || '');
      formData.append('event_slug', slug);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: '', email: '', phone: '', message: '', consent: false, persons: '' });
      } else {
        alert('Verzenden mislukt: ' + (data.message || 'Onbekende fout'));
      }
    } catch (_e) {
      alert('Verzenden mislukt. Controleer je internetverbinding en probeer opnieuw.');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="text-center py-12">Laden...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!event) return null;

  return (
    <div className="mx-4 lg:mx-32 py-8">
      {event.heroUrl && (
        <div className="mb-6">
          <img src={event.heroUrl} alt={event.title} className="w-full max-h-[480px] object-cover rounded" />
        </div>
      )}
      <h1 className="text-3xl font-bold text-[#162b58] mb-2">{event.title}</h1>
      {event.dateTime && <p className="text-gray-700 mb-3">{event.dateTime}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          {event.locationName && (
            <p className="text-gray-800 flex items-start mb-2"><Icon>📍</Icon><span>{event.locationName}</span></p>
          )}
          {event.address && (
            <p className="text-gray-800 flex items-start mb-2"><Icon>🏢</Icon><span>{event.address}</span></p>
          )}
        </div>
      </div>

      {event.description && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Over deze infoavond</h2>
          <p className="text-gray-800 whitespace-pre-line">{event.description}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Inschrijven</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Naam en voornaam *</label>
            <input name="name" type="text" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E‑mailadres *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
            <input name="phone" type="text" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aantal personen*</label>
            <input name="persons" type="number" min="1" value={form.persons} onChange={handleChange} className="w-full px-3 py-2 border rounded bg-white appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Eventuele vragen/opmerkingen</label>
            <textarea name="message" rows={4} value={form.message} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="md:col-span-2 flex items-start gap-2">
            <input id="consent" name="consent" type="checkbox" checked={form.consent} onChange={handleChange} className="mt-1" />
            <label htmlFor="consent" className="text-sm text-gray-700">Deze site wordt beschermd door reCAPTCHA. Ik geef toestemming om mij te contacteren over deze infoavond.</label>
          </div>
          <div className="md:col-span-2 flex justify-end gap-2">
            {sent && <span className="text-green-600 text-sm self-center">Bedankt! Je inschrijving werd verstuurd.</span>}
            <button type="submit" disabled={sending} className="px-6 py-2 rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-50">
              {sending ? 'Verzenden…' : 'Inschrijven'}
            </button>
          </div>
        </form>
      </div>

      {(event.contactText || event.contactPhone || event.contactEmail) && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Contact & reservatie</h2>
          {event.contactText && (
            <div className="text-gray-800 mb-3" dangerouslySetInnerHTML={{ __html: event.contactText }} />
          )}
          {event.contactPhone && (
            <p className="text-gray-800 flex items-start mb-2"><Icon>📞</Icon><span>{event.contactPhoneLabel ? `${event.contactPhoneLabel} ` : ''}{event.contactPhone}</span></p>
          )}
          {event.contactEmail && (
            <p className="text-gray-800 flex items-start mb-2"><Icon>✉️</Icon><span>{event.contactEmailLabel ? `${event.contactEmailLabel} ` : ''}<a className="text-blue-700 underline" href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a></span></p>
          )}
        </div>
      )}

      <div className="mt-10 flex justify-start">
        <a href="/" className="px-6 py-2 rounded-full text-white bg-[#162b58] hover:bg-[#4ab0e1]">Terug naar reizen</a>
      </div>
    </div>
  );
};

export default InfoavondDetail;
