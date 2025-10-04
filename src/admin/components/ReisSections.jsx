import React from 'react';
import RichText from './RichText';
import { useState } from 'react';
import { cloudinaryUpload } from '../../lib/apiClient';

const ReisSections = ({ 
  introTitle,
  setIntroTitle,
  introText, 
  setIntroText,
  // Route props
  routeImageUrl,
  setRouteImageUrl,
  routeDays,
  setRouteDays,
  // Reportage props
  reportage,
  setReportage,
  // Verblijfsinfo props
  stayMainImageUrl,
  setStayMainImageUrl,
  stayOverlayTitle,
  setStayOverlayTitle,
  stayItems,
  setStayItems,
  // Prijzen props
  prices,
  setPrices,
  pricesNote,
  setPricesNote,
  // Inbegrepen
  included,
  setIncluded,
  notIncluded,
  setNotIncluded,
  // Gallerij
  gallery,
  setGallery,
  // Reservatie
  reservationHtml,
  setReservationHtml,
  reservationBrochureUrl,
  setReservationBrochureUrl,
  // Infoavond
  events,
  infoavondSlug,
  setInfoavondSlug,
  infoavondTitle,
  setInfoavondTitle,
}) => {
  const [uploadingRouteImage, setUploadingRouteImage] = useState(false)

  const addRouteDay = () => {
    setRouteDays([...(routeDays || []), { day: '', date: '', place: '', html: '', photos: [] }])
  }
  const updateRouteDay = (idx, key, val) => {
    const next = [...routeDays]
    next[idx] = { ...next[idx], [key]: val }
    setRouteDays(next)
  }
  const removeRouteDay = (idx) => {
    const next = [...routeDays]
    next.splice(idx, 1)
    setRouteDays(next)
  }
  const addReportItem = () => {
    setReportage([...(reportage || []), { accountId: '', itemId: '' }])
  }
  const updateReportItem = (idx, key, val) => {
    const next = [...(reportage || [])]
    next[idx] = { ...next[idx], [key]: val }
    setReportage(next)
  }
  const removeReportItem = (idx) => {
    const next = [...(reportage || [])]
    next.splice(idx, 1)
    setReportage(next)
  }
  const [uploadingStayMain, setUploadingStayMain] = useState(false)
  const addStayItem = () => {
    setStayItems([...(stayItems || []), { title: '', html: '', photos: [] }])
  }
  const updateStayItem = (idx, key, val) => {
    const next = [...(stayItems || [])]
    next[idx] = { ...next[idx], [key]: val }
    setStayItems(next)
  }
  const removeStayItem = (idx) => {
    const next = [...(stayItems || [])]
    next.splice(idx, 1)
    setStayItems(next)
  }
  const addStayItemPhoto = async (idx, file) => {
    if (!file) return
    const next = [...(stayItems || [])]
    try {
      const url = await cloudinaryUpload(file)
      const photos = Array.isArray(next[idx].photos) ? next[idx].photos : []
      photos.push(url)
      next[idx].photos = photos
      setStayItems(next)
    } catch (_) {
      alert('Upload foto mislukt')
    }
  }
  const addStayItemPhotos = async (idx, fileList) => {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList)
    try {
      const urls = await Promise.all(files.map(f => cloudinaryUpload(f)))
      const next = [...(stayItems || [])]
      const photos = Array.isArray(next[idx].photos) ? next[idx].photos : []
      next[idx].photos = photos.concat(urls.filter(Boolean))
      setStayItems(next)
    } catch (_) {
      alert('Upload van één of meerdere foto\'s is mislukt')
    }
  }
  return (
    <div className="space-y-8">
      {/* Intro sectie */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4">
        <h2 className="text-lg font-semibold text-gray-900">Intro sectie</h2>
        
        {/* Intro titel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Intro titel (optioneel)</label>
          <input 
            type="text" 
            value={introTitle} 
            onChange={e => setIntroTitle(e.target.value)} 
            className="w-full border rounded px-3 py-2" 
            placeholder="bv. Ontdek de schoonheid van..." 
          />
        </div>
        
        {/* Intro tekst */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Intro tekst (optioneel)</label>
          <RichText
            value={introText}
            onChange={setIntroText}
            placeholder="Schrijf hier de intro tekst voor deze reis..."
          />
        </div>
      </div>

      {/* Infoavond sectie */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4" id="infoavond-section">
        <h2 className="text-lg font-semibold text-gray-900">Infoavond</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kies infoavond</label>
            <select value={infoavondSlug || ''} onChange={e=>{
              const slug = e.target.value
              setInfoavondSlug(slug)
              const ev = (events||[]).find(x=> x.slug === slug)
              setInfoavondTitle(ev?.title || '')
            }} className="w-full border rounded px-3 py-2">
              <option value="">Geen</option>
              {(events||[]).map(ev => (
                <option key={ev.id} value={ev.slug}>{ev.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titel (optioneel override)</label>
            <input type="text" value={infoavondTitle || ''} onChange={e=>setInfoavondTitle(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Titel op detailpagina" />
          </div>
        </div>
      </div>

      {/* Reisroute sectie */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4" id="route-section">
        <h2 className="text-lg font-semibold text-gray-900">Reisroute</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Route afbeelding</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={async (e)=>{
                const file = e.target.files && e.target.files[0]
                if (!file) return
                try {
                  setUploadingRouteImage(true)
                  const url = await cloudinaryUpload(file)
                  setRouteImageUrl(url || '')
                } catch (_) {
                  alert('Upload mislukt. Probeer opnieuw of kies een andere afbeelding.')
                } finally {
                  setUploadingRouteImage(false)
                  // reset input so same file can be chosen again if needed
                  e.target.value = ''
                }
              }}
              className="block"
            />
            <button
              type="button"
              onClick={()=>setRouteImageUrl('')}
              disabled={!routeImageUrl || uploadingRouteImage}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50"
            >
              Verwijder afbeelding
            </button>
            {uploadingRouteImage && <span className="text-sm text-gray-500">Uploaden…</span>}
          </div>
          {routeImageUrl && (
            <div className="mt-2">
              <img src={routeImageUrl} alt="Reisroute" className="w-full max-w-xl rounded" />
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Dagen</label>
            <button type="button" onClick={addRouteDay} className="px-3 py-1 text-sm border rounded">Dag toevoegen</button>
          </div>
          {(routeDays || []).map((d, idx)=> (
            <div key={idx} className="border rounded p-3 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" value={d.day || ''} onChange={e=>updateRouteDay(idx,'day',e.target.value)} className="border rounded px-3 py-2" placeholder="Dag" />
                <input type="text" value={d.date || ''} onChange={e=>updateRouteDay(idx,'date',e.target.value)} className="border rounded px-3 py-2" placeholder="Datum" />
                <input type="text" value={d.place || ''} onChange={e=>updateRouteDay(idx,'place',e.target.value)} className="border rounded px-3 py-2" placeholder="Plaats" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
                <RichText value={d.html || ''} onChange={(html)=>updateRouteDay(idx,'html',html)} placeholder="Dagbeschrijving..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto's (optioneel)</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (!files.length) return;
                      try {
                        const uploadPromises = files.map(file => cloudinaryUpload(file));
                        const urls = await Promise.all(uploadPromises);
                        const currentPhotos = d.photos || [];
                        updateRouteDay(idx, 'photos', [...currentPhotos, ...urls]);
                      } catch (error) {
                        alert('Upload mislukt. Probeer opnieuw.');
                      } finally {
                        e.target.value = '';
                      }
                    }}
                    className="block"
                  />
                  {(d.photos || []).length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {(d.photos || []).map((photo, photoIdx) => (
                        <div key={photoIdx} className="relative">
                          <img src={photo} alt={`Dag ${idx + 1} foto ${photoIdx + 1}`} className="w-full h-20 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedPhotos = (d.photos || []).filter((_, i) => i !== photoIdx);
                              updateRouteDay(idx, 'photos', updatedPhotos);
                            }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <button type="button" onClick={()=>removeRouteDay(idx)} className="px-3 py-1 text-sm border rounded text-red-600 border-red-300">Verwijderen</button>
              </div>
              <div>
                <button type="button" onClick={addRouteDay} className="px-3 py-1 text-sm border rounded">Dag toevoegen</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reportage sectie */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4" id="reportage-section">
        <h2 className="text-lg font-semibold text-gray-900">Reportage</h2>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Video's</label>
          <button type="button" onClick={addReportItem} className="px-3 py-1 text-sm border rounded">Toevoegen</button>
        </div>
        <div className="space-y-3">
          {(reportage || []).map((v, idx) => (
            <div key={idx} className="border rounded p-3 grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
                <input type="text" value={v.accountId || ''} onChange={e=>updateReportItem(idx,'accountId',e.target.value)} className="w-full border rounded px-3 py-2" placeholder="account_id" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item ID</label>
                <input type="text" value={v.itemId || ''} onChange={e=>updateReportItem(idx,'itemId',e.target.value)} className="w-full border rounded px-3 py-2" placeholder="item_id" />
              </div>
              <div className="md:col-span-2 text-right">
                <button type="button" onClick={()=>removeReportItem(idx)} className="px-3 py-1 text-sm border rounded text-red-600 border-red-300">Verwijderen</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verblijfsinfo sectie */}
      <div className="space-y-4 border-4 border-gray-400 rounded-md p-4" id="verblijf-section">
        <h2 className="text-lg font-semibold text-gray-900">Verblijfsinfo</h2>
        {/* Main image */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Hoofdafbeelding</label>
          <div className="flex items-center gap-3">
            <input type="file" accept="image/*" onChange={async (e)=>{
              const file = e.target.files && e.target.files[0]
              if (!file) return
              try {
                setUploadingStayMain(true)
                const url = await cloudinaryUpload(file)
                setStayMainImageUrl(url || '')
              } catch (_) {
                alert('Upload mislukt')
              } finally {
                setUploadingStayMain(false)
                e.target.value = ''
              }
            }} />
            <button type="button" className="px-3 py-1 text-sm border rounded disabled:opacity-50" onClick={()=>setStayMainImageUrl('')} disabled={!stayMainImageUrl || uploadingStayMain}>Verwijder</button>
            {uploadingStayMain && <span className="text-sm text-gray-500">Uploaden…</span>}
          </div>
          {stayMainImageUrl && (
            <div className="mt-2">
              <img src={stayMainImageUrl} alt="Verblijf" className="w-full max-w-xl rounded" />
            </div>
          )}
        </div>
        {/* Overlay title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Overlay titel</label>
          <input type="text" value={stayOverlayTitle || ''} onChange={(e)=>setStayOverlayTitle(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="bv. HOTELS OF SHIP" />
        </div>
        {/* Items */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Tekst</label>
          <button type="button" onClick={addStayItem} className="px-3 py-1 text-sm border rounded">Tekst toevoegen</button>
        </div>
        <div className="space-y-4">
          {(stayItems || []).map((it, idx) => (
            <div key={idx} className="border rounded p-3 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titel (optioneel)</label>
                <input type="text" value={it.title || ''} onChange={(e)=>updateStayItem(idx,'title',e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Titel" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tekst</label>
                <RichText value={it.html || ''} onChange={(html)=>updateStayItem(idx,'html',html)} placeholder="Beschrijving..." />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Foto's</label>
                <input type="file" accept="image/*" multiple onChange={(e)=>{ addStayItemPhotos(idx, e.target.files); e.target.value=''; }} />
                <div className="flex flex-wrap gap-2">
                  {(it.photos || []).map((u, pIdx) => (
                    <div key={pIdx} className="relative">
                      <img src={u} alt="foto" className="w-28 h-20 object-cover rounded" />
                      <button type="button" className="absolute -top-2 -right-2 bg-white border rounded px-1 text-xs" onClick={()=>{
                        const next = [...(stayItems || [])]
                        const photos = Array.isArray(next[idx].photos) ? next[idx].photos : []
                        photos.splice(pIdx,1)
                        next[idx].photos = photos
                        setStayItems(next)
                      }}>x</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <button type="button" onClick={()=>removeStayItem(idx)} className="px-3 py-1 text-sm border rounded text-red-600 border-red-300">Item verwijderen</button>
              </div>
              <div>
                <button type="button" onClick={addStayItem} className="px-3 py-1 text-sm border rounded">Item toevoegen</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prijzen sectie */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4" id="prijzen-section">
        <h2 className="text-lg font-semibold text-gray-900">Prijzen</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Rijen</label>
            <button type="button" onClick={()=> setPrices([...(prices||[]), { name: '', prijs: '', color: '' }])} className="px-3 py-1 text-sm border rounded">Rij toevoegen</button>
          </div>
          <div className="space-y-3">
            {(prices||[]).map((row, idx)=> (
              <div key={idx} className="border rounded p-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                  <input type="text" value={row.name || ''} onChange={e=>{ const next=[...(prices||[])]; next[idx] = { ...next[idx], name: e.target.value }; setPrices(next) }} className="w-full border rounded px-3 py-2" placeholder="bv. Standaard kajuit" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prijs</label>
                  <input type="text" value={row.prijs || ''} onChange={e=>{ const next=[...(prices||[])]; next[idx] = { ...next[idx], prijs: e.target.value }; setPrices(next) }} className="w-full border rounded px-3 py-2" placeholder="bv. € 1.299" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Achtergrondkleur (optioneel)</label>
                  <select
                    value={row.bg || ''}
                    onChange={e=>{ const next=[...(prices||[])]; next[idx] = { ...next[idx], bg: e.target.value }; setPrices(next) }}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Geen</option>
                    <option value="bg-purple-200">Paars (licht)</option>
                    <option value="bg-green-200">Groen (licht)</option>
                    <option value="bg-orange-200">Oranje (licht)</option>
                    <option value="bg-blue-200">Blauw (licht)</option>
                    <option value="bg-gray-200">Grijs (licht)</option>
                  </select>
                </div>
                <div className="md:col-span-3 flex items-center justify-between">
                  <button type="button" onClick={()=>{ const next=[...(prices||[])]; next.splice(idx,1); setPrices(next) }} className="px-3 py-1 text-sm border rounded text-red-600 border-red-300">Verwijderen</button>
                  <button type="button" onClick={()=> setPrices([...(prices||[]), { name: '', prijs: '', bg: '' }])} className="px-3 py-1 text-sm border rounded">Rij toevoegen</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prijzen toelichting (optioneel richtext) */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4">
        <label className="block text-sm font-medium text-gray-700">Prijzen toelichting (optioneel)</label>
        <RichText value={pricesNote || ''} onChange={setPricesNote} placeholder="Extra toelichting bij prijzen..." />
      </div>

      {/* Inbegrepen */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4" id="inbegrepen-sections">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Inbegrepen</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Items</label>
              <button type="button" onClick={()=> setIncluded([...(included||[]), ''])} className="px-3 py-1 text-sm border rounded">Toevoegen</button>
            </div>
            <div className="space-y-2">
              {(included||[]).map((val, idx)=> (
                <div key={idx} className="flex items-center gap-2">
                  <input type="text" value={val || ''} onChange={e=>{ const next=[...(included||[])]; next[idx] = e.target.value; setIncluded(next) }} className="flex-1 border rounded px-3 py-2" placeholder="bv. Gratis Wifi aan boord" />
                  <button type="button" onClick={()=>{ const next=[...(included||[])]; next.splice(idx,1); setIncluded(next) }} className="px-2 py-1 text-sm border rounded">x</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Niet inbegrepen */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4" id="nietinbegrepen-sections">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Niet inbegrepen</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Items</label>
              <button type="button" onClick={()=> setNotIncluded([...(notIncluded||[]), ''])} className="px-3 py-1 text-sm border rounded">Toevoegen</button>
            </div>
            <div className="space-y-2">
              {(notIncluded||[]).map((val, idx)=> (
                <div key={idx} className="flex items-center gap-2">
                  <input type="text" value={val || ''} onChange={e=>{ const next=[...(notIncluded||[])]; next[idx] = e.target.value; setNotIncluded(next) }} className="flex-1 border rounded px-3 py-2" placeholder="bv. Fooien / Persoonlijke uitgaven" />
                  <button type="button" onClick={()=>{ const next=[...(notIncluded||[])]; next.splice(idx,1); setNotIncluded(next) }} className="px-2 py-1 text-sm border rounded">x</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fotogallerij */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4" id="gallery-section">
        <h2 className="text-lg font-semibold text-gray-900">Foto's (min. 10, geen maximum)</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Foto's toevoegen</label>
            <input type="file" accept="image/*" multiple onChange={async (e)=>{
              const files = Array.from(e.target.files || [])
              if (!files.length) return
              try {
                const urls = await Promise.all(files.map(f => cloudinaryUpload(f)))
                setGallery([...(gallery||[]), ...urls.filter(Boolean).map(u=>({ src: u }))])
              } catch (_) {
                alert('Upload van één of meerdere foto\'s is mislukt')
              } finally {
                e.target.value=''
              }
            }} />
          </div>
          <div className="flex flex-wrap gap-2">
            {(gallery||[]).map((p, idx)=> (
              <div key={idx} className="relative">
                <img src={typeof p === 'string' ? p : p.src} alt="foto" className="w-28 h-20 object-cover rounded" />
                <button type="button" className="absolute -top-2 -right-2 bg-white border rounded px-1 text-xs" onClick={()=>{
                  const next = [...(gallery||[])]
                  next.splice(idx,1)
                  setGallery(next)
                }}>x</button>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600">Huidig aantal: {(gallery||[]).length} (minimaal 10 aangeraden)</div>
        </div>
      </div>

      {/* Reservatie & contact */}
      <div className="space-y-3 border-4 border-gray-400 rounded-md p-4" id="reservatie-section">
        <h2 className="text-lg font-semibold text-gray-900">Reservatie & contact</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tekst <br/>
          <p className="text-xs text-gray-500">Voor een email link : {"<"}a href="mailto:uwemail@example.com"{">"}Stuur een e-mail{"</"}a{">"}<br/>
          Voor een website link : {"<"}a href="https://www.website.com"{">"}Naam van de site{"</"}a{">"}</p>
          </label>
          <RichText value={reservationHtml || ''} onChange={setReservationHtml} placeholder="Reservatie en contact informatie..." />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Brochure (PDF)</label>
          <div className="flex items-center gap-3">
            <input type="file" accept="application/pdf" onChange={async (e)=>{
              const file = e.target.files && e.target.files[0]
              if (!file) return
              try {
                const { cloudinaryUploadPdf } = await import('../../lib/apiClient')
                const url = await cloudinaryUploadPdf(file)
                setReservationBrochureUrl(url || '')
              } catch (_) {
                alert('PDF upload mislukt. Controleer je Cloudinary preset (raw).')
              } finally {
                e.target.value=''
              }
            }} />
            <button type="button" onClick={()=> setReservationBrochureUrl('')} disabled={!reservationBrochureUrl} className="px-3 py-1 text-sm border rounded disabled:opacity-50">Verwijder</button>
          </div>
          {reservationBrochureUrl && (
            <div className="text-xs text-gray-600 break-all">Geselecteerd: {reservationBrochureUrl}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReisSections;