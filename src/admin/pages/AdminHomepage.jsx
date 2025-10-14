import { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import CardFront from '../../components/CardFront';
import CardBack from '../../components/CardBack';

const STATUS_OPTIONS = ['open', 'volzet', 'beperkt'];

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Compress image in-browser (resize + quality) before upload (Cloudinary unsigned limit 10MB)
async function compressImage(file, maxWidth = 2560, quality = 0.8, outputType = 'image/jpeg') {
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    // Gebruik FileReader in plaats van blob URL om CORS problemen te voorkomen
    const reader = new FileReader();
    reader.onload = (event) => {
      i.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const canvas = document.createElement('canvas');
  const ratio = img.width / img.height;
  const targetWidth = Math.min(maxWidth, img.width);
  const targetHeight = Math.round(targetWidth / ratio);
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, outputType, quality));
  if (!blob) throw new Error('Kon afbeelding niet comprimeren');
  return blob;
}

const AdminHomepage = () => {
  // Nieuwe state voor backend communicatie
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTravelCards: 0,
    totalVideos: 0
  });

  // Reiskaarten state
  const [cards, setCards] = useState([]);
  const [editing, setEditing] = useState(null); // card object or null
  const [form, setForm] = useState({ imageUrl: '', title: '', text: '', status: 'open', backText: '', slug: '', published: true, order: 0 });
  const [savingCard, setSavingCard] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  // Laad homepage content en stats bij component mount
  useEffect(() => {
    fetchHomepageData();
    fetchCards();
  }, []);

  const fetchHomepageData = async () => {
    try {
      setLoading(true);
      const ref = doc(db, 'homepage', 'content');
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
      }
    } catch (err) {
      console.error('Error fetching homepage data:', err);
      setError('Kon homepage data niet laden');
    } finally {
      setLoading(false);
    }
  };

  const fetchCards = async () => {
    try {
      const q = query(collection(db, 'homepage_cards'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setCards(list);
      setStats(s => ({ ...s, totalTravelCards: list.length }));
    } catch (err) {
      console.error('Error fetching cards:', err);
    }
  };

  const fetchStats = async () => {
    // Voor nu enkel aantal reiskaarten uit fetchCards()
  };

  const startNewCard = () => {
    setEditing({ id: null });
    const nextOrder = cards.length ? Math.max(...cards.map(c => c.order ?? 0)) + 1 : 1;
    setForm({ imageUrl: '', title: '', text: '', status: 'open', backText: '', slug: '', published: true, order: nextOrder });
  };

  const startEditCard = (card) => {
    setEditing(card);
    setForm({
      imageUrl: card.imageUrl || '',
      title: card.title || '',
      text: card.text || '',
      status: card.status || 'open',
      backText: card.backText || '',
      slug: card.slug || '',
      published: card.published ?? true,
      order: card.order ?? 0,
    });
  };

  const validateCard = () => {
    if (!form.title?.trim()) return 'Titel is verplicht';
    if (!form.text?.trim()) return 'Tekst is verplicht';
    if (!STATUS_OPTIONS.includes(form.status)) return 'Ongeldige status';
    if (!form.slug?.trim()) return 'Slug is verplicht';
    if (!/^[-a-z0-9]+$/i.test(form.slug)) return 'Slug mag enkel letters, cijfers en koppeltekens bevatten';
    return '';
  };

  const saveCard = async () => {
    const errMsg = validateCard();
    if (errMsg) {
      alert(errMsg);
      return;
    }
    try {
      setSavingCard(true);
      if (editing?.id) {
        await updateDoc(doc(db, 'homepage_cards', editing.id), {
          ...form,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'homepage_cards'), {
          ...form,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      setEditing(null);
      await fetchCards();
    } catch (err) {
      console.error('Fout bij opslaan kaart:', err);
      alert('Fout bij opslaan kaart');
    } finally {
      setSavingCard(false);
    }
  };

  const deleteCard = async (cardId) => {
    if (!confirm('Zeker verwijderen?')) return;
    try {
      await deleteDoc(doc(db, 'homepage_cards', cardId));
      await fetchCards();
    } catch (err) {
      console.error('Fout bij verwijderen kaart:', err);
      alert('Verwijderen mislukt');
    }
  };

  const togglePublish = async (card) => {
    try {
      await updateDoc(doc(db, 'homepage_cards', card.id), { published: !card.published, updatedAt: serverTimestamp() });
      await fetchCards();
    } catch (err) {
      console.error('Fout bij publish toggle:', err);
    }
  };

  const moveOrder = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= cards.length) return;
    const a = cards[index];
    const b = cards[targetIndex];
    try {
      await Promise.all([
        updateDoc(doc(db, 'homepage_cards', a.id), { order: b.order ?? targetIndex, updatedAt: serverTimestamp() }),
        updateDoc(doc(db, 'homepage_cards', b.id), { order: a.order ?? index, updatedAt: serverTimestamp() }),
      ]);
      await fetchCards();
    } catch (err) {
      console.error('Fout bij sorteren:', err);
    }
  };

  const onSelectImage = async (file) => {
    if (!file) return;
    if (!form.slug) {
      alert('Vul eerst de slug in voor je een afbeelding uploadt.');
      return;
    }
    try {
      setUploadMsg('');
      setUploadingImage(true);

      // Compress the image client-side to avoid 10MB limit
      const compressed = await compressImage(file, 2560, 0.8, 'image/jpeg');

      const formData = new FormData();
      formData.append('file', compressed, `${form.slug}.jpg`);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', `homepage/reizen/${form.slug}`);

      // Gebruik Vercel Blob in plaats van directe Cloudinary API call
      const { vercelUploadImage } = await import('../../lib/apiClient');
      const url = await vercelUploadImage(compressed);
      setForm(prev => ({ ...prev, imageUrl: url }));
      setUploadMsg('Afbeelding succesvol geüpload naar Vercel Blob!');
      return;
      
      // Oude Cloudinary code (behouden voor referentie)
      /*const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Cloudinary upload mislukt');
      }
      /*const data = await res.json();
      setForm(f => ({ ...f, imageUrl: data.secure_url || data.url || '' }));
      setUploadMsg('Afbeelding geüpload.');*/
    } catch (err) {
      console.error('Upload mislukt:', err);
      alert('Upload mislukt');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Homepage data wordt geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Homepagina</h1>
        {/* Quick stats */}
        <div className="flex gap-4 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {stats.totalTravelCards} Reiskaarten
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            <span>{error}</span>
            <button 
              onClick={() => {
                setError(null);
                fetchHomepageData();
                fetchCards();
              }}
              className="ml-4 text-red-800 underline hover:no-underline"
            >
              Opnieuw proberen
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Reiskaarten CRUD */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Reiskaarten</h2>
            <button onClick={startNewCard} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">Nieuwe reiskaart</button>
          </div>

          {/* Form + Preview - BOVEN de lijst */}
          {editing && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 border-b pb-6">
              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Titel</label>
                  <input type="text" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className="w-full px-3 py-2 border rounded"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Datum van tot</label>
                  <input type="text" value={form.text} onChange={e=>setForm(f=>({...f,text:e.target.value}))} className="w-full px-3 py-2 border rounded"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} className="w-full px-3 py-2 border rounded">
                    {STATUS_OPTIONS.map(s=> <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <input type="text" value={form.slug} onChange={e=>setForm(f=>({...f,slug:e.target.value.toLowerCase()}))} className="w-full px-3 py-2 border rounded" placeholder="bv. zuiditalie"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tekst achterkant</label>
                  <textarea rows={3} value={form.backText} onChange={e=>setForm(f=>({...f,backText:e.target.value}))} className="w-full px-3 py-2 border rounded"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Afbeelding</label>
                  <div className="flex items-center gap-3">
                    <input type="file" accept="image/*" onChange={e=>onSelectImage(e.target.files && e.target.files[0])} className="block w-full text-sm" />
                    {uploadingImage && <span className="text-sm text-gray-500">Uploaden...</span>}
                    {!uploadingImage && uploadMsg && <span className="text-sm text-green-600">{uploadMsg}</span>}
                  </div>
                  <input type="text" value={form.imageUrl} onChange={e=>setForm(f=>({...f,imageUrl:e.target.value}))} className="mt-2 w-full px-3 py-2 border rounded" placeholder="of plak een image URL"/>
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={()=>{setEditing(null);}} className="px-4 py-2 border rounded">Annuleer</button>
                  <button onClick={saveCard} disabled={savingCard || uploadingImage} className="px-4 py-2 rounded text-white bg-green-600 disabled:opacity-50">{savingCard? 'Opslaan...' : 'Opslaan'}</button>
                </div>
              </div>
              {/* Preview */}
              <div className="space-y-4">
                <div className="border rounded p-4">
                  <div className="text-sm font-medium mb-2">Preview CardFront</div>
                  <CardFront image={form.imageUrl} title={form.title} text={form.text} status={form.status} />
                </div>
                <div className="border rounded p-4">
                  <div className="text-sm font-medium mb-2">Preview CardBack</div>
                  <CardBack text={form.backText} link={`/${form.slug || ''}`} status={form.status} />
                </div>
              </div>
            </div>
          )}

          {/* Lijst */}
          <div className="space-y-3">
            {cards.map((c, idx) => (
              <div key={c.id} className="flex items-center justify-between border rounded p-3">
                <div className="flex items-center gap-3">
                  {c.imageUrl ? (
                    <img src={c.imageUrl} alt="thumb" className="w-16 h-12 object-cover rounded border"/>
                  ) : (
                    <div className="w-16 h-12 rounded border bg-gray-200 flex items-center justify-center text-[10px] text-gray-500">geen afbeelding</div>
                  )}
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-gray-500">/{c.slug} • {c.status} • {c.published ? 'gepubliceerd' : 'concept'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => moveOrder(idx, 'up')} className="px-2 py-1 border rounded">↑</button>
                  <button onClick={() => moveOrder(idx, 'down')} className="px-2 py-1 border rounded">↓</button>
                  <button onClick={() => togglePublish(c)} className="px-3 py-1 border rounded">{c.published ? 'Depub' : 'Pub'}</button>
                  <button onClick={() => startEditCard(c)} className="px-3 py-1 border rounded">Bewerk</button>
                  <button onClick={() => deleteCard(c.id)} className="px-3 py-1 border rounded text-red-600">Verwijder</button>
                </div>
              </div>
            ))}
            {cards.length === 0 && (
              <div className="text-sm text-gray-500">Nog geen kaarten...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;