import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import ReisFormFields from '../components/ReisFormFields';
import ReisSections from '../components/ReisSections';

const slugify = (s) => s
  .toLowerCase()
    .trim()
  .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');

const AdminReisForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id;

  // Basisvelden
  const [title, setTitle] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('beschikbaar');

  // Intro sectie
  const [introTitle, setIntroTitle] = useState('');
  const [introText, setIntroText] = useState('');
  const [introPhotos, setIntroPhotos] = useState([]); // string[] URLs, max 2 in UI

  // Reisroute sectie
  const [routeImageUrl, setRouteImageUrl] = useState('');
  const [routeDays, setRouteDays] = useState([]); // [{ day, date, place, html }]

  // Reportage sectie
  const [reportage, setReportage] = useState([]); // [{ accountId, itemId }]

  // Verblijfsinfo sectie
  const [stayMainImageUrl, setStayMainImageUrl] = useState('');
  const [stayOverlayTitle, setStayOverlayTitle] = useState('');
  const [stayItems, setStayItems] = useState([]); // [{ title, html, photos: [] }]

  // Prijzen sectie
  const [prices, setPrices] = useState([]); // [{ name, prijs, bg? }]
  const [pricesNote, setPricesNote] = useState('');
  const [prijzenPhotos, setPrijzenPhotos] = useState([]); // string[], max 2

  // Inbegrepen / Niet inbegrepen
  const [included, setIncluded] = useState([]); // string[]
  const [notIncluded, setNotIncluded] = useState([]); // string[]

  // Gallerij
  const [gallery, setGallery] = useState([]); // array of { src, width?, height? }

  // Reservatie sectie
  const [reservationHtml, setReservationHtml] = useState('');
  const [reservationLogoUrl, setReservationLogoUrl] = useState('');
  const [reservationBrochureUrl, setReservationBrochureUrl] = useState('');

  // Infoavond sectie
  const [events, setEvents] = useState([]); // lijst van gepubliceerde events
  const [infoavondSlug, setInfoavondSlug] = useState('');
  const [infoavondTitle, setInfoavondTitle] = useState('');

  // Hero uit homepage_cards
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [heroUrl, setHeroUrl] = useState('');
  const [heroAlt, setHeroAlt] = useState('');

  // UI state
  const [saving, setSaving] = useState(false);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      // Load cards
    const qCards = query(collection(db, 'homepage_cards'), orderBy('order', 'asc'));
      const cardsSnap = await getDocs(qCards);
      setCards(cardsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Load events (optioneel alleen gepubliceerde)
      try {
        // Haal events op zonder orderBy om ontbrekende index/veld issues te vermijden
        const eventsSnap = await getDocs(collection(db, 'events'));
        const list = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() }))
        setEvents(list);
      } catch (e) {
        console.warn('Events laden mislukt:', e);
      }
    };
    loadData();
  }, []);

  // Load existing trip data for editing
  useEffect(() => {
    const loadExistingTrip = async () => {
      if (isNew) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      try {
        const d = await getDoc(doc(db, 'trips', id));
        if (!d.exists()) {
          alert('Reis niet gevonden.');
          navigate('/admin/reizen');
          return;
        }
        const t = d.data();
        
        setTitle(t.title || '');
        setDateRange(t.dateRange || '');
        setSlug(t.slug || id);
        setStatus(t.status || '');
        setHeroUrl(t.hero?.url || '');
        setHeroAlt(t.hero?.alt || '');
        setIntroTitle(t.sections?.intro?.title || '');
            setIntroText(t.sections?.intro?.html || '');
            setIntroPhotos(
              Array.isArray(t.sections?.intro?.photos)
                ? t.sections.intro.photos.filter((u) => typeof u === 'string').slice(0, 2)
                : []
            );
            // Reisroute
            setRouteImageUrl(t.sections?.route?.imageUrl || '');
            setRouteDays(Array.isArray(t.sections?.route?.days) ? t.sections.route.days : []);
            // Reportage
            setReportage(Array.isArray(t.sections?.reportage) ? t.sections.reportage.map(v => ({ ...v, accountId: v.accountId || 'VzaPKg' })) : []);
            // Verblijfsinfo
            setStayMainImageUrl(t.sections?.verblijf?.mainImageUrl || '');
            setStayOverlayTitle(t.sections?.verblijf?.overlayTitle || '');
            setStayItems(Array.isArray(t.sections?.verblijf?.items) ? t.sections.verblijf.items : []);
            // Prijzen
            setPrices(Array.isArray(t.sections?.prijzen) ? t.sections.prijzen : []);
            setPricesNote(t.sections?.prijzenNote || '');
            setPrijzenPhotos(
              Array.isArray(t.sections?.prijzenPhotos)
                ? t.sections.prijzenPhotos.filter((u) => typeof u === 'string').slice(0, 2)
                : []
            );
            // Inbegrepen
            setIncluded(Array.isArray(t.sections?.inbegrepen) ? t.sections.inbegrepen : []);
            setNotIncluded(Array.isArray(t.sections?.nietInbegrepen) ? t.sections.nietInbegrepen : []);
            // Gallerij
            setGallery(Array.isArray(t.sections?.gallery) ? t.sections.gallery : []);
            // Reservatie
            setReservationHtml(t.sections?.reservatie?.html || '');
            setReservationLogoUrl(t.sections?.reservatie?.logoUrl || '');
            setReservationBrochureUrl(t.sections?.reservatie?.brochureUrl || '');
            // Infoavond
            setInfoavondSlug(t.sections?.infoavond?.slug || '');
            setInfoavondTitle(t.sections?.infoavond?.title || '');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (_) {}
    };
    loadExistingTrip();
  }, [id, isNew, navigate]);

  // Slug automatisch van titel
  useEffect(() => {
    if (!slug && title) {
      setSlug(slugify(title));
    }
  }, [title, slug]);

  const handleSelectCard = (cardId) => {
    setSelectedCardId(cardId);
    const card = cards.find(c => c.id === cardId);
    if (card) {
      setHeroUrl(card.imageUrl || '');
      setHeroAlt(card.alt || '');
      // Automatisch invullen van titel, datum en slug
      setTitle(card.title || '');
      setDateRange(card.text || ''); // text veld bevat de datum
      setSlug(card.slug || slugify(card.title || ''));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const targetId = isNew ? slug : id;
      const sectionsPayload = {
        intro: {
          title: introTitle || '',
          html: introText || '',
          photos: Array.isArray(introPhotos)
            ? introPhotos.filter((u) => typeof u === 'string' && u).slice(0, 2)
            : [],
        },
        route: {
          imageUrl: routeImageUrl || '',
          days: Array.isArray(routeDays) ? routeDays : [],
        },
        reportage: Array.isArray(reportage) ? reportage.map(v => ({ ...v, accountId: v.accountId || 'VzaPKg' })) : [],
        verblijf: {
          mainImageUrl: stayMainImageUrl || '',
          overlayTitle: stayOverlayTitle || '',
          items: Array.isArray(stayItems) ? stayItems : [],
        },
        prijzen: Array.isArray(prices) ? prices : [],
        prijzenNote: pricesNote || '',
        prijzenPhotos: Array.isArray(prijzenPhotos)
          ? prijzenPhotos.filter((u) => typeof u === 'string' && u).slice(0, 2)
          : [],
        inbegrepen: Array.isArray(included) ? included : [],
        nietInbegrepen: Array.isArray(notIncluded) ? notIncluded : [],
        gallery: Array.isArray(gallery) ? gallery : [],
        reservatie: {
          html: reservationHtml || '',
          logoUrl: reservationLogoUrl || '',
          brochureUrl: reservationBrochureUrl || '',
        },
      };
      // Infoavond sectie - expliciet toevoegen of verwijderen
      if (infoavondSlug && infoavondSlug.trim()) {
        sectionsPayload.infoavond = { slug: infoavondSlug, title: infoavondTitle || '' };
      } else {
        // Expliciet verwijderen als geen infoavond geselecteerd
        sectionsPayload.infoavond = null;
      }

      const payload = {
        title: title || '',
        slug: slug || '',
        dateRange: dateRange || '',
        status: status || 'beschikbaar',
        published: false,
        hero: { url: heroUrl || '', alt: heroAlt || '' },
        sections: sectionsPayload,
        updatedAt: serverTimestamp(),
        ...(isNew ? { createdAt: serverTimestamp() } : {}),
      };
      
      console.log('Saving payload:', payload);
      console.log('Target ID:', targetId);
      
      await setDoc(doc(db, 'trips', targetId), payload, { merge: true });
      
      alert('Reis opgeslagen.');
      navigate('/admin/reizen');
    } catch (e) {
      console.error('Save error:', e);
      alert('Opslaan mislukt. Controleer velden en probeer opnieuw.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 admin-form" style={{ direction: 'ltr', transform: 'none', filter: 'none' }}>
      <style>{`
        .admin-form, .admin-form * { direction: ltr !important; transform: none !important; }
        .admin-form input, .admin-form select, .admin-form textarea { text-align: left !important; }
      `}</style>
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'Nieuwe reis' : 'Reis bewerken'}</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-xl border">Annuleren</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50">
            {saving ? 'Opslaan…' : 'Opslaan'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 space-y-6">
        <ReisFormFields
          title={title}
          setTitle={setTitle}
          dateRange={dateRange}
          setDateRange={setDateRange}
          slug={slug}
          setSlug={setSlug}
          status={status}
          setStatus={setStatus}
          heroUrl={heroUrl}
          setHeroUrl={setHeroUrl}
          heroAlt={heroAlt}
          setHeroAlt={setHeroAlt}
          cards={cards}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
          handleSelectCard={handleSelectCard}
          isNew={isNew}
        />

            <ReisSections 
              introTitle={introTitle}
              setIntroTitle={setIntroTitle}
              introText={introText}
              setIntroText={setIntroText}
              introPhotos={introPhotos}
              setIntroPhotos={setIntroPhotos}
              routeImageUrl={routeImageUrl}
              setRouteImageUrl={setRouteImageUrl}
              routeDays={routeDays}
              setRouteDays={setRouteDays}
              reportage={reportage}
              setReportage={setReportage}
              stayMainImageUrl={stayMainImageUrl}
              setStayMainImageUrl={setStayMainImageUrl}
              stayOverlayTitle={stayOverlayTitle}
              setStayOverlayTitle={setStayOverlayTitle}
              stayItems={stayItems}
              setStayItems={setStayItems}
              prices={prices}
              setPrices={setPrices}
              pricesNote={pricesNote}
              setPricesNote={setPricesNote}
              prijzenPhotos={prijzenPhotos}
              setPrijzenPhotos={setPrijzenPhotos}
              included={included}
              setIncluded={setIncluded}
              notIncluded={notIncluded}
              setNotIncluded={setNotIncluded}
              gallery={gallery}
              setGallery={setGallery}
              reservationHtml={reservationHtml}
              setReservationHtml={setReservationHtml}
              reservationLogoUrl={reservationLogoUrl}
              setReservationLogoUrl={setReservationLogoUrl}
              reservationBrochureUrl={reservationBrochureUrl}
              setReservationBrochureUrl={setReservationBrochureUrl}
              events={events}
              infoavondSlug={infoavondSlug}
              setInfoavondSlug={setInfoavondSlug}
              infoavondTitle={infoavondTitle}
              setInfoavondTitle={setInfoavondTitle}
            />
      </div>

      {/* Knoppen onderaan */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t">
        <h2 className="text-lg font-semibold text-gray-700">{isNew ? 'Nieuwe reis' : 'Reis bewerken'}</h2>
        <div className="flex gap-2">
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-xl border">Annuleren</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50">
            {saving ? 'Opslaan…' : 'Opslaan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReisForm;