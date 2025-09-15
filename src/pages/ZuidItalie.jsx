import { useState } from "react";
import GlobalNavbar from "../components/GlobalNavbar";
import zuiditalie from "../assets/zuiditalie/zuiditalie.jpg";
import route from "../assets/zuiditalie/reis-nieuwjaarscruise-route.jpg";
import boot from "../assets/zuiditalie/ship//ship1.jpg";
import prijs from "../assets/zuiditalie/ship/ship8.png";
import BusinessInfoCard from "../components/BusinessInfoCard";
import logo from "../assets/zwartewoud/logo.jpg";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PhotoAlbum from "../components/PhotoAlbum";
import ship1 from "../assets/zuiditalie/ship/ship2.jpg";
import ship2 from "../assets/zuiditalie/ship/ship3.jpg";
import ship3 from "../assets/zuiditalie/ship/ship4.jpg";
import ship4 from "../assets/zuiditalie/ship/ship5.jpg";
import ship5 from "../assets/zuiditalie/ship/ship6.jpg";
import ship6 from "../assets/zuiditalie/ship/ship7.jpg";
import zi1 from "../assets/zuiditalie/italie2.jpg";
import zi2 from "../assets/zuiditalie/italie3.jpg";
import zi3 from "../assets/zuiditalie/italie4.jpg";
import zi4 from "../assets/zuiditalie/italie5.jpg";
import zi5 from "../assets/zuiditalie/italie6.jpg";
import zi6 from "../assets/zuiditalie/italie7.jpg";
import zi7 from "../assets/zuiditalie/italie8.jpg";
import zi8 from "../assets/zuiditalie/italie9.jpg";
import zi9 from "../assets/zuiditalie/italie10.jpg";
import zi10 from "../assets/zuiditalie/italie11.jpg";
import zi11 from "../assets/zuiditalie/italie12.jpg";
import zi12 from "../assets/zuiditalie/italie13.jpg";
import zi13 from "../assets/zuiditalie/italie14.jpg";
import zi14 from "../assets/zuiditalie/italie15.jpg";
import zi15 from "../assets/zuiditalie/italie16.jpg";
import zi16 from "../assets/zuiditalie/italie17.jpg";
import zi17 from "../assets/zuiditalie/italie18.jpg";
import zi18 from "../assets/zuiditalie/italie19.jpg";
import zi19 from "../assets/zuiditalie/italie20.jpg";
import zi20 from "../assets/zuiditalie/italie21.jpg";
import zi21 from "../assets/zuiditalie/italie22.jpg";

