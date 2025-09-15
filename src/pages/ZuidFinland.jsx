import { useState } from "react";
import GlobalNavbar from "../components/GlobalNavbar";
import zuidfinland from "../assets/Finland.jpg";
import route from "../assets/finland/route-Finland.jpg";
import hotel from "../assets/finland/hotel/Foto-buiten.webp";
import BusinessInfoCard from "../components/BusinessInfoCard";
import logo from "../assets/finland/logo.png";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PhotoAlbum from "../components/PhotoAlbum";
import helsinki1 from "../assets/finland/hotel/helsinki/buitenkant.jpg";
import helsinki2 from "../assets/finland/hotel/helsinki/dak.jpg";
import helsinki3 from "../assets/finland/hotel/helsinki/kamer.jpg";
import turku1 from "../assets/finland/hotel/turku/omgeving.jpg";
import turku2 from "../assets/finland/hotel/turku/kamer-2.jpg";
import turku3 from "../assets/finland/hotel/turku/ontbijt.jpg";
import tampere1 from "../assets/finland/hotel/tampere/kamer-2.jpg";
import tampere2 from "../assets/finland/hotel/tampere/ontbijt-2.jpg";
import zf1 from "../assets/finland/Finland-3.jpg";
import zf3 from "../assets/finland/Finland-4.jpg";
import zf4 from "../assets/finland/Finland-5.jpg";
import zf5 from "../assets/finland/Finland-6.jpg";
import zf6 from "../assets/finland/Finland-7.jpeg";
import zf7 from "../assets/finland/Finland-8.jpg";
import zf8 from "../assets/finland/Finland-9.jpg";
import zf9 from "../assets/finland/Finland-10.jpg";
import zf10 from "../assets/finland/Finland-11.jpg";
import zf11 from "../assets/finland/Finland-12.jpg";
import zf12 from "../assets/finland/Finland-13.jpg";
import zf13 from "../assets/finland/Finland-14.jpeg";
import zf14 from "../assets/finland/Finland-15.jpg";
import zf15 from "../assets/finland/Finland-16.jpg";
import zf16 from "../assets/finland/Finland-17.jpg";
import zf17 from "../assets/finland/Finland-1.jpeg";

