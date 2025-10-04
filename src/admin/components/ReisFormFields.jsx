import React from 'react';

const ReisFormFields = ({ 
  title, 
  setTitle, 
  dateRange, 
  setDateRange, 
  slug, 
  setSlug, 
  status, 
  setStatus,
  heroUrl,
  setHeroUrl,
  heroAlt,
  setHeroAlt,
  cards,
  selectedCardId,
  setSelectedCardId,
  handleSelectCard,
  isNew
}) => {
  return (
    <div className="space-y-6">
      {/* Hero afbeelding - EERST */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Hero afbeelding</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Koppel aan homepage kaart</label>
          <select 
            value={selectedCardId} 
            onChange={e => handleSelectCard(e.target.value)} 
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecteer kaart...</option>
            {cards.map(card => (
              <option key={card.id} value={card.id}>{card.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alt-tekst afbeelding</label>
          <input 
            type="text" 
            value={heroAlt} 
            onChange={e => setHeroAlt(e.target.value)} 
            className="w-full border rounded px-3 py-2" 
            placeholder="Beschrijving van de afbeelding" 
          />
        </div>
        {heroUrl && (
          <div className="mt-2">
            <img src={heroUrl} alt={heroAlt} className="w-32 h-24 object-cover rounded" />
          </div>
        )}
      </div>

      {/* Basisvelden - DAARNA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titel (verplicht)</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="w-full border rounded px-3 py-2" 
            placeholder="bv. Zuid‑Finland reis" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
          <input 
            type="text" 
            value={dateRange} 
            onChange={e => setDateRange(e.target.value)} 
            className="w-full border rounded px-3 py-2" 
            placeholder="bv. 15‑25 maart 2025" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input 
            type="text" 
            value={slug} 
            onChange={e => setSlug(e.target.value)} 
            className="w-full border rounded px-3 py-2" 
            placeholder="bv. zuid-finland-reis" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            value={status} 
            onChange={e => setStatus(e.target.value)} 
            className="w-full border rounded px-3 py-2"
          >
            <option value="beschikbaar">Beschikbaar</option>
            <option value="volzet">Volzet</option>
          </select>
        </div>
      </div>

    </div>
  );
};

export default ReisFormFields;
