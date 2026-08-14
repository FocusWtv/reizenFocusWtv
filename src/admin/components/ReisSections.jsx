import React from 'react';
import RichText from './RichText';
import { useState } from 'react';
import CollapsibleSection from './CollapsibleSection';
import { cloudflareUploadImage } from '../../lib/apiClient';

const MAX_INTRO_PHOTOS = 2
const MAX_PRIJS_SECTION_PHOTOS = 2

const ReisSections = ({ 
  introTitle,
  setIntroTitle,
  introText, 
  setIntroText,
  introPhotos,
  setIntroPhotos,
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
  prijzenPhotos,
  setPrijzenPhotos,
  prijzenPrijsNaamKolom1,
  setPrijzenPrijsNaamKolom1,
  prijzenPrijsNaamKolom2,
  setPrijzenPrijsNaamKolom2,
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
  reservationLogoUrls,
  setReservationLogoUrls,
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
  const [uploadingIntroPhotos, setUploadingIntroPhotos] = useState(false)
  const [uploadingPrijzenPhotos, setUploadingPrijzenPhotos] = useState(false)
  const [uploadingReservationLogos, setUploadingReservationLogos] = useState(false)

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
    setReportage([...(reportage || []), { accountId: 'VzaPKg', itemId: '' }])
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
      const url = await cloudflareUploadImage(file)
      const photos = Array.isArray(next[idx].photos) ? next[idx].photos : []
      photos.push(url)
      next[idx].photos = photos
      setStayItems(next)
    } catch {
      alert('Upload foto mislukt')
    }
  }
  const addStayItemPhotos = async (idx, fileList) => {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList)
    try {
      const urls = await Promise.all(files.map(f => cloudflareUploadImage(f)))
      const next = [...(stayItems || [])]
      const photos = Array.isArray(next[idx].photos) ? next[idx].photos : []
      next[idx].photos = photos.concat(urls.filter(Boolean))
      setStayItems(next)
    } catch {
      alert('Upload van één of meerdere foto\'s is mislukt')
    }
  }
  return (
    <div className="space-y-8">
      <CollapsibleSection title="Intro sectie">
      {/* Intro sectie */}
      <div className="space-y-3 border-2 border-[#002855] rounded-md p-4">
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

        {/* Intro foto's — zelfde patroon als route/verblijf (max. 2) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Intro foto&apos;s (optioneel, max. {MAX_INTRO_PHOTOS})
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={
                (introPhotos?.length || 0) >= MAX_INTRO_PHOTOS || uploadingIntroPhotos
              }
              onChange={async (e) => {
                const files = Array.from(e.target.files || [])
                if (!files.length) return
                const remaining =
                  MAX_INTRO_PHOTOS - (introPhotos?.length || 0)
                if (remaining <= 0) return
                const toUpload = files.slice(0, remaining)
                try {
                  setUploadingIntroPhotos(true)
                  const urls = await Promise.all(
                    toUpload.map((file) => cloudflareUploadImage(file))
                  )
                  const next = [
                    ...(introPhotos || []),
                    ...urls.filter(Boolean),
                  ].slice(0, MAX_INTRO_PHOTOS)
                  setIntroPhotos(next)
                } catch {
                  alert('Upload mislukt. Probeer opnieuw of kies een andere afbeelding.')
                } finally {
                  setUploadingIntroPhotos(false)
                  e.target.value = ''
                }
              }}
              className="block"
            />
            {uploadingIntroPhotos && (
              <span className="text-sm text-gray-500">Uploaden…</span>
            )}
          </div>
          {(introPhotos || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(introPhotos || []).map((u, pIdx) => (
                <div key={`${u}-${pIdx}`} className="relative">
                  <img
                    src={u}
                    alt={`Intro foto ${pIdx + 1}`}
                    className="w-28 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-white border rounded px-1 text-xs"
                    onClick={() => {
                      const next = [...(introPhotos || [])]
                      next.splice(pIdx, 1)
                      setIntroPhotos(next)
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="text-sm text-gray-600">
            {(introPhotos || []).length}/{MAX_INTRO_PHOTOS} foto&apos;s
          </div>
        </div>
      </div>
      </CollapsibleSection>
      
      <CollapsibleSection title="Infoavond sectie">
      {/* Infoavond sectie */}
      <div className="space-y-3 border-2 border-[#002855] rounded-md p-4" id="infoavond-section">
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
      </CollapsibleSection>
      
      <CollapsibleSection title="Reisroute sectie">
      {/* Reisroute sectie */}
      <div className="space-y-3 border-2 border-[#002855] rounded-md p-4" id="route-section">
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
                  const url = await cloudflareUploadImage(file)
                  setRouteImageUrl(url || '')
                } catch {
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
                        const uploadPromises = files.map(file => cloudflareUploadImage(file));
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
      </CollapsibleSection>

      <CollapsibleSection title="Reportage sectie">
      {/* Reportage sectie */}
      <div className="space-y-3 border-2 border-[#002855] rounded-md p-4" id="reportage-section">
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
                <input type="text" value={v.accountId || 'VzaPKg'} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
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
      </CollapsibleSection>

      <CollapsibleSection title="Verblijfsinfo sectie">
      {/* Verblijfsinfo sectie */}
      <div className="space-y-4 border-2 border-[#002855] rounded-md p-4" id="verblijf-section">
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
                const url = await cloudflareUploadImage(file)
                setStayMainImageUrl(url || '')
              } catch {
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
      </CollapsibleSection>

      <CollapsibleSection title="Prijzen secties">
      {/* Prijzen sectie */}
      <div className="space-y-3 border-2 border-[#002855] rounded-md p-4" id="prijzen-section">
        <h2 className="text-lg font-semibold text-gray-900">Prijzen</h2>
        {/* Foto’s boven prijzentabel op de site (optioneel, zelfde upload als intro) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto&apos;s boven prijzentabel (optioneel, max. {MAX_PRIJS_SECTION_PHOTOS})
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={
                (prijzenPhotos?.length || 0) >= MAX_PRIJS_SECTION_PHOTOS ||
                uploadingPrijzenPhotos
              }
              onChange={async (e) => {
                const files = Array.from(e.target.files || [])
                if (!files.length) return
                const remaining =
                  MAX_PRIJS_SECTION_PHOTOS - (prijzenPhotos?.length || 0)
                if (remaining <= 0) return
                const toUpload = files.slice(0, remaining)
                try {
                  setUploadingPrijzenPhotos(true)
                  const urls = await Promise.all(
                    toUpload.map((file) => cloudflareUploadImage(file))
                  )
                  const next = [
                    ...(prijzenPhotos || []),
                    ...urls.filter(Boolean),
                  ].slice(0, MAX_PRIJS_SECTION_PHOTOS)
                  setPrijzenPhotos(next)
                } catch {
                  alert('Upload mislukt. Probeer opnieuw of kies een andere afbeelding.')
                } finally {
                  setUploadingPrijzenPhotos(false)
                  e.target.value = ''
                }
              }}
              className="block"
            />
            {uploadingPrijzenPhotos && (
              <span className="text-sm text-gray-500">Uploaden…</span>
            )}
          </div>
          {(prijzenPhotos || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(prijzenPhotos || []).map((u, pIdx) => (
                <div key={`prijs-ph-${pIdx}`} className="relative">
                  <img
                    src={u}
                    alt={`Prijzen sectie ${pIdx + 1}`}
                    className="w-28 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-white border rounded px-1 text-xs"
                    onClick={() => {
                      const next = [...(prijzenPhotos || [])]
                      next.splice(pIdx, 1)
                      setPrijzenPhotos(next)
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="text-sm text-gray-600">
            {(prijzenPhotos || []).length}/{MAX_PRIJS_SECTION_PHOTOS} foto&apos;s
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50 rounded border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kolomkop 1e prijs (na &quot;Prijs : &quot;) — optioneel
            </label>
            <input
              type="text"
              value={prijzenPrijsNaamKolom1 || ''}
              onChange={(e) => setPrijzenPrijsNaamKolom1(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="bv. Enkel gebruik schip"
            />
            <p className="mt-1 text-xs text-gray-500">
              Zichtbaar als: Prijs : [ uw tekst ]. Leeg = kop &quot;Prijs&quot;.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kolomkop 2e prijs (na &quot;Prijs : &quot;) — optioneel
            </label>
            <input
              type="text"
              value={prijzenPrijsNaamKolom2 || ''}
              onChange={(e) => setPrijzenPrijsNaamKolom2(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="bv. Dubbel gebruik schip"
            />
            <p className="mt-1 text-xs text-gray-500">
              Tweede kolom op de site. Leeg = kop &quot;Prijs (2)&quot;.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Rijen</label>
            <button type="button" onClick={()=> setPrices([...(prices||[]), { name: '', prijs: '', prijs2: '', bg: '' }])} className="px-3 py-1 text-sm border rounded">Rij toevoegen</button>
          </div>
          <div className="space-y-3">
            {(prices||[]).map((row, idx)=> (
              <div key={idx} className="border rounded p-3 grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Naam verblijf</label>
                  <input type="text" value={row.name || ''} onChange={e=>{ const next=[...(prices||[])]; next[idx] = { ...next[idx], name: e.target.value }; setPrices(next) }} className="w-full border rounded px-3 py-2" placeholder="bv. Standaard kajuit" />
                </div>
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waarde eerste prijskolom
                  </label>
                  <input type="text" value={row.prijs || ''} onChange={e=>{ const next=[...(prices||[])]; next[idx] = { ...next[idx], prijs: e.target.value }; setPrices(next) }} className="w-full border rounded px-3 py-2" placeholder="bv. € 1.299" />
                </div>
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waarde tweede prijskolom
                  </label>
                  <input type="text" value={row.prijs2 || ''} onChange={e=>{ const next=[...(prices||[])]; next[idx] = { ...next[idx], prijs2: e.target.value }; setPrices(next) }} className="w-full border rounded px-3 py-2" placeholder="bv. € 1.499" />
                </div>
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Achtergrondkleur (optioneel)</label>
                  <select
                    value={row.bg || ''}
                    onChange={e=>{ const next=[...(prices||[])]; next[idx] = { ...next[idx], bg: e.target.value }; setPrices(next) }}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Geen</option>
                    <option value="bg-indigo-400">Paars (licht)</option>
                    <option value="bg-green-500">Groen (licht)</option>
                    <option value="bg-amber-500">Oranje (licht)</option>
                    <option value="bg-teal-400">Blauw (licht)</option>
                    <option value="bg-gray-300">Grijs (licht)</option>
                    <option value="bg-yellow-400">Geel (licht)</option>
                    <option value="bg-pink-600">Roze (Fel)</option>
                  </select>
                </div>
                <div className="lg:col-span-12 flex items-center justify-between">
                  <button type="button" onClick={()=>{ const next=[...(prices||[])]; next.splice(idx,1); setPrices(next) }} className="px-3 py-1 text-sm border rounded text-red-600 border-red-300">Verwijderen</button>
                  <button type="button" onClick={()=> setPrices([...(prices||[]), { name: '', prijs: '', prijs2: '', bg: '' }])} className="px-3 py-1 text-sm border rounded">Rij toevoegen</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Prijzen toelichting (optioneel richtext) */}
      <div className="space-y-3 mt-2 border-2 border-[#002855] rounded-md p-4">
        <label className="block text-sm font-medium text-gray-700">Prijzen toelichting (optioneel)</label>
        <RichText value={pricesNote || ''} onChange={setPricesNote} placeholder="Extra toelichting bij prijzen..." />
      </div>
      </CollapsibleSection>
      
      <CollapsibleSection title="Inbegrepen sectie">
      {/* Inbegrepen */}
      <div className="space-y-3 border-2 border-[#002855] rounded-md p-4" id="inbegrepen-sections">
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
      </CollapsibleSection>

      <CollapsibleSection title="Niet inbegrepen sectie">
      {/* Niet inbegrepen */}
      <div className="space-y-3 border-2 border-[#002855] rounded-md p-4" id="nietinbegrepen-sections">
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
      </CollapsibleSection>

      <CollapsibleSection title="Fotogalerij sectie">
      {/* Fotogallerij */}
      <div className="space-y-3 border-2 border-[#002855] rounded-md p-4" id="gallery-section">
        <h2 className="text-lg font-semibold text-gray-900">Foto's (min. 10, geen maximum)</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Foto's toevoegen</label>
            <input type="file" accept="image/*" multiple onChange={async (e)=>{
              const files = Array.from(e.target.files || [])
              if (!files.length) return
              try {
                const urls = await Promise.all(files.map(f => cloudflareUploadImage(f)))
                setGallery([...(gallery||[]), ...urls.filter(Boolean).map(u=>({ src: u }))])
              } catch {
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
      </CollapsibleSection>

      <CollapsibleSection title="Reservatie & contact sectie">
      {/* Reservatie & contact */}
      <div className="space-y-3 border-2 border-[#002855] rounded-md p-4" id="reservatie-section">
        <h2 className="text-lg font-semibold text-gray-900">Reservatie & contact</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Logo&apos;s (optioneel, meerdere mogelijk)
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploadingReservationLogos}
              onChange={async (e) => {
                const files = Array.from(e.target.files || [])
                if (!files.length) return
                try {
                  setUploadingReservationLogos(true)
                  const urls = await Promise.all(
                    files.map((file) => cloudflareUploadImage(file))
                  )
                  const next = [
                    ...(reservationLogoUrls || []),
                    ...urls.filter(Boolean),
                  ]
                  setReservationLogoUrls(next)
                } catch {
                  alert("Logo uploaden is mislukt.")
                } finally {
                  setUploadingReservationLogos(false)
                  e.target.value = ''
                }
              }}
              className="block"
            />
            {uploadingReservationLogos && (
              <span className="text-sm text-gray-500">Uploaden…</span>
            )}
            <button
              type="button"
              onClick={() => setReservationLogoUrls([])}
              disabled={!(reservationLogoUrls || []).length}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50"
            >
              Alle logo&apos;s verwijderen
            </button>
          </div>
          {(reservationLogoUrls || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(reservationLogoUrls || []).map((u, idx) => (
                <div key={`res-logo-${idx}`} className="relative">
                  <img
                    src={u}
                    alt={`Logo ${idx + 1}`}
                    className="max-h-20 max-w-[180px] object-contain border rounded p-1 bg-white"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-white border rounded px-1 text-xs"
                    onClick={() => {
                      const next = [...(reservationLogoUrls || [])]
                      next.splice(idx, 1)
                      setReservationLogoUrls(next)
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tekst <br/>
          <p className="text-xs text-gray-500">Voor een email link : {"<"}a href="mailto:uwemail@example.com"{">"}Stuur een e-mail{"</"}a{">"}<br/>
          Voor een website link : {"<"}a href="https://www.website.com"{">"}Naam van de site{"</"}a{">"}</p>
          </label>
          <RichText value={reservationHtml || ''} onChange={setReservationHtml} placeholder="Reservatie en contact informatie..." />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Brochure (PDF)</label>
          <div className="flex flex-wrap items-center gap-3">
            <input type="file" accept="application/pdf" onChange={async (e)=>{
              const file = e.target.files && e.target.files[0]
              if (!file) return
              try {
                const { githubUploadPdf } = await import('../../lib/apiClient')
                const url = await githubUploadPdf(file)
                setReservationBrochureUrl(url || '')
              } catch (error) {
                alert('PDF upload mislukt: ' + (error.message || 'Onbekende fout'))
              } finally {
                e.target.value=''
              }
            }} />
            <button type="button" onClick={()=> setReservationBrochureUrl('')} disabled={!reservationBrochureUrl} className="px-3 py-1 text-sm border rounded disabled:opacity-50">Verwijder</button>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Of plak een PDF-URL (bv. raw.githubusercontent.com … — voor grote bestanden &gt; ~3 MB)
            </label>
            <input
              type="url"
              value={reservationBrochureUrl || ''}
              onChange={(e) => setReservationBrochureUrl(e.target.value.trim())}
              placeholder="https://raw.githubusercontent.com/FocusWtv/focuswtv-brochures/main/brochures/bestand.pdf"
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>
          {reservationBrochureUrl && (
            <div className="text-xs text-gray-600 break-all">
              Geselecteerd:{' '}
              <a href={reservationBrochureUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {reservationBrochureUrl}
              </a>
            </div>
          )}
        </div>
      </div>
      </CollapsibleSection>
    </div>
  );
};

export default ReisSections;