const ZuidFinland = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const suiteData = [
    {
      name: "Standaard tweepersoonskamer",
      color: "bg-orange-400",
      dubbele: "€2.599 p.p.",
      individuele: "€2.599 p.p.",
    },
    {
      name: "Standaard eenpersoonskamer",
      color: "bg-blue-200",
      dubbele: "€3.085 p.p.",
      individuele: "€3.085 p.p.",
    },
  ];

  const helsinkiPhotos = [
    { width: 1600, height: 900, src: helsinki1 },
    { width: 1600, height: 900, src: helsinki2 },
    { width: 1600, height: 900, src: helsinki3 },
  ];

  const turkuPhotos = [
    { width: 1600, height: 900, src: turku1 },
    { width: 1600, height: 900, src: turku2 },
    { width: 1600, height: 900, src: turku3 },
  ];

  const tamperePhotos = [
    { width: 1600, height: 900, src: tampere1 },
    { width: 1600, height: 900, src: tampere2 },
  ];

  const zfPhotos = [
    { width: 1600, height: 900, src: zf1 },
    { width: 1600, height: 1067, src: zf3 },
    { width: 1600, height: 900, src: zf4 },
    { width: 1600, height: 900, src: zf5 },
    { width: 1600, height: 900, src: zf6 },
    { width: 1600, height: 900, src: zf7 },
    { width: 1600, height: 900, src: zf8 },
    { width: 1600, height: 900, src: zf9 },
    { width: 1600, height: 900, src: zf10 },
    { width: 1600, height: 900, src: zf11 },
    { width: 1600, height: 900, src: zf12 },
    { width: 1600, height: 900, src: zf13 },
    { width: 1600, height: 900, src: zf14 },
    { width: 1600, height: 900, src: zf15 },
    { width: 1600, height: 900, src: zf16 },
    { width: 1600, height: 900, src: zf17 },
  ];

  return (
    <section>
      <GlobalNavbar />
      <div className="relative" id="home">
        <img
          src={zuidfinland}
          alt={"image"}
          className=" w-full h-96 lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-center p-4">
          {/* White overlay box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md text-center shadow-lg text-black opacity-65 hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Reis naar Zuid-Finland
            </h1>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            <p className="text-sm text-gray-700 font-bold">
              DATUM:
              <br />
              17 - 24 juni 2026
            </p>
          </div>
          {/* brochure Button */}
          <a
            href="/assets/brochures/Brochure-Zuid-Finland-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 bg-white hover:bg-[#4ab0e1] text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Bekijk de brochure
          </a>
          {/** status label */}
          <div className="mt-3 bg-green-500 text-white underline font-semibold py-3 px-6 rounded-lg border-4 shadow-lg flex items-center gap-2">
            Beschikbaar
          </div>
        </div>
      </div>

      {/** Navigation */}
      <div className="sticky top-[72px] z-40 bg-[#4ab0e1] shadow-md">
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
                  <span className="text-white text-2xl leading-none">☰</span>
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
                  <Nav.Link href="#home" className="mx-2 text-white">
                    Home
                  </Nav.Link>
                  <Nav.Link href="#infoavond" className="mx-2 text-white">
                    Infoavond
                  </Nav.Link>
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
                  <Nav.Link href="#voorwaarden" className="mx-2 text-white">
                    Voorwaarden
                  </Nav.Link>
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

      {/* Finland reis */}
      <div className="text-center mb-8" id="intro">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
          Zuid-Finland reis
        </h2>
        <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
          <p className="text-lg">
            In juni 2026 willen we graag in Finland midzomer gaan vieren. De
            langste dag. De zon die nauwelijks ondergaat. Muziek, dans,
            folklore, bloemenkransen, berkentakjes, nieuwe aardappelen, vis, de
            eerste aardbeien, vreemde gebruiken, een beetje magie en
            vreugdevuren…. Een heel bijzonder moment. Daar kijken we naar uit!{" "}
            <br />
            <br />
            In die periode maken we een rondreis daar in het land. Waarbij we
            starten in de hoofdstad Helsinki. Een jonge hoofdstad, met een heel
            verhaal. Waar je je ogen uitkijkt als het over architectuur gaat,
            met een pak knappe musea, en een topbestemming voor
            designliefhebbers. Waar de markt uitgeeft op de Finse golf, en waar
            je er snel achter komt dat Finland het land van ‘duizend eilandjes’
            is. We gaan varen door de archipel, en we genieten van een lunch en
            een rondleiding op het forteiland Suomenlinna – wat een stad op zich
            is. Van Helsinki gaan we vervolgens naar het Nuuksio Nationaal park
            voor een wandeling door de Finse bossen - langs rotsen, mossen &
            meren. En we doen zoals de Finnen doen, buiten eten aan het vuur.
            Daarna zetten we koers naar Turku, de oudste stad van het land en
            naar Naantali, waar de charme van het oude stadscentrum en de
            gekleurde huisjes je bijna een sprookjesgevoel geven. In Tampere
            hebben ze zo’n 2500 meren in de regio. Dé plek voor een boottocht
            samen. En wie wil, kan ook nog een namiddag komen kanovaren. Hier
            zoeken we het ook nog wat ‘hogerop’ op de Näsinneula-toren, we komen
            te weten waarom de stad ooit de bijnaam het ‘Manchester van Finland’
            kreeg. En omdat dit de saunahoofdstad van het land is, gaan we ook
            dat uitproberen.
          </p>
        </div>

        {/** Info Avond */}
        <div className="text-center mb-8" id="infoavond">
          <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
            Infoavond
          </h2>
          <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
            <p className="text-lg">
              We organiseren op 3 december 2025 een infoavond in het Historium
              Brugge. We openen de deuren om 18u15, en starten om 18u45.
            </p>
            <a
              class="group mt-10 relative inline-block text-sm font-medium text-[#162b58] focus:ring-3 focus:outline-hidden"
              href="https://focus-wtv.be/reizen/finland-2026-infoavond"
            >
              <span class="absolute inset-0 rounded-lg translate-x-0.5 translate-y-0.5 bg-[#162b58] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span class="relative text-2xl text-white block border border-current rounded-lg bg-[#162b58] px-8 py-3">
                Interesse? Schrijf je <b>HIER</b> in voor deze infoavond.
              </span>
            </a>
          </div>
        </div>

        {/* Reis route */}
        <div className="mt-16" id="route">
          <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8">
            Reisroute
          </h2>
          <div className="flex items-start gap-4 mx-4 mt-10 lg:mx-16 flex-col lg:flex-row">
            {/* Image container */}
            <div className="w-full md:mx-auto lg:w-1/2">
              <img
                src={route}
                alt="Reisroute"
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Accordion container */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    WOENSDAG 17 JUNI 2026 – BRUSSEL -{">"} HELSINKI
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      We verzamelen op de luchthaven van Zaventem, waar je ook
                      meteen je gids ontmoet. We nemen een rechtstreekse vlucht
                      met Finnair naar Helsinki (+/-2u40). Bij aankomst wacht
                      onze transfer ons op en brengt ons naar Solo Sokos Hotel
                      Pier 4 – een gloednieuw hotel, in een schitterend gebouw!
                      Hier verblijven we 3 nachten. We zitten vlakbij het
                      stadcentrum. Wie zin heeft, kan zelf al op een eerste
                      verkenning gaan. De markt – die uitkijkt op de Finse Golf
                      – ligt vlakbij. Daar vind je heel wat kraampjes met lokaal
                      handwerk. Ook de overdekte markt ‘kauppahalli’ ligt hier
                      vlakbij! ‘s Avonds genieten we van een heerlijk 3-gangen
                      diner in het restaurant van het hotel: Harbore. Hier
                      geniet je van een heerlijke culinaire ervaring, aangevuld
                      met een prachtig uitzicht op zee.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DONDERDAG 18 JUNI 2026 - HELSINKI
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md mt-2">
                        Na een heerlijk ontbijt is het tijd om op ontdekking te
                        gaan. Vandaag trek je door Helsinki tijdens een
                        begeleide wandeling langs de belangrijkste hoogtepunten
                        van de stad. Je wandelt langs iconische plekken zoals de
                        Dom van Helsinki aan het Senaatsplein, het Presidentieel
                        Paleis, het Stadhuis, het parlementsgebouw, Finlandia
                        Hall, met als één van de hoogtepunten, de moderne
                        Oodi-bibliotheek en de prachtige art nouveau wijken. Een
                        bijzonder moment tijdens deze tour is het bezoek aan de
                        Temppeliaukio-kerk, beter bekend als de Rotskerk – een
                        architectonisch meesterwerk, uitgehouwen in massieve
                        rots en beroemd om haar serene sfeer en unieke
                        akoestiek. Na de tour geniet je van een verzorgde lunch
                        in buffetvorm bij Sofia Restaurant & Bar, een sfeervolle
                        locatie vlak bij het Senaatsplein. Hier proef je
                        internationale smaken bereid met topkwaliteit Finse
                        ingrediënten – een perfecte afsluiter van een
                        inspirerende ochtend. Na de lunch is er tijd voor een
                        optioneel bezoek aan één van de vele musea van Helsinki
                        onder begeleiding van een lokale gids (Design Museum,
                        Ateneum Art Museum of Museum of Contemporary Art
                        Kiasma). Door de midzomerfestiviteiten sluiten deze
                        reeds om 17:00. ‘s Avonds geniet je nog een keertje van
                        een heerlijk 3-gangen diner in restaurant Harbore.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    VRIJDAG 19 JUNI 2026 – HELSINKI -{">"} SUOMENLINNA
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Je dag begint met een heerlijk ontbijt en daarna neem je
                      de ferry naar een van Helsinki’s meest geliefde
                      bezienswaardigheden, het eiland Suomenlinna. Dit imposant
                      forteiland, gebouwd in de 18e eeuw door de Zweden, is
                      inmiddels uitgeroepen tot UNESCO Werelderfgoed. Al
                      wandelend met een lokale gids ontdek je de oude bastions,
                      tunnels en vestingmuren, en je krijgt een inkijk in de
                      militaire geschiedenis van de regio – met hoogtepunten
                      zoals de King’s Gate en de Grote Binnenplaats. Na deze
                      rondleiding geniet je van een ontspannen boottocht door de
                      archipel van Helsinki – een unieke kans om de stad vanaf
                      het water te ontdekken. Vanuit de haven op het eiland vaar
                      je langs een indrukwekkend landschap van kleine eilanden,
                      rotsachtige kusten en stille baaien. Op het dek voel je de
                      frisse zeewind en geniet je van weidse uitzichten over de
                      Baltische Zee, terwijl je langs enkele van de mooiste
                      stukken kustlijn van Oost-Helsinki vaart. Geniet hier ook
                      van een heerlijk lunchbuffet aan boord. Geniet van een
                      vrije middag. ‘s Avonds dineer je voor een laatste keer
                      bij restaurant Harbore waar je smaakpapillen verwend
                      worden tijdens een 3-gangen diner. <br /> <br />
                      Nadien brengt de bus jullie naar Seurasaari, waar elk jaar
                      rond midzomer het eiland tot leven komt met een van de
                      meest geliefde Finse tradities: de Seurasaari
                      Midzomerfestiviteiten. Tijdens dit sfeervolle evenement
                      ervaar je authentieke Finse gebruiken, volksdansen, muziek
                      en ambachten in een prachtig openluchtmuseum. De
                      festiviteiten brengen jong en oud samen om de zonnewende
                      te vieren – een magisch moment van licht, natuur en
                      gemeenschap. Er zal een shuttle zijn die iedereen terug
                      naar het hotel brengt.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    ZATERDAG 20 JUNI 2026 – NUUKSIO NATIONAAL PARK -{">"} TURKU
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Vandaag laat je de stad achter je en trek je de Finse
                      natuur in. Met de bus reis je richting Turku, maar
                      onderweg maak je een bijzondere tussenstop in het Nuuksio
                      Nationaal Park, op slechts 40 minuten van Helsinki. In dit
                      prachtige natuurgebied maak je een korte wandeling over
                      goed gemarkeerde paden, langs bossen, meren en
                      rotspartijen. Hier adem je de frisse lucht in, luister je
                      naar de stilte van het woud en voel je de rust van de
                      natuur – een ervaring die de Finnen koesteren. De omgeving
                      van Haukkalampi biedt naast wandelingen ook tal van
                      mogelijkheden voor degenen die het liever gewoon wat
                      rustiger aan doen. Als lunch geniet je van een echte
                      outdoorlunch rond het kampvuur, compleet met soep, brood
                      en Finse worstjes boven het vuur. Een authentiek moment in
                      de geest van het Finse buitenleven. Na deze stop reis je
                      verder naar Turku, waar je na het inchecken wordt
                      uitgenodigd voor een sfeervolle Finse midzomerbarbecue.
                      Zoals het hoort tijdens Juhannus, het midzomerfeest,
                      draait alles om de natuur, lekker eten van de grill,
                      bloemenkransen, een goed kampvuur en natuurlijk gezellig
                      samen zijn op de langste dag van het jaar – wanneer de zon
                      bijna niet ondergaat. Het heerlijke buffet wordt aangevuld
                      met 2 glazen wijn per persoon.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    ZONDAG 21 JUNI 2026 – TURKU & NAANTALI
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md">
                        Geniet ‘s ochtends eerst van een deugddoend ontbijt
                        alvorens aan de dag te starten. Op dag vijf leer je het
                        zuidwesten van Finland beter kennen, met een bezoek aan
                        Turku, de oudste stad van het land en de voormalige
                        hoofdstad. Tijdens een begeleide bus- en wandeltour
                        nemen lokale gidsen je mee langs de belangrijkste
                        bezienswaardigheden van de stad, zoals het imposante
                        kasteel van Turku, de kathedraal en de oevers van de
                        rivier de Aura – het levendige hart van de stad. <br />
                        <br />
                        Jullie brengen ook een bezoek aan Luostarinmäki, een
                        uniek openluchtmuseum dat je meeneemt naar het
                        ambachtelijke leven van Finland in de late 18e en vroege
                        19e eeuw. Met originele gebouwen, levende ambachten en
                        een historische sfeer is het een ideale plek voor
                        culturele ontdekking. Dit stukje bleef als enige over na
                        de Grote Brand in 1827, een unieke enclave die als enige
                        een venster biedt op hoe Turku er vóór de verwoestende
                        brand uitzag. Na de stadsrondrit zet je koers naar het
                        nabijgelegen Naantali, een charmant kustplaatsje dat
                        bekend staat om zijn kleurrijke houten huizen,
                        kronkelende straatjes en gezellige jachthaven. Hier
                        geniet je van een gezamenlijke buffetlunch in een
                        sfeervol lokaal restaurant, waarna je vrije tijd hebt om
                        de stad op eigen tempo te ontdekken. Wandel langs de
                        promenade, duik een boetiekje in, bezoek het
                        kloostergebied of geniet gewoon van een kop koffie met
                        uitzicht op zee. Naantali ademt rust en schoonheid – de
                        perfecte plek om even te ontspannen en op te gaan in het
                        charmante Finse kustleven. ‘s Avonds schuiven we met
                        onze voeten onder tafel in het restaurant van het hotel
                        voor een 3-gangen diner.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    MAANDAG 22 JUNI 2026 – TAMPERE
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Vandaag neem je afscheid van Turku en reis je naar
                      Tampere, de laatste stop van je Finse avontuur. Bij
                      aankomst rijd je rechtstreeks naar een van de bekendste
                      landmarks van de stad: de Näsinneula-toren. Deze
                      futuristische televisietoren is met zijn 168 meter het
                      hoogste vrijstaande gebouw van Finland, en biedt een
                      adembenemend uitzicht over de stad, de meren en de
                      omliggende bossen. Bovenin geniet je van een 3-gangen
                      lunch met panoramisch uitzicht – een unieke ervaring op
                      grote hoogte. <br /> <br />
                      Na de lunch maken we een uitgebreide wandeling met de
                      lokale gids waar je kennis maakt met de industriële
                      geschiedenis, charmante straatjes en het levendige
                      culturele leven van deze moderne, maar karaktervolle stad.
                      Het verhaal van Finlayson mag hier zeker niet ontbreken.
                      ’s Avonds wacht je een echte Finse beleving: een bezoek
                      aan Kuuma Sauna, dé plek om de saunacultuur van Tampere te
                      ervaren. Gelegen aan het meer, combineert Kuuma moderne
                      architectuur met eeuwenoude traditie. Je warmt op in de
                      sauna, neemt – als je durft – een verfrissende duik in het
                      meer en sluit de dag af met een gezellig diner in het
                      restaurant van Kuuma. Een avond vol ontspanning, smaak en
                      het échte Finland-gevoel.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DINSDAG 23 JUNI 2026 – TAMPERE
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Je laatste dag in Finland begint in rust en schoonheid,
                      met een lakeside cruise op de meren rond Tampere. Terwijl
                      de boot zacht over het water glijdt, bewonder je het
                      typische Finse landschap: uitgestrekte meren, beboste
                      eilanden en kleine zomerhuisjes verscholen tussen de
                      bomen. De frisse lucht, het kabbelende water en de stilte
                      van de natuur maken deze tocht tot een magische ervaring.
                      Aan boord geniet je van een verzorgde buffetlunch, terwijl
                      je langs de oevers vaart van het indrukwekkende
                      Näsijärvi-meer – een moment om nog één keer helemaal op te
                      gaan in het unieke Finse ritme van water, bos en rust. In
                      de namiddag is het tijd om jouw reis af te sluiten op je
                      eigen manier. Je kiest uit een van de volgende
                      activiteitensessies: • Kano-avontuur op het Näsijärvi-meer
                      – peddel in alle rust over het water, omringd door de
                      natuur. • Bezoek één van de fascinerende musea in het
                      centrum van Tampere (Labour Museum Werstas, Police Museum,
                      ... ).
                      <br /> <br />
                      ’s Avonds komt iedereen weer samen voor een feestelijke
                      afsluiting in een icoon van het moderne Finland: de
                      indrukwekkende Tampere Arena, het kloppend hart van de
                      Finse ijshockeycultuur. Je dineert in stijl bij Ruby &
                      Fellas tijdens een buffetdiner, een sfeervol restaurant in
                      de arena zelf, waar je met z’n allen terugblikt op een
                      week vol unieke belevenissen, warme momenten en frisse
                      inzichten. Een laatste toast op Finland – kiitos ja
                      näkemiin!
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    WOENSDAG 24 JUNI 2026 – TAMPERE -{">"} BRUSSEL
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      We genieten nog van een laatste heerlijk ontbijt alvorens
                      we Tampere achter ons laten. Nadat we uitgecheckt hebben,
                      stappen we op de bus naar Helsinki. Na een kleine 2 uur
                      komen we aan op de luchthaven. Geniet onderweg van een
                      heerlijk lunchpakket dat je bij het uitchecken meenam. Aan
                      alle mooie liedjes komt een einde en met een rugzak vol
                      verhalen stappen we op onze rechtstreekse vlucht naar
                      Brussel.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        {/** Reportage */}
        <div className="text-center my-16" id="reportage">
          <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8">
            Reportage
          </h2>
          <div className="mt-8">
            <div className="relative sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48 aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://player.clevercast.com/?account_id=VzaPKg&item_id=27zBe5"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                title="Reportage Video"
              ></iframe>
            </div>
          </div>
        </div>

        {/** Verblijfsinformatie */}
        <div className="text-center my-16 mx-8 mb-10 lg:mx-32" id="verblijf">
          <h1 className="text-3xl text-[#162b58] font-bold mb-8">
            Verblijfsinfo
          </h1>
          <div className="relative">
            <img
              src={hotel}
              alt={"image"}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            {/* Main content overlay */}
            <div className="absolute inset-0 flex flex-col justify-start items-center p-2 sm:p-4">
              {/* White overlay box - more responsive */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg mb-2 p-3 sm:p-4 md:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center shadow-lg text-black">
                <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#162b58] font-bold mb-2 leading-tight">
                  HOTELS
                </h1>
                <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Helsinki - Solo Sokos Hotel Pier 4
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Het gloednieuwe viersterrenhotel Solo Sokos Hotel Pier 4 ligt aan
              de waterkant van Katajanokanranta in Helsinki. Hi er beleef je een
              stijlvol én duurzaam alternatief voor traditionele luxe. De houten
              architectuur, de maritieme omgeving en de rustige sfeer van de
              kamers vormen samen een bijzonder geheel waarin je helemaal tot
              rust komt.Laat je betoveren door het steeds wisselende Finse
              zeegezicht: van nevelige ochtenden tot vurige avondluchten, van
              kalme golven tot indrukwekkende stormen. Op het dakterras geniet
              je van een adembenemend 360-graden uitzicht over de zee en d e
              stad. En in het restaurant Harbore op de begane grond ga je op een
              culinaire reis langs de smaken van de Finse keuken, met lokale
              ingrediënten en een sfeer die perfect past bij de havenlocatie. J
              e kamer is van alle gemakken voorzien: een bureau, flatscreen-tv,
              eigen badkamer, beddengoed en handdoeken, een kluisje, kledingkast
              en een waterkoker staan voor je klaar – alles voor een comfortabel
              en ontspannen verblijf.
            </p>
          </div>
          <div className="relative mb-10 lg:mb-16">
            <div className="mb-10">
              <PhotoAlbum photos={helsinkiPhotos} />
            </div>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Turku - Original Sokos Wiklund
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Original Sokos Hotel Wiklund is een modern viersterrenhotel midden
              in het bruisende centrum van Turku, direct aan het vernieuwde
              marktplein. Hi er voel je je meteen welkom dankzij de warme
              service, creatieve sfeer en de levendige mix van ontspanning,
              gastronomie en shopping – allemaal onder één dak. Je geniet hier
              van sfeervolle restaurants met gezellige terrassen, inspirerende
              vergaderruimtes, fijne wellnessbehandelingen en een directe
              verbinding met het populaire warenhuis Wiklund. Het is de perfecte
              uitvalsbasis voor jouw ontdekkingstocht door de oudste stad van
              Finland. D e kamers zijn comfortabel ingericht en van alle
              gemakken voorzien. Je beschikt over een koelkastje, waterkoker,
              flatscreen-tv, gratis WiFi én een prachtig uitzicht op de stad.
              Elke kamer heeft daarnaast een eigen badkamer met douche en
              haardroger – alles wat je nodig hebt voor een ontspannen verblijf
              in Turku.
            </p>
          </div>
          <div className="relative mb-10 lg:mb-16">
            <div className="mb-10">
              <PhotoAlbum photos={turkuPhotos} />
            </div>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Tampere - Original Sokos Ilves
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Original Sokos Hotel Ilves is een echte blikvanger in Tampere –
              een iconisch viersterrenhotel aan de oevers van de
              Tammerkoski-rivier, midden in het centrum van de stad. Of je nu
              komt voor cultuur, gastronomie of een weekendje weg, hier beleef
              je het beste van Tampere binnen handbereik. Je wordt verwelkomd in
              een stijlvolle omgeving waar moderne luxe en Finse warmte
              samenkomen. Onder één dak vind je verschillende restaurants, een
              gezellige bar, een wellnessruimte met sauna en zwembad. Je kamer
              is uitgerust met comfortabele voorzieningen zoals een
              flatscreen-tv, waterkoker, koelkastje en gratis WiFi. Veel kamers
              bieden bovendien een prachtig uitzicht over de stad of de rivier.
              In je eigen badkamer vind je een douche of bad, een haardroger en
              zachte handdoeken – zodat jij je meteen thuis voelt.
            </p>
          </div>
          <div className="relative mb-10 lg:mb-16">
            <div className="mb-10">
              <PhotoAlbum photos={tamperePhotos} />
            </div>
          </div>
        </div>

        {/** Prijs */}
        <div className="text-center my-16 mx-8 mt-16 mb-10 lg:mx-32" id="prijs">
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
                            Dubbele bezetting
                          </th>
                          <th className="text-center p-3 font-medium text-gray-400 italic w-1/4">
                            Individuele bezetting
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {suiteData.map((suite, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td
                              className={`p-3 font-medium ${suite.color} text-gray-800`}
                            >
                              {suite.name}
                            </td>
                            <td className="p-3 text-center font-semibold">
                              {suite.dubbele}
                            </td>
                            <td className="p-3 text-center font-semibold">
                              {suite.individuele}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="sm:hidden">
                    {suiteData.map((suite, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        <div
                          className={`p-3 font-medium ${suite.color} text-gray-800 text-center`}
                        >
                          {suite.name}
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Dubbele bezetting:
                            </span>
                            <span className="font-semibold">
                              {suite.dubbele}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Individuele bezetting:
                            </span>
                            <span className="font-semibold">
                              {suite.individuele}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 sm:p-4 text-xs text-gray-500 italic border-t border-gray-300">
                    <p className="mb-2 text-xl font-bold">
                      Optionele activiteit Tampere :
                    </p>
                    <p className="text-lg font-semibold">
                      Kanovaren op het Nasiljarvimeer (minimum 10 deelnemers) -{" "}
                      <b>€ 65</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/** Inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Inbegrepen</h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>
              Rechtstreekse vluchten tussen Brussel en Helsinki, inclusief 20kg
              ruimbagage, 8kg handbagage, en alle luchthaventaksen (Finnair).l
            </li>
            <li>Alle lokale transfers aansluitend op de vluchten.</li>
            <li>Overnachtingen in het gekozen kamertype met privé sanitair.</li>
            <li>
              Alle maaltijden vanaf diner op de eerste dag tot het ontbijt op de
              laatste dag (ontbijtbuffet, lunch en diners).
            </li>
            <li>Alle activiteiten zoals beschreven in het programma.</li>
            <li>
              Professionele begeleiding tijdens de activiteiten door
              Engelssprekende lokale gidsen. Nederlandstalige vertaling
              voorzien.{" "}
            </li>
            <li>Nederlandstalige Nordic begeleiding tijdens de hele reis.</li>
            <li>Btw en bijdrage Garantiefonds Reizen.</li>
            <li>
              Uitgebreide reisinfo na boeking: lokale tips, winteruitrusting én
              fotografie.
            </li>
            <li>CO²-compensatie van deze reis: www.nordic.be/duurzaamheid/.</li>
            <li>
              Reportages over deze reis worden u toegestuurd als herinnering
            </li>
          </ul>
        </div>

        {/** Niet inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="niet-inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Niet inbegrepen
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>
              Drankjes (tenzij anders vermeld tijdens de maaltijden) en andere
              persoonlijke uitgaven.
            </li>
            <li>
              Namiddag activiteit in Tampere (Musea zijn gratis. Kanovaren is te
              betalen)
            </li>
            <li>Annulerings- en/of bijstandsverzekering.</li>
            <li>Brandstoftoeslag onder voorbehoud</li>
          </ul>
        </div>

        {/** Voorwaarden */}
        <div className="mx-8 mt-10 lg:mx-32" id="voorwaarden">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Algemene voorwaarden
          </h2>
          <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
            <p>
              De algemene en bijzondere voorwaarden kan je raadplegen op de
              website van Nordic.
              <a href="http://www.nordic.be/algemene-voorwaarden/">
                Hier vind je ook informatie over de betaling van voorschot en
                saldo.
              </a>
            </p>
          </div>
          <h2 className="text-3xl text-[#162b58] font-bold mt-4 mb-4">
            Algemene annuleringsvoorwaarden
          </h2>
          <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
            <p>
              Annulering van zomerreis: tot 90 dagen voor de afreis:het
              voorschot; van 89 tot 45 dagen voor de afreis: 50% van de reissom;
              minder dan 45 dagen voor de afreis of bij niet-aanmelding: 100%
              van de reissom.
            </p>
          </div>
        </div>

        {/** Gallerij  */}
        <div className="mx-8 mt-10 lg:mx-32" id="fotos">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Foto's</h2>
          <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <PhotoAlbum photos={zfPhotos} />
          </div>
        </div>

        {/** Reservatie en contact info*/}
        <div className="mx-8 mt-10 lg:mx-32" id="reservatie">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Reservatie</h2>
          <p className="text-lg text-[#162b58]">
            Heb je vragen? Wil je graag deze reis boeken? Hiervoor kan je
            terecht bij de mensen van Nordic.
          </p>
          <a
            href="/assets/brochures/Inschrijvingsformulier-Focus-TV-Finland-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 bg-white hover:bg-[#4ab0e1] text-[#162b58] font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
          >
           Wens je jezelf in te schrijven? Dan kan je het inschrijfformulier via deze link afdrukken, invullen, inscannen en mailen als bijlage naar het e-mailadres focuswtv@nordic.be. 
          </a>
        </div>
        <div className="mx-8 mt-10 lg:mx-32">
          <div className="p-4">
            <BusinessInfoCard
              name="Nordic"
              type="Touroperator"
              address="Moutstraat 58/bus 202, 9000 Gent"
              phone="052/55.52.54"
              hours="Ma-Vrij: 9:00-17:00"
              website="https://www.nordic.be/bestemmingen/finland/"
              email="focuswtv@nordic.be"
              images={[logo]}
              className="mb-4"
            />
          </div>
        </div>

        {/** Back to alle reizen */}
        <div className="mx-8 mt-10 lg:mx-32">
          <Link
            to="/"
            className="inline-block bg-[#162b58] text-white px-6 py-3 rounded-lg hover:bg-[#0d1a3b] transition"
          >
            Terug naar alle reizen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ZuidFinland;
