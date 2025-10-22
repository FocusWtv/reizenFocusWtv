import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Bedankt() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verzonden = sessionStorage.getItem("formVerzonden");
    const params = new URLSearchParams(location.search);
    const fromFs = params.get("fs") === "1";
    const fromFormsubmit = typeof document !== 'undefined' && document.referrer.includes("formsubmit.co");

    // als niet verzonden => enkel toelaten wanneer via FormSubmit of fs=1
    if (!verzonden && !fromFs && !fromFormsubmit) {
      navigate("/", { replace: true });
      return;
    }

    // Verwijder vlag zodra gebruiker deze pagina bezoekt
    sessionStorage.removeItem("formVerzonden");
  }, [navigate, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bedankt voor je inschrijving!
        </h1>
        <p className="text-gray-600 mb-6">
          We hebben je gegevens goed ontvangen. Je krijgt zo dadelijk een
          bevestiging per e-mail met alle details. <br/>
          Check je spam folder als je deze niet terug vindt. <br/>
          Bij dringende vragen die je niet terug vindt op de reis pagina kun je contact opnemen met: <br/>
          <a href="mailto:cruise@focus-wtv.be" className="text-blue-600 hover:text-blue-700">cruise@focus-wtv.be</a>
        </p>
        <div className="mb-6">
        <a
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-200"
        >
          Terug naar alle reizen
        </a>
        </div>
        <div className="mb-6">
        <a
          href="https://focus-wtv.be/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-200"
        >
          Terug naar Focus-WTV
        </a>
        </div>
      </div>
    </div>
  );
}
