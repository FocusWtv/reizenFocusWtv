import React from 'react';

const AdminInstructies = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#162b58] mb-8">Admin Instructies</h1>
        
        <div className="space-y-8">
          {/* Welkom sectie */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-[#162b58] mb-4">Welkom bij Focus & WTV Reizen Admin</h2>
            <p className="text-gray-700">
              Deze pagina bevat alle instructies die u nodig heeft om reizen en infoavonden te beheren. 
              Gebruik de navigatie in de sidebar om naar de verschillende secties te gaan. Klik op Focus & WTV reizen om deze instructiepagina te zien.
            </p>
          </section>

          {/* Reizen beheren */}
          <section>
            <h2 className="text-2xl font-semibold text-[#162b58] mb-4">Reizen Beheren</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-[#162b58] mb-3">Nieuwe reis aanmaken:</h3>
               <ul className="space-y-2 text-gray-700" style={{listStyleType: 'none'}}>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 1:</strong> Klik eerst op "Homepage" in de sidebar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 2:</strong> Klik op "Nieuwe kaart" knop</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 3:</strong> Vul verplichte velden in:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Titel (bijv. "Egypte 2025")</li>
                      <li>Datum van tot (bijv. "15-25 maart 2025")</li>
                      <li>Status (open/volzet/beperkt)</li>
                      <li>Slug (bijv. "egypte-2025")</li>
                    </ul>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 4:</strong> Upload de afbeelding die aan de voorkant van de kaart wordt getoond (vul eerst slug in!)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 5:</strong> Klik "Opslaan" om de reiskaart te maken (vergeet niet de de kaart te publiceren door op pub te klikken)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 6:</strong> Met de pijltjesknoppen bepaal je de volgorde van weergave van de reiskaarten op de homepage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 7:</strong> Ga naar "Reizen" in de sidebar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 8:</strong> Klik op "Nieuwe reis" en selecteer de aangemaakte reiskaart</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 9:</strong> Voeg alle reisdetails toe (intro, route, verblijf, prijzen, afbeeldingen etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 10:</strong> Klik "Opslaan" boven- of onderaan de pagina, de reis wordt opgeslagen als concept. Klik daarna op "Publiceer" om de reis te publiceren</span>
                </li>
               </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <h3 className="text-lg font-medium text-[#162b58] mb-3">Bestaande reis bewerken:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700"> <ul className="space-y-2 text-gray-700" style={{listStyleType: 'none'}}>
                    <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 1:</strong> Klik op "Reizen" in de sidebar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 2:</strong> Klik op Edit om de reis te bewerken of Delete om te verwijderen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 3:</strong> Maak uw wijzigingen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 4:</strong> Klik "Opslaan" boven- of onderaan de pagina om de wijzigingen op te slaan en daarna op "Publiceer" om de reis opnieuw openbaar te zetten</span>
                </li>
              </ul>
              </ol>
            </div>
          </section>

          {/* Infoavonden beheren */}
          <section>
            <h2 className="text-2xl font-semibold text-[#162b58] mb-4">Infoavonden Beheren</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-[#162b58] mb-3">Nieuwe infoavond aanmaken:</h3>
              <ul className="space-y-2 text-gray-700" style={{listStyleType: 'none'}}>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 1:</strong> Klik op "Infoavonden" in de sidebar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 2:</strong> Klik op "Nieuwe infoavond" knop</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 3:</strong> Vul titel, datum, locatie en beschrijving in</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 4:</strong> Upload dezelfde afbeelding die aan de voorkant van de kaart wordt getoond van de reis waarover de infoavond gaat</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 5:</strong> Voeg contact informatie toe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 6:</strong> Klik "Opslaan" om te publiceren</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">✓</span>
                  <span><strong>Stap 7:</strong> Met de pijltjesknoppen op de foto bepaal je de volgorde van weergave van de reiskaarten op de homepage</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-[#162b58] mb-4">Hulp Nodig?</h2>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-700">
                Als u vragen heeft of hulp nodig heeft bij het beheren van de website, 
                neem dan contact op met Lindsey.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminInstructies;
