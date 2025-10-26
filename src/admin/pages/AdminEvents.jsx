import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { vercelUploadImage } from '../../lib/apiClient';
import RichText from '../components/RichText';
import { getFunctions, httpsCallable } from 'firebase/functions';

const toSlug = (s) => s
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/gi, '-')
  .replace(/^-+|-+$/g, '');

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState('');

  const loadEvents = async () => {
    try {
      const q = query(collection(db, 'events'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // Detecteer en log blob URLs voor debugging
      list.forEach(event => {
        if (event.heroUrl && event.heroUrl.startsWith('blob:')) {
          console.warn(`Event "${event.title}" heeft blob URL:`, event.heroUrl);
        }
      });
      
      setEvents(list);
    } catch (_e) {
      setEvents([]);
    }
  };

  useEffect(() => {
    const loadCards = async () => {
      try {
        const q = query(collection(db, 'homepage_cards'), orderBy('order', 'asc'));
        const snap = await getDocs(q);
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setCards(list);
      } catch (_e) {}
    };
    loadCards();
    loadEvents();
  }, []);

  const [newEvent, setNewEvent] = useState({
    title: '',
    slug: '',
    date: '',
    imageUrl: '',
    relatedCardSlug: '',
    locationName: '',
    address: '',
    description: '',
    contactPhoneLabel: '',
    contactPhone: '',
    contactEmailLabel: '',
    contactEmail: '',
    contactText: ''
  });
  const [savingEvent, setSavingEvent] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [checkingExpired, setCheckingExpired] = useState(false);

  const handlePickCard = (cardId) => {
    setSelectedCardId(cardId);
    const card = cards.find(c => c.id === cardId);
    if (card) {
      setNewEvent(v => ({ ...v, imageUrl: card.imageUrl || '', relatedCardSlug: card.slug || '' }));
    }
  };

  const validate = () => {
    if (!newEvent.title.trim()) return 'Titel is verplicht';
    if (!newEvent.slug.trim() || !/^[-a-z0-9]+$/i.test(newEvent.slug)) return 'Geldige slug is verplicht (letters/cijfers/koppelteken)';
    return '';
  };

  const handleSaveEvent = async () => {
    const msg = validate();
    if (msg) { setSaveError(msg); return; }
    try {
      setSaveError('');
      setSavingEvent(true);
      if (editingId) {
        await updateDoc(doc(db, 'events', editingId), {
          title: newEvent.title,
          slug: newEvent.slug.toLowerCase(),
          dateTime: newEvent.date,
          heroUrl: newEvent.imageUrl || '',
          relatedCardSlug: newEvent.relatedCardSlug || '',
          locationName: newEvent.locationName || '',
          address: newEvent.address || '',
          description: newEvent.description || '',
          contactPhoneLabel: newEvent.contactPhoneLabel || '',
          contactPhone: newEvent.contactPhone || '',
          contactEmailLabel: newEvent.contactEmailLabel || '',
          contactEmail: newEvent.contactEmail || '',
          contactText: newEvent.contactText || '',
          updatedAt: serverTimestamp()
        });
      } else {
        const nextOrder = events.length ? Math.max(...events.map(e => e.order ?? 0)) + 1 : 1;
        await addDoc(collection(db, 'events'), {
          title: newEvent.title,
          slug: newEvent.slug.toLowerCase(),
          dateTime: newEvent.date,
          heroUrl: newEvent.imageUrl || '',
          relatedCardSlug: newEvent.relatedCardSlug || '',
          locationName: newEvent.locationName || '',
          address: newEvent.address || '',
          description: newEvent.description || '',
          contactPhoneLabel: newEvent.contactPhoneLabel || '',
          contactPhone: newEvent.contactPhone || '',
          contactEmailLabel: newEvent.contactEmailLabel || '',
          contactEmail: newEvent.contactEmail || '',
          contactText: newEvent.contactText || '',
          published: false,
          order: nextOrder,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setNewEvent({ title: '', slug: '', date: '', imageUrl: '', relatedCardSlug: '', locationName: '', address: '', description: '', contactPhoneLabel: '', contactPhone: '', contactEmailLabel: '', contactEmail: '', contactText: '' });
      setSelectedCardId('');
      setEditingId(null);
      setSlugTouched(false);
      setShowForm(false);
      await loadEvents();
    } catch (e) {
      setSaveError('Opslaan mislukt: ' + (e?.message || e));
    } finally {
      setSavingEvent(false);
    }
  };

  const startEdit = (ev) => {
    setEditingId(ev.id);
    
    // Vervang blob URLs door lege string om CORS problemen te voorkomen
    const cleanHeroUrl = ev.heroUrl && ev.heroUrl.startsWith('blob:') ? '' : (ev.heroUrl || '');
    
    setNewEvent({
      title: ev.title || '',
      slug: ev.slug || '',
      date: ev.dateTime || '',
      imageUrl: cleanHeroUrl,
      relatedCardSlug: ev.relatedCardSlug || '',
      locationName: ev.locationName || '',
      address: ev.address || '',
      description: ev.description || '',
      contactPhoneLabel: ev.contactPhoneLabel || '',
      contactPhone: ev.contactPhone || '',
      contactEmailLabel: ev.contactEmailLabel || '',
      contactEmail: ev.contactEmail || '',
      contactText: ev.contactText || ''
    });
    const matchCard = cards.find(c => c.slug === ev.relatedCardSlug);
    setSelectedCardId(matchCard ? matchCard.id : '');
    setSlugTouched(true);
    setShowForm(true);
    
    // Scroll naar boven van de pagina
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (ev) => {
    if (!confirm(`Verwijder infoavond "${ev.title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'events', ev.id));
      await loadEvents();
    } catch (_e) {}
  };

  const togglePublish = async (event) => {
    try {
      await updateDoc(doc(db, 'events', event.id), { published: !event.published, updatedAt: serverTimestamp() });
      await loadEvents();
    } catch (_e) {}
  };

  const moveOrder = async (index, direction) => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= events.length) return;
    const a = events[index];
    const b = events[target];
    try {
      await Promise.all([
        updateDoc(doc(db, 'events', a.id), { order: b.order ?? target, updatedAt: serverTimestamp() }),
        updateDoc(doc(db, 'events', b.id), { order: a.order ?? index, updatedAt: serverTimestamp() }),
      ]);
      await loadEvents();
    } catch (_e) {}
  };

  const checkExpiredInfoavonden = async () => {
    try {
      setCheckingExpired(true);
      const functions = getFunctions();
      const manualCheck = httpsCallable(functions, 'manualCheckExpiredInfoavonden');
      
      const result = await manualCheck();
      console.log('Check result:', result.data);
      
      if (result.data.success) {
        alert(`Controle voltooid!\n\nVerstreken events: ${result.data.expiredEvents}\nBijgewerkte trips: ${result.data.updatedTrips}`);
        await loadEvents(); // Herlaad de events lijst
      } else {
        alert('Er is een fout opgetreden bij de controle.');
      }
    } catch (error) {
      console.error('Error checking expired infoavonden:', error);
      alert('Fout bij controle: ' + (error.message || error));
    } finally {
      setCheckingExpired(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Infoavonden</h1>
        {/* Quick stats */}
        <div className="flex gap-4 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {events.length} Infoavonden
          </span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl" onClick={() => { 
          setEditingId(null); 
          setNewEvent({ 
            title: '', 
            slug: '', 
            date: '', 
            imageUrl: '', 
            relatedCardSlug: '', 
            locationName: '', 
            address: '', 
            description: '', 
            contactPhoneLabel: '', 
            contactPhone: '', 
            contactEmailLabel: '', 
            contactEmail: '', 
            contactText: '' 
          }); 
          setSelectedCardId(''); 
          setSlugTouched(false); 
          setSaveError('');
          setShowForm(true);
        }}>
          Nieuwe infoavond
        </button>
      </div>

      <div className="space-y-6">
        {/* Infoavonden CRUD */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Infoavonden</h2>
          </div>

          {/* Form - BOVEN de lijst */}
          {showForm && (
            <div className="mb-6 border-b pb-6">
              <h2 className="text-xl font-bold mb-4">{editingId ? 'Bewerk infoavond' : 'Voeg nieuwe infoavond toe'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titel (verplicht)</label>
                  <input type="text" value={newEvent.title} onChange={(e) => { const title = e.target.value; setNewEvent(v => ({ ...v, title, slug: (!slugTouched ? toSlug(title) : v.slug) })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Titel van de infoavond" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug (verplicht)</label>
                  <input type="text" value={newEvent.slug} onFocus={() => setSlugTouched(true)} onChange={(e) => { setSlugTouched(true); setNewEvent(v => ({ ...v, slug: toSlug(e.target.value) })); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="bv. afrikareis-infoavond" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Datum</label>
                  <input type="text" value={newEvent.date} onChange={(e) => setNewEvent(v => ({ ...v, date: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="bv. woensdag 3 december 2025" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Locatie</label>
                  <input type="text" value={newEvent.locationName} onChange={(e) => setNewEvent(v => ({ ...v, locationName: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Naam locatie (bv. Stadshuis Brugge)" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Afbeelding uploaden</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          setUploadingImage(true);
                          const url = await vercelUploadImage(file);
                          setNewEvent(v => ({ ...v, imageUrl: url }));
                        } catch (error) {
                          alert('Image upload mislukt: ' + error.message);
                        } finally {
                          setUploadingImage(false);
                        }
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    disabled={uploadingImage}
                  />
                  {uploadingImage && <p className="text-sm text-blue-600 mt-1">Uploaden...</p>}
                  {newEvent.imageUrl && (
                    <div className="mt-2">
                      {newEvent.imageUrl.startsWith('blob:') ? (
                        <div className="w-32 h-24 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
                          Blob URL (vervang door nieuwe upload)
                        </div>
                      ) : (
                        <img src={newEvent.imageUrl} alt="Preview" className="w-32 h-24 object-cover rounded" />
                      )}
                      <button 
                        type="button" 
                        onClick={() => setNewEvent(v => ({ ...v, imageUrl: '' }))}
                        className="mt-1 text-sm text-red-600 hover:text-red-800"
                      >
                        Verwijder afbeelding
                      </button>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                  <input type="text" value={newEvent.address} onChange={(e) => setNewEvent(v => ({ ...v, address: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Straat + nr, postcode, gemeente" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beschrijving</label>
                  <textarea rows={4} value={newEvent.description} onChange={(e) => setNewEvent(v => ({ ...v, description: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Korte info over de infoavond" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefoon label</label>
                  <input type="text" value={newEvent.contactPhoneLabel} onChange={(e) => setNewEvent(v => ({ ...v, contactPhoneLabel: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="bv. Problemen? Bel" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefoon nummer</label>
                  <input type="text" value={newEvent.contactPhone} onChange={(e) => setNewEvent(v => ({ ...v, contactPhone: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="bv. +32 52 55 52 54" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E‑mail label</label>
                  <input type="text" value={newEvent.contactEmailLabel} onChange={(e) => setNewEvent(v => ({ ...v, contactEmailLabel: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="bv. Vragen/inschrijvingen via" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E‑mail adres</label>
                  <input type="email" value={newEvent.contactEmail} onChange={(e) => setNewEvent(v => ({ ...v, contactEmail: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="bv. info@voorbeeld.be" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contacttekst (onder formulier) <br/>
                  <p className="text-xs text-gray-500">Voor een email link : {"<"}a href="mailto:uwemail@example.com"{">"}Stuur een e-mail{"</"}a{">"}<br/>
          Voor een website link : {"<"}a href="https://www.website.com"{">"}Naam van de site{"</"}a{">"}</p>
                  </label>
                  <RichText 
                    value={newEvent.contactText || ''} 
                    onChange={(html) => setNewEvent(v => ({ ...v, contactText: html }))} 
                    placeholder="Tekst onder het formulier (je kunt links/telefoons inplakken)" 
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col items-end">
                {saveError && <p className="text-red-600 mb-2 text-sm">{saveError}</p>}
                <div className="flex gap-2">
                  <button 
                    onClick={() => { 
                      setEditingId(null); 
                      setNewEvent({ 
                        title: '', 
                        slug: '', 
                        date: '', 
                        imageUrl: '', 
                        relatedCardSlug: '', 
                        locationName: '', 
                        address: '', 
                        description: '', 
                        contactPhoneLabel: '', 
                        contactPhone: '', 
                        contactEmailLabel: '', 
                        contactEmail: '', 
                        contactText: '' 
                      }); 
                      setSelectedCardId(''); 
                      setSlugTouched(false); 
                      setSaveError('');
                      setShowForm(false);
                    }} 
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuleer
                  </button>
                  <button onClick={handleSaveEvent} disabled={savingEvent} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:opacity-50">
                    {savingEvent ? 'Opslaan...' : (editingId ? 'Bijwerken' : 'Opslaan')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lijst */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {events.map((event, idx) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md">
                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                  {event.heroUrl ? (
                    event.heroUrl.startsWith('blob:') ? (
                      <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                        Blob URL (vervang door nieuwe upload)
                      </div>
                    ) : (
                      <img src={event.heroUrl} alt={event.title} className="w-full h-48 object-cover" />
                    )
                  ) : (
                    <span className="text-gray-500">Geen afbeelding</span>
                  )}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <button onClick={() => moveOrder(idx, 'up')} className="px-2 py-1 rounded bg-white/80 hover:bg-white border">↑</button>
                    <button onClick={() => moveOrder(idx, 'down')} className="px-2 py-1 rounded bg-white/80 hover:bg-white border">↓</button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                  {event.dateTime && <p className="text-gray-600 mb-3">{event.dateTime}</p>}
                  <div className="mt-3 border-t pt-3">
                    <div className="text-xs text-gray-500 mb-2">{event.published ? 'gepubliceerd' : 'concept'}</div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => togglePublish(event)} className="w-full px-3 py-2 border rounded hover:bg-gray-50">{event.published ? 'Depubliceer' : 'Publiceer'}</button>
                      <button onClick={() => startEdit(event)} className="w-full px-3 py-2 border rounded hover:bg-gray-50">Bewerk</button>
                      <button onClick={() => handleDelete(event)} className="w-full px-3 py-2 rounded text-white bg-red-600 hover:bg-red-700">Verwijder</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {events.length === 0 && (<div className="text-sm text-gray-500">Nog geen infoavonden...</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;