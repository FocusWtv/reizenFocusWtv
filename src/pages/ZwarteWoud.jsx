import { useState } from "react";
import GlobalNavbar from "../components/GlobalNavbar";
import zwartewoud from "../assets/zwartewoud/zwartewoud.jpeg";
import boot from "../assets/zwartewoud/ship/elzas-8.jpg";
import BusinessInfoCard from "../components/BusinessInfoCard";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PhotoAlbum from "../components/PhotoAlbum";
import zw1 from "../assets/zwartewoud/zwartewoud.jpeg";
import zw2 from "../assets/zwartewoud/elzas-2.jpg";
import zw3 from "../assets/zwartewoud/zw2.jpeg";
import zw4 from "../assets/zwartewoud/cake.jpeg";
import zw5 from "../assets/zwartewoud/elzas-4.jpg";
import zw6 from "../assets/zwartewoud/elzas-5.jpg";
import zw7 from "../assets/zwartewoud/elzas-7.jpg";
import ship1 from "../assets/zwartewoud/ship/boot1.JPG";
import ship2 from "../assets/zwartewoud/ship/boot2.jpg";
import ship3 from "../assets/zwartewoud/ship/kamer1.jpg";
import ship4 from "../assets/zwartewoud/ship/kamer2.jpg";
import ship5 from "../assets/zwartewoud/ship/restaurant.jpg";
import ship6 from "../assets/zwartewoud/ship/salon.jpg";
import logo from "../assets/zwartewoud/logo.jpg";

