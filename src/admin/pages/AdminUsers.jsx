import { useState } from 'react';

const AdminUsers = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gebruikers (Admins)</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow max-w-3xl">
        <h2 className="text-xl font-semibold mb-3">Hoe voeg je een nieuwe admin toe?</h2>
        <ol className="list-decimal ml-6 space-y-2 text-gray-700">
          <li>
            Ga naar <span className="font-medium">Firebase Console → Authentication → Users</span> en klik
            <span className="font-medium"> “Add user”</span>. Vul e‑mail en wachtwoord in.
          </li>
          <li>
            Zet daarna lokaal de admin‑claim:
            <pre className="mt-2 bg-gray-100 p-3 rounded text-sm overflow-auto">
{`node scripts/grantAdmin.cjs email@nieuwe-admin.be`}
            </pre>
            <p className="mt-2 text-sm text-gray-600">
              Voorbeeld:
            </p>
            <pre className="mt-1 bg-gray-100 p-3 rounded text-sm overflow-auto">
{`node scripts/grantAdmin.cjs admin@voorbeeld.be`}
            </pre>
          </li>
          <li>
            De nieuwe admin kan daarna inloggen op de admin‑pagina. (Log zonodig even uit/in om de claim te vernieuwen.)
          </li>
        </ol>
      </div>

      <div className="bg-white p-6 rounded-lg shadow max-w-3xl mt-6">
        <h2 className="text-xl font-semibold mb-3">Andere acties (lokaal script)</h2>
        <p className="text-gray-700 mb-3">Gebruik onderstaande scripts voor beheer door een bestaande admin.</p>
        <ul className="list-disc ml-6 space-y-3 text-gray-700">
          <li>
            Wachtwoord wijzigen:
            <pre className="mt-2 bg-gray-100 p-3 rounded text-sm overflow-auto">
{`node scripts/updatePassword.cjs <email> <nieuw-wachtwoord>`}
            </pre>
          </li>
          <li>
            Admin verwijderen:
            <pre className="mt-2 bg-gray-100 p-3 rounded text-sm overflow-auto">
{`node scripts/deleteUser.cjs <email>`}
            </pre>
          </li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Let op: deze scripts gebruiken jouw lokale service account of de env‑variabelen, net zoals
          <code className="mx-1">scripts/grantAdmin.cjs</code>.
        </p>
      </div>
    </div>
  );
};

export default AdminUsers;
