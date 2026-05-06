import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import {
  collection,
  query as fq,
  where,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PhotoAlbum from "../components/PhotoAlbum";
import { isDatePassed } from "../lib/utils";

// Rest van uw component

const ReisDetail = () => {
  const { slug } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  // Data uit trips + fallback uit homepage_cards
  const [trip, setTrip] = useState(null);
  const [heroUrl, setHeroUrl] = useState("");
  const [heroAlt, setHeroAlt] = useState("");
  const [title, setTitle] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [status, setStatus] = useState("");
  const [hasInfoavond, setHasInfoavond] = useState(false);
  const [actieveFoto, setActieveFoto] = useState(null);
  const [infoavondEvent, setInfoavondEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        // 1) Probeer trips/{slug}
        const d = await getDoc(doc(db, "trips", slug));
        if (d.exists()) {
          const t = d.data();

          // Check of de reis gepubliceerd is
          if (!t.published) {
            alert("Deze reis is nog niet gepubliceerd.");
            window.location.href = "/";
            return;
          }

          setTrip(t);
          setHeroUrl(t?.hero?.url || "");
          setHeroAlt(t?.hero?.alt || t?.title || "");
          setTitle(t?.title || "");
          setDateRange(t?.dateRange || "");
          setStatus(t?.status || "");
          
          // Infoavond logica - controleer of event bestaat en niet verstreken is
          if (t?.sections?.infoavond?.slug) {
            try {
              // Haal event data op
              const eventQuery = fq(
                collection(db, "events"),
                where("slug", "==", t.sections.infoavond.slug),
                limit(1)
              );
              const eventSnap = await getDocs(eventQuery);
              
              if (!eventSnap.empty) {
                const eventData = eventSnap.docs[0].data();
                setInfoavondEvent(eventData);
                
                // Controleer of datum verstreken is
                const isExpired = isDatePassed(eventData.dateTime);
                setHasInfoavond(!isExpired);
                
                console.log(`Infoavond "${eventData.title}" - Datum: ${eventData.dateTime}, Verstreken: ${isExpired}`);
              } else {
                // Event niet gevonden
                setHasInfoavond(false);
                setInfoavondEvent(null);
                console.warn(`Infoavond event met slug "${t.sections.infoavond.slug}" niet gevonden`);
              }
            } catch (error) {
              console.error("Fout bij ophalen infoavond event:", error);
              setHasInfoavond(false);
              setInfoavondEvent(null);
            }
          } else {
            setHasInfoavond(false);
            setInfoavondEvent(null);
          }

          // Debug: log de brochure URL
          if (t?.sections?.reservatie) {
            console.log(
              "Brochure URL geladen:",
              t.sections.reservatie.brochureUrl
            );
            // console.log("Reservatie HTML geladen:", t.sections.reservatie.html);
            // console.log("Volledige reservatie object:", t.sections.reservatie);
          }
        } else {
          // 2) Fallback: homepage_cards op basis van slug
          const q = fq(
            collection(db, "homepage_cards"),
            where("slug", "==", slug),
            limit(1)
          );
          const snap = await getDocs(q);
          if (!snap.empty) {
            const data = { id: snap.docs[0].id, ...snap.docs[0].data() };
            setHeroUrl(data.imageUrl || "");
            setHeroAlt(data.title || "");
            setTitle(data.title || "");
            setDateRange(data.dateRange || data.date || data.text || "");
            setStatus(data.status || "");
            // Voor homepage_cards fallback geen infoavond ondersteuning
            setHasInfoavond(false);
            setInfoavondEvent(null);
          }
        }
      } catch (_e) {}
    };
    load();
  }, [slug]);

  const hasVoorwaarden = Boolean(trip?.sections?.voorwaarden?.html);

  return (
    <section>
      <div className="relative" id="home">
        <img
          src={heroUrl || ""}
          alt={heroAlt || "image"}
          className=" w-full h-96 lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-center p-4">
          {/* White overlay box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md text-center shadow-lg text-black opacity-65 hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {title || "Reis"}
            </h1>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            {dateRange && (
              <p className="text-sm text-gray-700 font-bold">
                DATUM:
                <br />
                {dateRange}
              </p>
            )}
          </div>
          {/** status label */}
          {status && (
            <div
              className={`mt-3 ${
                status === "volzet" ? "bg-red-500" : "bg-green-500"
              } text-white underline font-semibold py-3 px-6 rounded-lg border-4 shadow-lg flex items-center gap-2`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          )}
          {trip?.sections?.reservatie?.brochureUrl && (
            <div className="mt-4 flex flex-col items-center">
              <a
                href={trip.sections.reservatie.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-md text-center font-extrabold shadow-lg text-[#162b58] opacity-65 hover:opacity-100 transition-opacity duration-300"
                onClick={(e) => {
                  console.log(
                    "Brochure link geklikt:",
                    trip.sections.reservatie.brochureUrl
                  );
                }}
              >
                Download de brochure
              </a>
            </div>
          )}
        </div>
      </div>

      {/** Navigation */}
      <div className="sticky top-[0.2px] z-40 bg-[#4ab0e1] shadow-md">
        <div className="mx-auto flex justify-center items-center">
          <Navbar
            expand="lg"
            expanded={menuOpen}
            onToggle={(val) => setMenuOpen(val)}
            className="flex justify-center text-lg text-white items-center p-[8px]"
          >
            <Container>
              {/* Add the toggle button for mobile/tablet */}
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="lg:hidden border-0 shadow-none"
                style={{
                  backgroundImage: "none",
                  color: "white",
                }}
              >
                {menuOpen ? (
                  <span className="text-white text-2xl leading-none">
                    &times;
                  </span>
                ) : (
                  <span className="text-white text-2xl leading-none">?</span>
                )}
              </Navbar.Toggle>

              <Navbar.Collapse
                id="basic-navbar-nav"
                className="bg-[#4ab0e1] lg:bg-transparent"
              >
                <Nav
                  className="mx-auto p-1 text-center font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  <Nav.Link href="/" className="mx-2 text-white">
                    {"<-"} Terug
                  </Nav.Link>
                  <Nav.Link href="#home" className="mx-2 text-white">
                    Intro
                  </Nav.Link>
                  {hasInfoavond && (
                    <Nav.Link href="#infoavond" className="mx-2 text-white">
                      Infoavond
                    </Nav.Link>
                  )}
                  <Nav.Link href="#route" className="mx-2 text-white">
                    Route
                  </Nav.Link>
                  <Nav.Link href="#reportage" className="mx-2 text-white">
                    Reportage
                  </Nav.Link>
                  <Nav.Link href="#verblijf" className="mx-2 text-white">
                    Verblijf
                  </Nav.Link>
                  <Nav.Link href="#prijs" className="mx-2 text-white">
                    Prijs
                  </Nav.Link>
                  <Nav.Link href="#inbegrepen" className="mx-2 text-white">
                    Inclusief
                  </Nav.Link>
                  {hasVoorwaarden && (
                    <Nav.Link href="#voorwaarden" className="mx-2 text-white">
                      Voorwaarden
                    </Nav.Link>
                  )}
                  <Nav.Link href="#fotos" className="mx-2 text-white">
                    Foto's
                  </Nav.Link>
                  <Nav.Link href="#reservatie" className="mx-2 text-white">
                    Reservatie
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>

      {/* Intro dynamisch */}
      {(trip?.sections?.intro?.title || trip?.sections?.intro?.html) && (
        <div className="text-center mb-8" id="intro">
          {trip?.sections?.intro?.title && (
            <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
              {trip.sections.intro.title}
            </h2>
          )}
          {trip?.sections?.intro?.html && (
            <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
              <style>{`.rt-html ul{list-style:disc;padding-left:1.25rem} .rt-html ol{list-style:decimal;padding-left:1.25rem}`}</style>
              <div
                className="text-lg prose max-w-none inline-block text-center rt-html"
                dangerouslySetInnerHTML={{ __html: trip.sections.intro.html }}
              />
            </div>
          )}
        </div>
      )}

      {/** Info Avond */}
      {hasInfoavond && trip?.sections?.infoavond?.slug && infoavondEvent && (
        <div className="text-center mb-8" id="infoavond">
          <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
            Infoavond
          </h2>
          <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
            {(trip.sections.infoavond.title || infoavondEvent.title) && (
              <p className="text-lg">{trip.sections.infoavond.title || infoavondEvent.title}</p>
            )}
            {infoavondEvent.dateTime && (
              <p className="text-md text-gray-600 mb-4">{infoavondEvent.dateTime}</p>
            )}
            <a
              className="group mt-10 relative inline-block text-sm font-medium text-[#162b58] focus:ring-3 focus:outline-hidden"
              href={`/infoavonden/${trip.sections.infoavond.slug}`}
            >
              <span className="absolute inset-0 rounded-lg translate-x-2 translate-y-2 bg-[#162b58] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="relative text-2xl text-white block border border-current rounded-lg bg-[#162b58] px-8 py-3">
                Interesse? Schrijf je <b>HIER</b> in voor deze infoavond.
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Reis route */}
      {(() => {
        const routeData = trip?.sections?.route;
        const hasDays =
          Array.isArray(routeData?.days) && routeData.days.length > 0;
        const hasImage = Boolean(routeData?.imageUrl);
        if (!hasDays && !hasImage) return null;
        return (
          <div className="mt-16" id="route">
            <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8">
              Reisroute
            </h2>
            <div
              className={`flex items-start gap-4 mx-4 mt-10 lg:mx-16 ${
                hasImage ? "flex-col lg:flex-row" : "flex-col"
              }`}
            >
              {/* Image container */}
              {hasImage && (
                <div className="w-full md:mx-auto lg:w-1/2">
                  <img
                    src={routeData.imageUrl}
                    alt="Reisroute"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              {/* Accordion container */}
              <div
                className={`${
                  hasImage
                    ? "w-full lg:w-1/2"
                    : "w-full lg:w-2/3 xl:w-1/2 mx-auto"
                } flex flex-col gap-4`}
              >
                {hasDays &&
                  routeData.days.map((d, idx) => {
                    const titleParts = [d.day, d.date, d.place].filter(Boolean);
                    const summaryText = titleParts.join(" – ");
                    return (
                      <div
                        key={`${d.day}-${d.date}-${idx}`}
                        className="w-full text-[#162b58] space-y-4"
                      >
                        <details className="border rounded-lg">
                          <summary className="p-4 font-semibold cursor-pointer text-left">
                            {summaryText || `Dag ${idx + 1}`}
                          </summary>
                          <div className="p-4 border-t text-center">
                            {d?.html
                              ? (() => {
                                  const html = String(d.html || "").replace(
                                    /\r?\n/g,
                                    "<br />"
                                  );
                                  return (
                                    <div>
                                      <style>{`.rt-html ul{list-style:disc;padding-left:1.25rem} .rt-html ol{list-style:decimal;padding-left:1.25rem}`}</style>
                                      <div
                                        className="text-md prose max-w-none rt-html"
                                        dangerouslySetInnerHTML={{
                                          __html: html,
                                        }}
                                      />
                                    </div>
                                  );
                                })()
                              : null}
                            {/* Foto's per dag */}
                            {Array.isArray(d?.photos) && d.photos.length > 0 && (
                              <div className="mt-4 flex justify-center">
                                <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
                                  {d.photos.map((photo, photoIdx) => (
                                    <div key={photoIdx} className="relative group">
                                      <img 
                                        src={photo} 
                                        alt={`Dag ${idx + 1} foto ${photoIdx + 1}`} 
                                        className="w-56 h-56 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => setActieveFoto(photo)}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </details>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      })()}

      {/** Reportage */}
      {Array.isArray(trip?.sections?.reportage) &&
        trip.sections.reportage.length > 0 && (
          <div className="text-center my-16" id="reportage">
            <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8">
              Reportage
            </h2>
            <div className="mt-8 space-y-10">
              {trip.sections.reportage.map((vid, idx) => (
                <div
                  key={`${vid.accountId}-${vid.itemId}-${idx}`}
                  className="relative sm:mx-12 md:mx-16 lg:mx-32 xl:mx-48 aspect-video bg-gray-500 rounded-xl overflow-hidden shadow-2xl"
                >
                  <iframe
                    src={`https://player.clevercast.com/?account_id=${encodeURIComponent(
                      vid.accountId
                    )}&item_id=${encodeURIComponent(vid.itemId)}`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen"
                    title={`Reportage Video ${idx + 1}`}
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        )}

      {/** Verblijfsinformatie */}
      {(() => {
        const verblijf = trip?.sections?.verblijf;
        if (!verblijf) return null;
        const hasMain = Boolean(verblijf.mainImageUrl);
        const hasItems =
          Array.isArray(verblijf.items) && verblijf.items.length > 0;
        if (!hasMain && !hasItems) return null;
        const toAlbumPhotos = (urls = []) =>
          urls.map((u) => ({ src: u, width: 1600, height: 900 }));
        return (
          <div className="text-center my-16 mx-8 mb-10 lg:mx-32" id="verblijf">
            <h1 className="text-3xl text-[#162b58] font-bold mb-8">
              Verblijfsinfo
            </h1>
            {hasMain && (
              <div className="relative">
                <img
                  src={verblijf.mainImageUrl}
                  alt={verblijf.overlayTitle || "Verblijf"}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-md"
                />
                {/* Main content overlay */}
                <div className="absolute inset-0 flex flex-col justify-start items-center p-2 sm:p-4">
                  {/* White overlay box - more responsive */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg mb-2 p-3 sm:p-4 md:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center shadow-lg text-black">
                    <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#162b58] font-bold mb-2 leading-tight">
                      {verblijf.overlayTitle || "HOTELS"}
                    </h1>
                    <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
                  </div>
                </div>
              </div>
            )}

            {hasItems &&
              verblijf.items.map((it, idx) => (
                <div key={`stay-${idx}`} className="relative">
                  {it.title && (
                    <h2 className="text-xl mt-10 font-bold text-[#162b58]">
                      {it.title}
                    </h2>
                  )}
                  {it.html && (
                    <div className="text-lg text-[#162b58] mt-4 text-left mx-auto max-w-5xl">
                      <style>{`.rt-html ul{list-style:disc;padding-left:1.25rem} .rt-html ol{list-style:decimal;padding-left:1.25rem}`}</style>
                      <div
                        className="prose max-w-none rt-html"
                        dangerouslySetInnerHTML={{ __html: it.html }}
                      />
                    </div>
                  )}
                  {it.photos && it.photos.length > 0 && (
                    <div className="relative mb-10 flex w-full flex-col items-center lg:mb-16">
                      <div className="mb-10 w-full">
                        <PhotoAlbum
                          photos={toAlbumPhotos(it.photos)}
                          centered
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        );
      })()}

      {/** Prijs */}
      {Array.isArray(trip?.sections?.prijzen) &&
        trip.sections.prijzen.length > 0 && (
          <div
            className="text-center my-16 mx-8 mt-16 mb-10 lg:mx-32"
            id="prijs"
          >
            <div className="flex flex-col mx-8 mt-10 lg:mx-32">
              <div className="mb-10">
                <h1 className="text-3xl mt-10 text-[#162b58] font-bold mb-8">
                  Prijzen
                </h1>
                <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white">
                  <div className="border-2  rounded-lg border-[#162b58] shadow-lg">
                    <div className="bg-gray-100 p-3 sm:p-4 text-center rounded-lg border-b-2 border-[#162b58]">
                      <h2 className="text-lg sm:text-xl font-bold">
                        PRIJS IN EURO PER PERSOON
                      </h2>
                    </div>

                    {/* Desktop/Tablet Table View */}
                    <div className="hidden sm:block">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-300">
                            <th className="text-left p-3 font-medium text-gray-600 w-1/2"></th>
                            <th className="text-center p-3 font-medium text-gray-400 italic w-1/4">
                              Prijs enkel
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {trip.sections.prijzen.map((row, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-200"
                            >
                              <td
                                className={`p-3 font-medium text-[#162b58] ${
                                  row.bg || ""
                                }`}
                              >
                                {row.name}
                              </td>
                              <td className="p-3 text-center font-semibold">
                                {row.prijs}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="sm:hidden">
                      {trip.sections.prijzen.map((row, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 last:border-b-0"
                        >
                          <div
                            className={`p-3 font-medium ${
                              row.bg || ""
                            } text-gray-800 text-center`}
                          >
                            {row.name}
                          </div>
                          <div className="p-3 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">
                                Prijs:
                              </span>
                              <span className="font-semibold">{row.prijs}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Optional aanvullende voetnoot kan later dynamisch gemaakt worden */
                    }
                    {trip.sections.prijzenNote && (
                      <div className="text-left mt-6 mx-8 lg:mx-32">
                        <div className="prose max-w-none rt-html" dangerouslySetInnerHTML={{ __html: trip.sections.prijzenNote }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/** Inbegrepen */}

      {Array.isArray(trip?.sections?.inbegrepen) &&

        trip.sections.inbegrepen.length > 0 && (

          <div

            className="mt-10 box-border w-full pr-8 pl-4 sm:pl-6 lg:pr-32 lg:pl-8"

            id="inbegrepen"

          >

            <h2 className="text-3xl text-[#162b58] text-center font-bold mb-4">

              Inbegrepen

            </h2>

            <div className="md:pl-[25vw]">

              <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">

                {trip.sections.inbegrepen.map((item, idx) => (

                  <li key={idx}>{item}</li>

                ))}

              </ul>

            </div>

          </div>

        )}
      {/** Niet inbegrepen */}

      {Array.isArray(trip?.sections?.nietInbegrepen) &&

        trip.sections.nietInbegrepen.length > 0 && (

          <div

            className="mt-10 box-border w-full pr-8 pl-4 sm:pl-6 lg:pr-32 lg:pl-8"

            id="nietinbegrepen"

          >

            <h2 className="text-3xl text-[#162b58] text-center font-bold mb-4">

              Niet inbegrepen

            </h2>

            <div className="md:pl-[25vw]">

              <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">

                {trip.sections.nietInbegrepen.map((item, idx) => (

                  <li key={idx}>{item}</li>

                ))}

              </ul>

            </div>

          </div>

        )}
      {/** Gallerij  */}
      {Array.isArray(trip?.sections?.gallery) &&
        trip.sections.gallery.length > 0 && (
          <div className="mx-8 mt-10 lg:mx-32" id="fotos">
            <h2 className="text-3xl text-[#162b58] text-center font-bold mb-4">
              Foto's
            </h2>
            <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
              <PhotoAlbum photos={trip.sections.gallery} />
            </div>
          </div>
        )}

      {/** Reservatie en contact info*/}
      {trip?.sections?.reservatie &&
        (trip.sections.reservatie.html || trip.sections.reservatie.logoUrl) && (
          <div className="mx-8 mt-10 lg:mx-32" id="reservatie">
            <h2 className="text-3xl text-[#162b58] text-center font-bold mb-4">
              Reservatie
            </h2>
            {trip.sections.reservatie.logoUrl && (
              <div className="mt-4 mb-4 flex justify-center">
                <img
                  src={trip.sections.reservatie.logoUrl}
                  alt=""
                  className="max-h-24 w-auto max-w-full object-contain"
                />
              </div>
            )}
            {trip.sections.reservatie.html && (
              <div
                className="text-lg text-[#162b58] mt-2 text-left mx-4 lg:mx-0 prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: trip.sections.reservatie.html,
                }}
              />
            )}
          </div>
        )}

      {/** Back to alle reizen */}
      <div className="mx-8 mt-10 lg:mx-32">
        <Link
          to="/"
          className="mx-auto mb-10 inline-flex items-center justify-center gap-2 bg-[#162b58] hover:!bg-[#4ab0e1] text-white font-semibold px-5 py-2.5 rounded-full shadow-md duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Terug naar alle reizen</span>
        </Link>
      </div>

      {actieveFoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActieveFoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl leading-none px-3 py-1 rounded hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setActieveFoto(null);
            }}
            aria-label="Sluiten"
            title="Sluiten"
          >
            ×
          </button>
          <img
            src={actieveFoto}
            alt="Foto"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default ReisDetail;