const ZwarteWoud = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const suiteData = [
    {
      name: "Hoofddek",
      color: "bg-pink-200",
      dubbele: "€699 p.p.",
      individuele: "€699 p.p.",
    },
    {
      name: "Tussendek",
      color: "bg-purple-200",
      dubbele: "€799 p.p.",
      individuele: "€799 p.p.",
    },
    {
      name: "Bovendek",
      color: "bg-blue-200",
      dubbele: "€899 p.p.",
      individuele: "€1.118 p.p.",
    },
    /*     {
      name: "Presidentiele Suite (36 m²) - Bovendek",
      color: "bg-yellow-200",
      dubbele: "4 490",
      individuele: "-",
    },
    {
      name: "Presidentiele Suite (36 m²) - Panoramadek",
      color: "bg-yellow-200",
      dubbele: "4 490",
      individuele: "-",
    },
    {
      name: "Royal Suite (40 m²) - Bovendek",
      color: "bg-teal-200",
      dubbele: "4 790",
      individuele: "-",
    }, */
  ];

  const zwartewoudPhotos = [
    { width: 1600, height: 900, src: zw1 },
    { width: 1600, height: 1067, src: zw2 },
    { width: 1600, height: 1067, src: zw3 },
    { width: 1600, height: 900, src: zw4 },
    { width: 1600, height: 900, src: zw5 },
    { width: 1600, height: 900, src: zw6 },
    { width: 1600, height: 900, src: zw7 },
  ];

  const shipPhotos = [
    { width: 1600, height: 900, src: ship1 },
    { width: 1600, height: 900, src: ship2 },
    { width: 1600, height: 900, src: ship3 },
    { width: 1600, height: 900, src: ship4 },
    { width: 1600, height: 900, src: ship5 },
    { width: 1600, height: 900, src: ship6 },
  ];

  return (
    <section>
      <GlobalNavbar />
      <div className="relative" id="home">
        <img
          src={zwartewoud}
          alt={"image"}
          className=" w-full h-96 lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-center p-4">
          {/* White overlay box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md text-center shadow-lg text-black opacity-65 hover:opacity-100 transition-opacity duration-300">
            <p className="text-md font-bold mb-2 tracking-wide">ZWARTE WOUD</p>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Kerst in de Elzas & het Zwarte Woud
            </h1>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            <p className="text-sm text-gray-700 font-bold">
              DATUM:
              <br />
              VAN 14 NOVEMBER TOT 17 DECEMBER 2025
            </p>
          </div>
          {/* brochure Button */}
          <a
            href="/assets/brochures/Kerstreis-info.pdf"
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
          <div className="mt-3 bg-red-500 text-white animate-pulse underline font-semibold py-3 px-6 rounded-lg border border-red-500 border-3 shadow-lg flex items-center gap-2">
            Volzet
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
                  {/* <Nav.Link href="#infoavond" className="mx-2 text-white">
                    Infoavond
                  </Nav.Link> */}
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
                  <Nav.Link href="#troeven" className="mx-2 text-white">
                    Troeven
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

      {/* Zwarte Woud reis */}
      <div className="text-center mb-8" id="intro">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
          Zwarte Woud reis
        </h2>
        <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
          <p className="text-lg">
            Van <b>14 tot en met 17 december</b> gaan we vanuit Rijsel met de TGV naar
            het hart van de Elzas, naar Straatsburg. We genieten van de stad, en
            z’n kerstmarkt – het is de oudste trouwens van Frankrijk. Van
            hieruit maken we een cruise op de Rijn, en we verkennen verder het
            Zwarte Woud. We gaan naar de mooiste kerstmarkt van Duitsland – in
            Freiburg, we nemen je ook mee naar het Ecomusée d'Alsace – een soort
            Bokrijk van de streek, helemaal in de kerstsfeer op dat moment. We
            gaan ook naar Colmar – de oude stad en de verlichte straten zijn
            hier echt prachtig… Na een laatste blik op Straatsburg keren we
            terug naar huis. We reizen met de MS Europe. Het wordt een
            vierdaagse reis om helemaal in de sfeer te komen, wat mooie dingen
            te zien, om wat originele cadeautjes te vinden, en om samen te
            genieten.
          </p>
        </div>

        {/* {/** Info Avond */}
        {/* <div className="text-center mb-8" id="infoavond">
          <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
            Infoavond
          </h2>
          <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
            <p className="text-lg">
              Focus & WTV organiseren ook een infoavond waarop je meer te weten
              komt over onze Nieuwjaarscruise Italië. De infoavond gaat door in
              het Concertgebouw Brugge op woensdagavond 10 september 2025. We
              verwelkomen jullie vanaf 18u30. De presentatie gaat van start om
              19u00.
            </p>
            <a
              class="group mt-10 relative inline-block text-sm font-medium text-[#162b58] focus:ring-3 focus:outline-hidden"
              href="#"
            >
              <span class="absolute inset-0 rounded-lg translate-x-0.5 translate-y-0.5 bg-[#162b58] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span class="relative text-2xl text-white block border border-current rounded-lg bg-[#162b58] px-8 py-3">
                Interesse? Schrijf je <b>HIER</b> in voor deze infoavond.
              </span>
            </a>
          </div>
        </div> */}

        {/* Reis route */}
        <div className="mt-16" id="route">
          <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8">
            Reisroute
          </h2>
          <div className="flex items-start gap-4 mx-4 mt-10 lg:mx-16 flex-col lg:flex-row">
            {/* Image container */}
            {/* <div className="w-full md:mx-auto lg:w-1/2">
              <img
                src={route}
                alt="Reisroute"
                className="w-full h-auto rounded-lg"
              />
            </div> */}
            {/* Accordion container */}
            <div className="w-full flex flex-col gap-4">
              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Zondag 14 december 2025 – RIJSEL -{">"} STRAATSBURG
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      ’s Morgens vertrekken we met de bus vanuit Brugge of
                      Roeselare naar Rijsel, waar we de TGV nemen naar
                      Straatsburg. Er is een vrije lunch, en een vrij bezoek van
                      het centrum. Al vier eeuwen lang spreidt de iconische
                      "Christkindelsmärik" zijn magie uit in het hart van de
                      Europese hoofdstad. Meer dan 300 houten chalets, verspreid
                      over verschillende pleinen in de stad, nodigen je uit om
                      de meest betoverende ontdekkingen te doen in een
                      sprookjesachtige sfeer. Het is genieten van deze
                      kerstmarkt, en – wie zin heeft – kan ook de kathedraal
                      gaan bezoeken, of de prachtige vakwerkhuizen gaan bekijken
                      in de wijk La Petite France - het meest pittoreske deel
                      van het oude Straatsburg. Om 18u gaan we aan boord van ons
                      schip, waar we samen dineren.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Maandag 15 december 2025 – STRAATSBURG -{">"} ALT-BREISACH -
                    {">"} FREIBURG -{">"} ALT-BREISACH
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md">
                        Vanmorgen varen we en genieten we van de uitzichten
                        langs de Rijn. We verlaten Frankrijk, en gaan naar
                        Duitsland, naar Alt-Breisach – zoals het voorheen
                        genoemd werd. Een stad in het Zwarte Woud, langs de
                        Rijn. In de 17de eeuw veroverde Koning Lodewijk XIV van
                        Frankrijk deze streek. Hij liet die toen versterken door
                        Vauban, die hier op de linkeroever het Fort Mortier
                        bouwde. Hét symbool van deze stad is de St.
                        Stephansdomkerk – die ligt op een rots, en dat is meteen
                        ook het hoogste punt van de stad. Na de lunch aan boord
                        gaan we naar Freiburg – net tegen de Zwitserse grens. We
                        ontdekken de stad en haar kerstmarkt, die bekend staat
                        voor het vele handgemaakte producten en tal van
                        lekkernijen. In de late namiddag keren we terug naar
                        Alt-Breisach, naar ons schip, waar we dineren.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Dinsdag 16 december 2025 – ALT-BREISACH - Het Ecomusée
                    d'Alsace - COLMAR - ALT-BREISACH
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      ’s Morgens gaan we naar het Ecomusée d'Alsace - een heel
                      groot openluchtmuseum in Ungersheim, op zo'n 30 kilometer
                      van Colmar. Het zou het grootste openluchtmuseum in
                      Frankrijk zijn. Een beetje zoals Bokrijk bij ons. Hier
                      krijg je een blik op het dagelijkse leven op het
                      platteland van de Elzas-Vogezen zoals het was in de 19de
                      en begin 20ste eeuw. Er zijn ambachtslui en landbouwers
                      aan het werk, en je wordt er meegenomen in de gebruiken en
                      tradities van die tijd. In december is een bezoek hier
                      heel bijzonder. Alles staat in het teken van de
                      kersttradities van de Elzas. Muziek, oude
                      kerstversieringen, proeverijen,… Dit wordt écht een heel
                      bijzonder bezoek!
                      <br /> <br />
                      We gaan lunchen in een restaurant, en varen vervolgens
                      verder naar Colmar - de hoofdstad van de Elzasser wijnen.
                      Als dat geen plek is voor een ‘glühwein’… en dat te midden
                      de kleurrijke vakwerkhuizen en de vele riviertjes en
                      grachten die de stad rijk is. Ze hebben zes verschillende
                      kerstmarkten, maar vooral – de oude binnenstad is prachtig
                      verlicht en echt ingericht als een sprookje! Colmar blijkt
                      trouwens de inspiratiebron voor het sprookjesdorp in
                      Disney's "Belle en het Beest". Een magische namiddag dus!
                      ’s Avonds genieten we van een diner aan boord – intussen
                      varen we terug naar Straatsburg.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Woensdag 17 december 2025 – Vrije tijd in Straatsburg
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Op het schip genieten we van het ontbijtbuffet. Daarna
                      gaan we naar het centrum van Straatsburg, waar je vrije
                      tijd hebt. Er is een vrije lunch, en in de namiddag keren
                      we met de TGV naar Rijsel terug. Aansluitend nemen we de
                      bus naar Roeselare of Brugge.
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
          <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <div className="relative sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48 aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://player.clevercast.com/?account_id=VzaPKg&item_id=Wxg78z"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                title="Reportage Video"
              ></iframe>
            </div>
          </div>
          <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <div className="relative sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48 aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://player.clevercast.com/?account_id=VzaPKg&item_id=AJdQ4z"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                title="Reportage Video"
              ></iframe>
            </div>
          </div>
          <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <div className="relative sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48 aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://player.clevercast.com/?account_id=VzaPKg&item_id=VeE5Bg"
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
              src={boot}
              alt={"image"}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            {/* Main content overlay */}
            <div className="absolute inset-0 flex flex-col justify-start items-center p-2 sm:p-4">
              {/* White overlay box - more responsive */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg mb-2 p-3 sm:p-4 md:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center shadow-lg text-black">
                <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#162b58] font-bold mb-2 leading-tight">
                  HET SCHIP : MS EUROPE
                </h1>
                <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <p className="text-lg text-[#162b58] mt-10">
              Genoemd als eerbetoon aan het “ Oude Continent ” en als symbool
              van eenheid, is de MS L’Europe een elegant schip met vier ankers
              dat vaart op de Rijn en de Donau, om de vele bezienswaardigheden
              te ontdekken, die deze twee rivieren te bieden hebben.
              <br />
              <br />
              De MS L’Europe is een 4 ankers schip, met een lengte van 110 m en
              11,40 m breedte. Het werd volledig gerenoveerd in 2016. Het schip
              biedt plaats aan 180 passagiers in 90 kajuiten op drie dekken. Elk
              van hen, variërend in grootte van 9 tot 13 m², heeft alle
              voorzieningen en biedt de beste verblijfsvoorwaarden aan.
              <br />
              <br />
              De chocolade, beige en oranje tinten van het interieur geven het
              schip een warme, elegante en gastvrije sfeer. Op het hoofddek
              bevindt zich het restaurant, waar alle maaltijden tijdens de reis
              geserveerd worden. Het restaurant biedt een verfijnde keuken in
              een geraffineerde omgeving aan, waar grote ramen u toelaten om ten
              volle te genieten van het panoramisch uitzicht. Op hetzelfde dek
              vindt u ook de salon/bar met een dansvloer.
            </p>
          </div>

          {/*           <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Kajuiten
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              De M/S Fayan II heeft 70 buitenkajuiten met uitzicht op de oevers
              van de Nijl. Ze zijn comfortabel en modern ingericht. Alle
              kajuiten op de Fayan II hebben grote schuiframen, zodat u in alle
              rust de oevers van de Nijl kunt bewonderen. De Deluxe kajuiten met
              venster hebben een oppervlakte van 20 m², de Presidentiele Suites
              (36 m²) en Royal Suite (40m²) hebben een zithoek, een dressing en
              twee grote schuiframen. De Royal Suite heeft ook een terras en een
              bubbelbad. Alle kajuiten zijn uitgerust met een badkamer met
              douche of bad en WC, individuele airconditioning, kluis,
              flatscreen TV, minibar, telefoon (intern gebruik) en haardroger.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Faciliteiten aan boord
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              De gemeenschappelijke ruimtes bieden een verfijnde, moderne en
              vriendelijke omgeving. Geniet van een heerlijke cocktail in de
              chique en gezellige loungebar op het Bovendek, of geniet van het
              prachtige landschap onder de pergola op het Zonnedek. Het Zonnedek
              staat in het teken van ontspanning, met dank aan het aangename
              zwembad (een van de grootste aan boord van een schip op de Nijl)
              en het goed onderhouden buitenmeubilair. Er is ook een kleine
              fitnessruimte, een winkeltje, een massageruimte (betalend) en
              internettoegang in de loungebar (de kwaliteit van de verbinding
              hangt evenwel af van het gebied waar u doorheen vaart).
              <br />
              Het restaurant op het Navigatiedek biedt een verfijnde
              internationale en Egyptische keuken, met verse seizoenproducten.
              Mineraalwater, thee en koffie zijn inbegrepen bij de maaltijden.
            </p>
          </div> */}

          <div className="relative mb-10 lg:mb-16">
            <div className="mb-10">
              <PhotoAlbum photos={shipPhotos} />
            </div>
          </div>
        </div>

        {/** Prijs */}
        <div className="text-center my-16 mx-8 mt-16 mb-10 lg:mx-32" id="prijs">
          <div className="mx-8 mt-10 lg:mx-32">
            <div className="mb-10">
              <h1 className="text-3xl mt-10 text-[#162b58] font-bold mb-8">
                Prijzen
              </h1>
              <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white">
                <div className="border-2 rounded-lg border-[#162b58] shadow-lg">
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
                    <p className="mb-2">
                      Deze prijzen zijn geldig op het moment van publicatie van
                      dit document, d.w.z 01/06/2024. Zij zijn onderhevig aan
                      eventuele wijzigingen.
                    </p>
                    <p>
                      Zij zijn echter definitief gegarandeerd op het moment van
                      het sluiten van het verkoopcontract (exclusief stijgingen
                      of dalingen van de kosten van brandstof en lucht- of
                      haventaksen).
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="mt-8 mx-8 lg:mx-32">
                <img
                  src={prijs}
                  alt="afbeelding ship"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </div> */}
            </div>
          </div>
        </div>

        {/** Inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Inbegrepen</h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>TGV Rijsel-Straatsburg en terug</li>
            <li>Bus vanuit Roeselare of Brugge naar Rijsel</li>
            <li>
              het verblijf in volpension vanaf het avondmaal de eerste dag tot
              het ontbijt van dag 4 - Drankjes aan boord inbegrepen (met
              uitzondering van speciale kaarten), een drankenpakket voor
              maaltijden buiten het schip (1/4 glas wijn of 1 mineraalwater en 1
              koffie per persoon en per maaltijd)
            </li>
            <li>Het middagmaal op dag 2 en dag 3</li>
            <li>
              Alle dranken aan boord – zowel tijdens de maaltijden, als in de
              bar. Met uitzondering van champagne en dranken van de speciale
              wijnkaart.
            </li>
            <li>Alle excursies</li>
            <li>Begeleiding door ons reisteam</li>
            <li>Bijstands-/repatriëringsverzekering</li>
            <li>Haventaksen - De diensten aan de haven</li>
            {/*             <li>
              De diensten van een Nederlandstalige Rivages du Monde
              cruisedirecteur samen met een team van Focus & WTV
            </li>
            <li>Een reisfilm van Focus & WTV, gemaakt tijdens deze reis. </li> */}
          </ul>
        </div>

        {/** Niet inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="niet-inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Niet inbegrepen
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>Persoonlijke uitgaven</li>
            <li>Dranken van de speciale wijnkaart en champagne</li>
            <li>Dranken tijdens transfers</li>
            <li>Annuleringsverzekering/bagageverzekering</li>
            {/*             <li>Reisverzekeringen</li>
            <li>
              Mogelijkheid om in Business Class te vliegen: consulteer ons
            </li>
            <li>Facultatieve excursies</li> */}
          </ul>
        </div>

        {/** Onze troeven */}
        <div className="mx-8 mt-10 lg:mx-32" id="troeven">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Troeven</h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-4 text-left">
            <li>
              Dit schip werd speciaal gecharterd voor de kijkers van Focus & WTV
            </li>
            {/* <li>
              Het programma
              <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-4 text-left">
                <li>
                  Verblijf in Caïro tijdens deze reis: Ontdek Caïro en de
                  piramides van Gizeh.
                </li>
                <li>
                  Een unieke excursie naar de majestueuze tempels van Abu
                  Simbel.
                </li>
                <li>
                  Een uitgebreid bezoek aan de legendarische tempels van Luxor
                  en Karnak.
                </li>
                <li>
                  Een rijkgevuld programma inclusief bezoeken aan Edfu, Kom Ombo
                  en Philae.
                </li>
              </ul>
            </li> */}
            <li>Alles in je eigen taal</li>
            <li>Audiogidsen tijdens de excursies zijn inbegrepen</li>
            <li>Gratis Wifi aan boord</li>
            <li>
              We reizen in vol pension. Ook alle dranken zijn inbegrepen in het
              restaurant en aan de bar (behalve deze van de bijzondere kaart)
            </li>
            <li>Bijstands-/repatriëringsverzekering inbegrepen </li>
            <li>
              Aan boord worden TV-reportages gemaakt, die u na de reis ontvangt:
              een mooie herinnering voor later!
            </li>
            <li>Je leert nieuwe mensen kennen uit je buurt </li>
          </ul>
        </div>

        {/** Gallerij  */}
        <div className="mx-8 mt-10 lg:mx-32" id="fotos">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Foto's</h2>
          <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <PhotoAlbum photos={zwartewoudPhotos} />
          </div>
        </div>

        {/** Reservatie en contact info*/}
        <div className="mx-8 mt-10 lg:mx-32" id="reservatie">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Reservatie</h2>
          <p className="text-lg text-[#162b58]">
            Heb je vragen? Wil je graag deze reis boeken? Hiervoor kan je
            terecht bij Claudio & Cidjy van CroisiEurope.
          </p>
        </div>
        <div className="mx-8 mt-10 lg:mx-32">
          <div className="p-4">
            <BusinessInfoCard
              name="Croisieurope"
              type="Cruiseorganisator in Brussel"
              address="Ravensteinstraat 56, 1000 Brussel"
              phone="02/514.21.49"
              hours="Ma-Vrij: 9:30-17:30"
              website="https://www.croisieurope.be/"
              email="bruxelles@croisieurope.com"
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

export default ZwarteWoud;