const ZuidItalie = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const suiteData = [
    {
      name: "Dubbelkajuit - Bovendek",
      color: "bg-orange-400",
      dubbele: "€2.799 p.p.",
      individuele: "€2.799 p.p.",
    },
    {
      name: "Dubbelkajuit - Inscheppingsdek",
      color: "bg-blue-200",
      dubbele: "€2.999 p.p.",
      individuele: "€2.999 p.p.",
    },
    {
      name: "Dubbelkajuit - Hoofddek",
      color: "bg-purple-400",
      dubbele: "€3.199 p.p.",
      individuele: "-",
    },
    {
      name: "Singlekajuit - Hoofddek",
      color: "bg-purple-200",
      dubbele: "-",
      individuele: "€3.899 p.p.",
    },
    {
      name: "Dubbelkajuit - Onderdek",
      color: "bg-orange-200",
      dubbele: "€3.399 p.p.",
      individuele: "-",
    },
        {
      name: "Singlekajuit - Onderdek",
      color: "bg-purple-200",
      dubbele: "-",
      individuele: "€4.099 p.p.",
    },
  ];

  const shipPhotos = [
    { width: 1600, height: 900, src: ship1 },
    { width: 1600, height: 900, src: ship2 },
    { width: 1600, height: 900, src: ship3 },
    { width: 1600, height: 900, src: ship4 },
    { width: 1600, height: 900, src: ship5 },
    { width: 1600, height: 900, src: ship6 },
  ];

    const zitaliePhotos = [
      { width: 1600, height: 900, src: zi1 },
      { width: 1600, height: 1067, src: zi2 },
      { width: 1600, height: 1067, src: zi3 },
      { width: 1600, height: 900, src: zi4 },
      { width: 1600, height: 900, src: zi5 },
      { width: 1600, height: 900, src: zi6 },
      { width: 1600, height: 900, src: zi7 },
      { width: 1600, height: 900, src: zi8 },
      { width: 1600, height: 900, src: zi9 },
      { width: 1600, height: 900, src: zi10 },
      { width: 1600, height: 900, src: zi11 },
      { width: 1600, height: 900, src: zi12 },
      { width: 1600, height: 900, src: zi13 },
      { width: 1600, height: 900, src: zi14 },
      { width: 1600, height: 900, src: zi15 },
      { width: 1600, height: 900, src: zi16 },
      { width: 1600, height: 900, src: zi17 },
      { width: 1600, height: 900, src: zi18 },
      { width: 1600, height: 900, src: zi19 },
      { width: 1600, height: 900, src: zi20 },
      { width: 1600, height: 900, src: zi21 },
    ];

  return (
    <section>
      <GlobalNavbar />
      <div className="relative" id="home">
        <img
          src={zuiditalie}
          alt={"image"}
          className=" w-full h-96 lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-center p-4">
          {/* White overlay box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md text-center shadow-lg text-black opacity-65 hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Zet het nieuwe jaar in op de ‘Belle de l’Adriatique’
            </h1>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            <p className="text-sm text-gray-700 font-bold">
              DATUM:
              <br />
              VAN 26 DECEMBER TOT 2 JANUARI 2026
            </p>
          </div>
          {/* brochure Button */}
          <a
            href="/assets/brochures/Brochure-eindejaarscruise-2025.pdf"
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
          <div className="mt-3 bg-orange-500 text-white underline font-semibold py-3 px-6 rounded-lg border-4 shadow-lg flex items-center gap-2">
            Beperkt aantal plaatsen beschikbaar
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
                  {/*                   <Nav.Link href="#infoavond" className="mx-2 text-white">
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
                    Onze troeven
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

      {/* Italië reis */}
      <div className="text-center mb-8" id="intro">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
          Nieuwjaarscruise Zuid-Italië
        </h2>
        <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
          <p className="text-lg">
            Van <b>26 december tot 2 januari</b> maken we een Nieuwjaarscruise!
            Met de ‘Belle de l’Adriatique’, gaan we naar het zuiden van Italië.
            Wat staat er op ons lijstje? Napels – dat zeker. Omdat het een
            bijzondere plek is, en ook omdat kerst en eindejaar een waar feest
            zijn voor de Napolitanen! We gaan ook naar Pompeï, de Romeinse stad
            die door de Vesuvius versteend werd in de tijd. We varen langs de
            Eolische eilanden, gaan naar het Heiligdom van de Zwarte Madonna in
            Tindari – van hier heb je één van de mooiste uitzichten van Sicilië.
            Op dat eiland brengen we ook een bezoek aan de Etna. Waar het
            landschap weer helemaal anders is. We proeven van de wijnen van de
            flanken van de vulkaan, en we gaan ook naar Taormina, waar we dit
            schitterende ‘Theatro antico’ te zien krijgen. We gaan naar Tropea -
            één van de mooiste dorpjes van Calabrië. En voor ons geen vuurwerk
            met de jaarovergang. Wel een vulkaanuitbarsting – die van de
            Stromboli. 2026 brengt ons een tocht langs de Amalfitaanse kust, een
            dagje op het eiland Capri, en genieten van de Baai van Napels.
          </p>
        </div>

        {/** Info Avond */}
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
                    VRIJDAG 26 DECEMBER 2025 – Brussel -{">"} Napels
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      ’s Morgens vertrekken we met de bus vanuit Brugge of
                      Roeselare naar Zaventem, waar we om 9u25 de vlucht nemen
                      naar Napels. We komen aan om 13u10. Er is een vrije lunch,
                      en een vrij bezoek aan Napels. Om 18u gaan we aan boord
                      van ons schip. Na de welkomstcocktail, en de voorstelling
                      van de bemanning, dineren we.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    ZATERDAG 27 DECEMBER 2025: Napels
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md">
                        In de voormiddag, is er een inbegrepen excursie. Je hebt
                        de keuze: <br /> <b>1. Pompeï:</b> <br /> De straatjes,
                        tempels, fora en de villa's met weelderige mozaïeken
                        zullen je niet onberoerd laten, want een bezoek aan
                        Pompeï betekent terugkeren naar de bronnen van onze
                        beschaving.
                      </p>
                    </div>
                    <div>
                      <p className="text-md mt-2">
                        <b>2. Herculanum:</b> <br />
                        Net zoals Pompeï werd het Herculanum verwoest door de
                        uitbarsting van de Vesuvius in 79 na Christus. Ontdek de
                        beroemde huizen van het antieke Herculaneum. Het meest
                        bekende gebouw is het huis met het atrium met
                        mozaïekwerk. Pompeii werd verwoest door de enorme druk
                        van de aswolk, het Hercaluneum door hete lava. Door deze
                        plotselinge verhitting en begraving zijn er in het
                        Herculaneum veel houten objecten bewaard gebleven, wat
                        deze plek extra bijzonder maakt.
                      </p>
                    </div>
                    <div>
                      <p className="text-md mt-2">
                        In de namiddag, is er een inbegrepen excursie: Napels.
                        Tussen meesterwerken en onvermoede schatten ontdek je de
                        musts, zoals het Oude Napels of het Koninklijk Paleis.
                        In de oudste wijk van Napels kun je een wandeling maken
                        langs de Via San Gregorio Armeno. Je vindt er vele
                        ateliers en winkeltjes waar je de beroemde Napolitaanse
                        santons ontdekt. De 'pastori' zijn handgemaakt en elk
                        stuk is uniek. Tijdens de eindejaarsperiode wordt de
                        sfeer hier magisch... Onze wandeling wordt afgesloten
                        met een bezoek aan de San Severo kapel, een meesterwerk
                        van de Napolitaanse barokke kunst. Hier ontdek je de
                        opvallende Cristo Velato (Gesluierde Christus), een
                        marmeren beeld van schokkend realisme.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    ZONDAG 28 DECEMBER: Eolische eilanden - Milazzo (Sicilië)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      In de voormiddag maken we ene cruise langs de Eolische
                      eilanden: Uit de azuurblauwe zee langs de Siciliaanse
                      kusten doemen de Eolische eilanden op (Vulcano, Lipari,
                      Salina, Panarea, Stromboli, Filicudi en Alicudi). Zij
                      werden door de Unesco als werelderfgoed erkend. Volgens de
                      Griekse mythologie verschool Eolus zich in deze eilanden
                      en gaf hen zo hun naam, als eerbetoon aan de faam van de
                      temmer van de Winden. <br /> <br />
                      In de namiddag, is er een inbegrepen excursie: Tindari.
                      Ontdek het heiligdom van de Zwarte Maagd op een
                      uitstekende rots, de golf van Patti en de prachtige lagune
                      "Tonnara d'Oliveri". Daarna is er vrije tijd in Milazzo,
                      een charmante stad gedomineerd door een middeleeuwse
                      citadel.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    MAANDAG 29 DECEMBER: Messina
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Vandaag is er de inbegrepen excursie 'Etna en Taormine'.
                      De grootste actieve vulkaan in Europa. Je klimt naar
                      ongeveer 1950 m hoogte om kennis te maken met de zone van
                      de Silvestri-krater. Van daaruit hebt u een prachtig zicht
                      op de golf van Catana.
                      <br /> <br />
                      Daarna gaan we verder richting Taormine. Die stad is
                      gelegen op een terras met zicht op zee en belichaamt de
                      legendarische schoonheid van Sicilië. We bezoeken onder
                      meer het spectaculaire antieke theater.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DINSDAG 30 DECEMBER: Vibo Marina
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md">
                        De laatste dag van het jaar zetten we rustig in met een
                        cruise in de voormiddag. In de namiddag, is er de
                        inbegrepen excursie: Calabrië. Dit is de tip van de
                        laars, het uiterste zuiden van Italië, dat baadt in het
                        prachtige water van de Ionische en de Tyrreense zee, van
                        Sicilië gescheiden door de zeestraat van Messina. Dit is
                        de bakermat van het Oude Griekenland, een land vol oude
                        beschavingen en plaatsen waar eeuwenoude gewoontes en
                        tradities nog bestaan. U ontdekt Tropea, de parel van
                        Calabrië. Dit stadje is gelegen op een uitstekende rots
                        en wordt omgeven met kliffen die uitkijken op zee. Het
                        is een echt pareltje! <br />
                        We eindigen onze excursie met een degustatie van
                        streekproducten.
                      </p>
                    </div>
                    {/*                     <div className="text-sm italic mt-2">
                      <p className="font-semibold underline">
                        Optionele excursie die ochtend (voor de excursie):
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>BALLONVLUCHT BOVEN LUXOR:</b> Vertrek in de vroege
                        ochtend voor een ballonvlucht om de zonsopgang te
                        bewonderen boven de Vallei der Koningen, de site van
                        Karnak en de tempels. Een onvergetelijke ervaring !
                        Prijs per persoon: € 120 (minimum 2 personen)
                      </p>
                    </div> */}
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    WOENSDAG 31 DECEMBER: Salerno
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      In de voormiddag varen we. In de namiddag, is er de
                      inbegrepen excursie: Amalfi. We nemen de kustweg van
                      Amalfi, een van de mooiste toeristische routes ter wereld,
                      om Amalfi te bereiken. Je kunt er charmante dorpjes
                      bewonderen die elkaar opvolgen langs de scheuren in de
                      kustlijn, pastelkleurige huizen en elegante badplaatsen.
                      Amalfi, genesteld tussen kliffen en de turquoise zee, zal
                      je veroveren met zijn authentieke charme en levendige
                      steegjes. In het hart van de stad bezoek je de majestueuze
                      Duomo di Sant'Andrea, met zijn spectaculaire
                      Arabisch-Normandische gevel en monumentale trap. ’s Avonds
                      zetten we het jaar in, zoals dat hoort, met lekker eten,
                      muziek – kortom een fijn oudejaarsfeest!
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DONDERDAG 1 JANUARI 2026: Napels
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Vandaag is er de inbegrepen excursie 'Capri en Anacapri',
                      met inbegrepen lunch. 's Morgens vertrek je met de
                      glijboot naar het prachtige eiland Capri. Bij aankomst
                      gaan we verder tot het dorpje Anacapri voor het bezoek aan
                      de villa San Michele, het huis van de Zweedse schrijver
                      Axel Munthe. Hier stond ook de villa van de keizer
                      Tiberius. Vanuit de tuinen van San Michele heb je een
                      prachtig zicht op de stad Capri, de baai van Napels, het
                      schiereiland Sorrento en de Vesuvius. Naast de prachtige
                      landschappen getuigen ook de tuinen zelf van een zeldzame
                      schoonheid.
                      <br /> <br />
                      In de namiddag is er vrije tijd of je kunt ook een bezoek
                      brengen aan de tuinen van Augustus op de top van een klif,
                      met een adembenemend zicht op de azuurblauwe zee. Daarna
                      keren we terug naar Napels met de glijboot.
                      <br /> <br />
                      's Avonds genieten we na het diner van "Napolitaanse zang
                      en dans".
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    VRIJDAG 2 JANUARI 2026: Napels –{">"} Brussel
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Na het ontbijt vliegen we terug naar Brussel. Transfer
                      naar de luchthaven, vlucht om 14u met aankomst in Brussel
                      om 19u35 *. De bussen brengen ons terug naar Brugge of
                      Roeselare
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
                src="https://player.clevercast.com/?account_id=VzaPKg&item_id=21zMJn"
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
                  HET SCHIP 'BELLE DE L'ADRIATIQUE'
                </h1>
                <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <p className="text-lg text-[#162b58] mt-10">
              La Belle de l’Adriatique werd volledig gerenoveerd in 2017. Het
              schip biedt een eigentijdse en warme omgeving aan om de
              Middellandse Zee en de Adriatische kust te ontdekken. Tinten van
              groen en goud geven het schip een elegante en zonnige stijl. Dit
              schip met 4 dekken meert aan in het hartje van de steden en
              verwelkomt 197 passagiers aan boord. Het schip heeft een lift die
              de dekken bedient.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Kajuiten
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              De kajuiten op het bovendek en op het inschepingsdek hebben grote
              ramen. Deze op het benedendek hebben patrijspoorten. Op het
              hoofddek bevindt zich het restaurant waar alle maaltijden worden
              geserveerd tijdens de cruise. Op het inschepingsdek word je in de
              salon / bar verwelkomd. Het grote zonneterras beschikt over twee
              jacuzzi’s en ligstoelen.
              <br />
              <br />
              Inrichting : alle kajuiten hebben buitenzicht en zijn uitgerust
              met een douche en WC, satelliet-tv, haardroger, kluis, radio,
              individuele centrale verwarming of airconditioning, 220V
              stopcontacten, wi-fi internet.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Faciliteiten aan boord
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Groot salon met dansvloer, eetzaal met bediening, panoramabar met
              TV, bibliotheek en terras, groot zonnedek met bar en restaurant, 2
              jacuzzi’s, ligstoelen, souvenirwinkel, lift, wifi.
              Airconditioning: op het hele schip en in elke hut.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Traditionele keuken
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Eén enkele avonddienst wordt aangeboden aan de passagiers, zodat u
              zeker voldoende tijd heeft om de prachtige steden te ontdekken.
              Dankzij de grote panoramische ramen kunt u optimaal genieten van
              het uitzicht. De chef-kok bied je een internationale keuken aan
              met een vleugje lokale smaken.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Gemeenschappelijke ruimtes
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Het schip beschikt over heel wat aangename plaatsen met respect voor ieders privacy.
            </p>
          </div>

          <div className="relative mb-10 lg:mb-16">
            <div className="mb-10">
              <PhotoAlbum photos={shipPhotos} />
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
              <div className="mt-8 mx-8 lg:mx-32">
                <img
                  src={prijs}
                  alt="afbeelding ship"
                  className="w-full h-auto lg:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/** Inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Inbegrepen</h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>
              Vluchten en transfers vanuit Brussel
            </li>
            <li>
              De cruise in volpension van het avondmaal van de 1ste dag tot het ontbijt vande laatste dag
            </li>
            <li>
              Alle dranken aan boord – zowel tijdens de maaltijden, als in de bar. Met uitzondering van champagne en dranken van de speciale wijnkaart.
            </li>
            <li>
              Alle excursies vermeld in het programma
            </li>
            <li>
              Begeleiding door ons reisteam
            </li>
            <li>
              Bijstands-/repatriëringsverzekering
            </li>
            <li>Haventaksen</li>
          </ul>
        </div>

        {/** Niet inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="niet-inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Niet inbegrepen
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>Persoonlijke uitgaven</li>
            <li>
              Dranken van de speciale wijnkaart en champagne
            </li>
            <li>
              Dranken bij de maaltijden tijdens excursies/dranken tijdens transfers
            </li>
            <li>
              Annnuleringsverzekering/bagageverzekering
            </li>
          </ul>
        </div>

        {/** Onze troeven */}
        <div className="mx-8 mt-10 lg:mx-32" id="troeven">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Onze troeven
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-4 text-left">
            <li>
              Dit schip werd speciaal gecharterd voor de kijkers van Focus & WTV
            </li>
            <li>
              Het is een pakketreis: vluchten, transfers, excursies, en vol pension inbegrepen!
            </li>
            <li>
              Alles in je eigen taal
            </li>
            <li>
              Audiogidsen tijdens de excursies zijn inbegrepen
            </li>
            <li>
              Gratis Wifi aan boord
            </li>
            <li>
              We reizen in vol pension. Ook alle dranken zijn inbegrepen in het restaurant en aan de bar (behalve deze van de bijzondere kaart)
            </li>
            <li>
              Bijstands-/repatriëringsverzekering inbegrepen
            </li>
            <li>
              Tijdens de reis worden TV-reportages gemaakt, die u na de reis ontvangt: een mooie herinnering voor later!
            </li>
            <li>
              Je leert nieuwe mensen kennen uit je buurt
            </li>
          </ul>
        </div>

        {/** Gallerij  */}
        <div className="mx-8 mt-10 lg:mx-32" id="fotos">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Foto's</h2>
          <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <PhotoAlbum photos={zitaliePhotos} />
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

export default ZuidItalie;
