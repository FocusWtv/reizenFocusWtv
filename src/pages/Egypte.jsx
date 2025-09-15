import { useState } from "react";
import GlobalNavbar from "../components/GlobalNavbar";
import egypte from "../assets/egypte/egypte-29.jpg";
import route from "../assets/egypte/Egypte-2.png";
import egypteboot from "../assets/egypte/ship//egypte-11.jpeg";
import prijs from "../assets/egypte/ship/egypte-4.png";
import GalleryCarousel from "../components/GalleryCarousel";
import BusinessInfoCard from "../components/BusinessInfoCard";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PhotoAlbum from "../components/PhotoAlbum";

const Egypte = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const suiteData = [
    {
      name: "Deluxe met panoramisch venster (20 m²) - Hoofddek",
      color: "bg-pink-200",
      dubbele: "3 430",
      individuele: "5 430",
    },
    {
      name: "Deluxe met panoramisch venster (20 m²) - Bovendek",
      color: "bg-purple-200",
      dubbele: "3 690",
      individuele: "5 690",
    },
    {
      name: "Deluxe met panoramisch venster (20 m²) - Panoramadek",
      color: "bg-blue-200",
      dubbele: "3 990",
      individuele: "5 990",
    },
    {
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
    },
  ];

  return (
    <section>
      <GlobalNavbar />
      <div className="relative" id="home">
        <img
          src={egypte}
          alt={"image"}
          className=" w-full h-96 lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-center p-4">
          {/* White overlay box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md text-center shadow-lg text-black opacity-65 hover:opacity-100 transition-opacity duration-300">
            <p className="text-md font-bold mb-2 tracking-wide">EGYPTE</p>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              De mythische Nijl aan boord van de Fayan II1
            </h1>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            <p className="text-sm text-gray-700 font-bold">
              DATUM:
              <br />
              VAN 29 NOVEMBER TOT 9 DECEMBER 2025
            </p>
          </div>
          {/* brochure Button */}
          <a
            href="/assets/brochures/Brochure-Egypte-2025-FocusWTV-19-11-2025.pdf"
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
          <div className="mt-3 bg-red-500 text-white animate-pulse underline font-semibold py-3 px-6 rounded-lg border-4 shadow-lg flex items-center gap-2">
            VOLZET
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

      {/* Egypte reis */}
      <div className="text-center mb-8" id="intro">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
          Egyptereis
        </h2>
        <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
          <p className="text-lg">
            Het staat al zo lang op ons lijstje! Een reis door Egypte, door de
            tijd ook – ons verdiepen in de verhalen, de geschiedenis en de
            mysteries. Naar de piramides, de graven in de ‘Vallei der Koningen’,
            de sfinxen groeten, en de legendarische tempels bezoeken - zoals die
            van ‘Karnak’ of ‘Luxor’. Varen op de Nijl – wat ontzettend mooi is.
            En zelf zien hoe belangrijk deze rivier is. Het nieuwe museum in
            Caïro bezoeken. En je verbazen. Na het zien van Abou Simbel zal je
            Ramses II nooit meer vergeten. Het complete verhaal mét 3 inbegrepen
            vluchten, en een cruise met het 5-sterrenschip M/S Fayan II. Op deze
            website ontdek je het volledige reisschema en het schip waarmee we
            varen. Ben je benieuwd en wil je meer zien, kijk dan zeker naar onze
            reisfilm!
          </p>
        </div>

        {/** Info Avond */}
       {/*  <div className="text-center mb-8" id="infoavond">
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
                    WOENSDAG 19 NOVEMBER: BRUSSEL – CAÏRO
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-sm">
                      Vertrek overdag met een lijn- of chartervlucht (met of
                      zonder tussenstop) naar Caïro. Avondmaal en overnachting
                      in het Holiday Inn Maadi 5* hotel (of gelijkwaardig).
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DONDERDAG 20 NOVEMBER: CAÏRO
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-sm">
                        Na het ontbijt vertrekken we voor een bezoek aan het
                        splinternieuwe Grand Egyptian Museum, gedeeltelijk
                        geopend sinds oktober 2024 met een indrukwekkende
                        architectuur. Het museum herbergt 's werelds grootste
                        verzameling Egyptische oudheden. Lunch in een
                        restaurant.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm mt-2">
                        In de namiddag bezoekt u de piramides van Gizeh, een van
                        de laatste overblijfselen van de zeven wereldwonderen.
                        Ze zijn vernoemd naar de farao's Cheops, Chephren en
                        Mykerinos en waren oorspronkelijk volledig opgetrokken
                        uit witte kalksteen. Dit meer dan 4000 jaar oude
                        grafcomplex, Unesco werelderfgoed uiteraard, heeft de
                        mensheid altijd gefascineerd en spreekt ook vandaag nog
                        tot de verbeelding. De piramides zijn omgeven door
                        mysterie en herbergen tot op heden nog veel geheimen. De
                        mythische sfinx, een integraal onderdeel van de site,
                        dankt zijn naam aan de oude Grieken en zijn gelijkenis
                        met het mythologische monster met het hoofd van een
                        vrouw en het lichaam van een leeuw. Dit legendarische
                        beeld van monumentale proporties is een object van
                        verering en een van de symbolen van Egypte. Avondmaal en
                        overnachting in het hotel.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    VRIJDAG 21 NOVEMBER: CAÏRO
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-sm">
                      Ontdek Caïro in de ochtend, een uitgestrekte, bruisende
                      stad met een onmiskenbare charme: u zult met name Saladins
                      Citadel bezoeken, Unesco werelderfgoed sinds 2006. De
                      citadel werd gebouwd in de 12de eeuw om de stad te
                      beschermen tegen Europese aanvallen en is vandaag de
                      thuisbasis van de Mohamed Ali Moskee, ook bekend als de
                      Albasten Moskee. Daarna bezoek aan het Museum van de
                      Egyptische beschaving met oa een tentoonstelling van de
                      koninklijke mummies en een koptische kerk. Na de lunch in
                      een restaurant wandelt u door de beroemde Khân-al Khalili
                      soek en keert u terug naar het hotel. Avondmaal en
                      overnachting in Caïro.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    ZATERDAG 22 NOVEMBER: CAÏRO -{">"} LUXOR
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-sm">
                      In de late ochtend transfer naar de luchthaven van Caïro
                      en vlucht naar Luxor. Ontvangst op de luchthaven, transfer
                      en verwelkoming aan boord van de M/S Fayan II. Vervolgens
                      een bezoek aan de mythische tempel van Karnak, het meest
                      indrukwekkende religieuze complex in het oude Egypte. De
                      tempel werd in de loop van duizenden jaren gebouwd en is
                      gewijd aan Amon, zijn metgezel de godin Moet en haar zoon
                      Chons. De Grote Hypostyle Hal, met zijn hoge concentratie
                      zuilen, is de meest spectaculaire en grootste van alle
                      Egyptische tempels. Terugkeer naar het schip,
                      welkomstdrankje en avondmaal. Overnachting aan boord.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    ZONDAG 23 NOVEMBER: LUXOR
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-sm">
                        Na het ontbijt bezoekt u de tempel van Luxor, het oude
                        Thebe. Ramses II voegde er zes monumentale standbeelden
                        en twee obelisken aan toe, waarvan er een in 1831 aan
                        Frankrijk werd geschonken en nu de Place de la Concorde
                        in Parijs siert. De Luxortempel is verbonden met de
                        Karnaktempel door een lange laan met sfinxen, gebouwd in
                        de 14de eeuw voor Christus. Lunch, avondmaal en
                        overnachting aan boord.
                      </p>
                    </div>
                    <div className="text-sm italic mt-2">
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
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    MAANDAG 24 NOVEMBER: LUXOR-{">"} EDFU
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-sm">
                      Vertrek in de ochtend voor een bezoek aan de Tempel van
                      Horus, opmerkelijk vanwege zijn harmonieuze indeling,
                      perfecte proporties en het feit dat deze uitzonderlijk
                      goed bewaard is gebleven. Het is de op één na grootste
                      tempel van Egypte. Aan de ingang prijkt de grote pyloon,
                      bijna 36 meter hoog en versierd met indrukwekkende
                      reliëfs. Daarna volgt de centrale binnenplaats met
                      zuilengalerij en een opeenvolging van kamers met
                      verschillende functies. Het grote belang van deze tempel
                      ligt ook in de inscripties, die Egyptologen in staat
                      hebben gesteld om de dagelijkse aanbidding van Horus en de
                      meest weelderige ceremonies van het oude Egypte tot in
                      detail te doorgronden. In de namiddag vaart u naar Kom
                      Ombo. Lunch, avondmaal en overnachting aan boord.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DINSDAG 25 NOVEMBER: ASWAN
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-sm">
                      Tijdens de ochtend vaart het schip naar Aswan. Vervolgens
                      vertrekt u met een kleine motorboot om de majestueuze
                      Tempel van Isis te bezoeken. Hij werd gebouwd door een van
                      de laatste Egyptische farao's, Nectanebo I, die regeerde
                      in de 4de eeuw voor Christus en werd voltooid door de
                      Romeinen. In de jaren 1970 werd de tempel verplaatst van
                      het eiland Philae naar het naburige eiland Aguilika na de
                      bouw van de Aswandam. De tour gaat verder met een bezoek
                      aan de granietgroeven van Aswan, een essentieel materiaal
                      voor de bouw van de tempels, piramides en obelisken.
                      Ontdek op deze plek de beroemde onvoltooide obelisk,
                      waarvan de constructie werd opgegeven na een scheur in de
                      rots. In de namiddag maakt u een tocht op de Nijl met een
                      feloek en bezoekt u de botanische tuin op Kitchener
                      Island, een oase van groen en rust. Lunch, avondmaal en
                      overnachting aan boord.
                    </p>
                    <div className="text-sm italic mt-2">
                      <p className="font-semibold underline">
                        Optionele excursie:
                      </p>
                      <b>KLANK- EN LICHTSPEL IN PHILAE</b>In de vooravond vindt
                      bij de tempel van Philae één van de mooiste licht- en
                      geluidsspektakels van Egypte plaats. Prijs per persoon: €
                      55
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    WOENSDAG 26 NOVEMBER: ASWAN –{">"} ABU SIMBEL
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-sm">
                      Vertrek per vliegtuig naar Abu Simbel en zijn majestueuze
                      tempels. Dit Nubische meesterwerk van Ramses II ligt dicht
                      bij de Soedanese grens en werd in de jaren 1960 onder
                      toezicht van de Unesco verplaatst. Door de bouw van de
                      Aswandam dreigde het monument immers onder water te komen
                      staan. De vier koninklijke kolossen van de Grote Tempel,
                      meer dan 20 meter hoog, kijken uit op de Nijl en
                      symboliseren de macht van de vorst. De andere gebedsplaats
                      is de Tempel van Hathor, gewijd aan koningin Nefertari, de
                      geliefde vrouw van de farao. Op de gevel prijken zes
                      enorme beelden van het goddelijke paar, elk ongeveer tien
                      meter hoog. Na een bezoek aan de archeologische site keert
                      u terug naar Aswan voor een late lunch aan boord.
                      Avondmaal en overnachting aan boord.
                    </p>
                    <div className="text-sm italic mt-2">
                      <p className="font-semibold underline">
                        Optionele excursie:
                      </p>
                      <b>DE TEMPEL VAN KALABSHA</b> De tempel van Kalabsha is
                      een indrukwekkende archeologische site, in de buurt van de
                      stad Aswan, op de westelijke oever van de Nijl. De tempel,
                      gewijd aan Mandulis, een god van de vruchtbaarheid en de
                      zon, was een belangrijk religieus centrum in de Nubische
                      regio tijdens de Romeinse periode. Deze tempel werd
                      gebouwd tijdens het bewind van keizer Augustus in de
                      eerste eeuw voor Christus en werd uitgebreid in de
                      daaropvolgende eeuwen. Hij werd gebouwd in een typisch
                      Egyptische stijl maar met Romeinse invloeden, waardoor het
                      een interessant voorbeeld is van de integratie van
                      Egyptische tradities en Romeinse praktijken. Prijs per
                      persoon: € 60
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DONDERDAG 27 NOVEMBER: KOM OMBO
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-sm">
                      In de ochtend vaart u naar Kom Ombo. Bezoek aan de tempel
                      van Sobek en Haroëris, die indruk maakt met zijn
                      bas-reliëfs. De originaliteit ervan ligt in het feit dat
                      het gewijd is aan de verering van twee godheden. Het
                      noordelijke deel is gewijd aan Haroëris of Horus de
                      Oudere, de weldadige god die wordt afgebeeld als een man
                      met een valkhoofd die gekroond is met de zonneschijf, de
                      atef of de pschent (dubbele kroon van Neder- en
                      Opper-Egypte). Het zuidelijke deel is gewijd aan Sobek, de
                      god met het hoofd van een krokodil die water en
                      vruchtbaarheid symboliseert. In het oude Egypte was de
                      krokodil een heilig dier en zijn aanwezigheid in de Nijl
                      kondigde overstromingen aan die gunstig waren voor de
                      oogsten. Na de middag vaart u naar Luxor. Lunch, avondmaal
                      en overnachting aan boord.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    VRIJDAG 28 NOVEMBER: LUXOR
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-sm">
                      Vertrek naar de westelijke oever van de Nijl om de
                      Thebaanse necropolen van de Vallei der Koningen te
                      ontdekken, beroemd om de graven van de grootste farao's
                      van Egypte en hun vrouwen. Bezoek de graven, waaronder die
                      van de beroemde Toetanchamon. Bezoek vervolgens de Tempel
                      van Hatsjepsoet, een uniek bouwwerk tegen de rotswand van
                      de Thebeberg. Bezoek de beroemde Kolossen van Memnon,
                      monumentale beeldhouwwerken en de laatste overblijfselen
                      van de tempel van Amenhotep III. Terug aan boord voor de
                      lunch. Vrije namiddag om door de soek van Luxor te
                      wandelen. Afscheidsdiner. Overnachting aan boord.
                    </p>
                    <div className="text-sm italic mt-2">
                      <p className="font-semibold underline">
                        Optionele excursie:
                      </p>{" "}
                      <b>DE VALLEI VAN DE KUNSTENAARS</b> De Vallei der
                      Kunstenaars, ook bekend als Deir el-Medina, is een
                      archeologische vindplaats gelegen nabij de Vallei der
                      Koningen. Deze plek was ooit een gemeenschap die onderdak
                      bood aan ambachtslieden en arbeiders die verantwoordelijk
                      waren voor de bouw en decoratie van de koninklijke graven
                      in de nabijgelegen vallei. De vindplaats heeft een grote
                      historische en archeologische betekenis, omdat het ons
                      helpt een beter inzicht te krijgen in de rol van
                      ambachtslieden in de oude Egyptische samenleving en in het
                      dagelijkse leven toen. Prijs per persoon: € 40
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    ZATERDAG 29 NOVEMBER: LUXOR-{">"} BRUSSEL
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-sm">
                      Ontscheping en transfer naar de luchthaven. Lijn- of
                      chartervlucht naar Brussel met tussenstop.
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
          <div className="mt-8 mx-4">
            <div className="relative sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48 aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://player.clevercast.com/?account_id=VzaPKg&item_id=21z1ov"
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
              src={egypteboot}
              alt={"image"}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            {/* Main content overlay */}
            <div className="absolute inset-0 flex flex-col justify-start items-center p-2 sm:p-4">
              {/* White overlay box - more responsive */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg mb-2 p-3 sm:p-4 md:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center shadow-lg text-black">
                <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#162b58] font-bold mb-2 leading-tight">
                  ONS SCHIP : M/S Fayan II 5*
                </h1>
                <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <p className="text-lg text-[#162b58] mt-10">
              De M/S Fayan II 5* is 75 meter lang en 14,20 meter breed. Het
              schip biedt plaats aan 130 personen en maakt deel uit van een
              gloednieuwe vloot van de meest luxueuze schepen die momenteel op
              de Nijl tussen Luxor en Aswan varen. Het schip werd volledig
              gerenoveerd in 2023 en is het resultaat van jarenlange ervaring
              met een veeleisende internationale klantenkring. Met de M/S Fayan
              II kunt u de oevers van de Nijl en de getuigenissen van de
              duizenden jaren oude beschaving in alle comfort ontdekken.
            </p>
          </div>

          <div className="relative">
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
          </div>

          <div className="relative mb-10 lg:mb-16">
            <div className="mb-10">
              <GalleryCarousel />
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
              <div className="mt-8 mx-8 lg:mx-32">
                <img
                  src={prijs}
                  alt="afbeelding ship"
                  className="w-full h-96 lg:h-[500px] object-cover"
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
              De charter- of lijnvluchten Brussel/Caïro, Caïro/Luxor, Aswan/Abu
              Simbel/Aswan en Luxor/Brussel in Economy Class met of zonder
              tussenstop (Egyptair, Air France, Lufthansa, Brussels Airlines)
            </li>
            <li>
              De luchthaventaksen (€460 op heden), variabel en onderhevig aan
              wijzigingen
            </li>
            <li>
              Alle transfers zoals vermeld in het programma + busvervoer vanuit
              Brugge/Roeselare naar de luchthaven.{" "}
            </li>
            <li>
              Het verblijf aan boord van de M/S Fayan II in de gekozen categorie
            </li>
            <li>
              Het verblijf in een tweepersoonskamer in een hotel 5* (lokale
              norm) in Caïro (3 nachten)
            </li>
            <li>
              Volpension vanaf het avondmaal op dag 1 tot en met het ontbijt op
              dag 11
            </li>
            <li>Water, koffie of thee bij de maaltijden</li>
            <li>
              Alle bezoeken en entreegelden zoals vermeld in het programma met
              Nederlandstalige of Franstalige Egyptische gidsen (indien er geen
              Nederlandstalig gidsen zijn, zorgt de reisbegeleider voor de
              vertaling)
            </li>
            <li>
              Alle activiteiten aan boord (Cocktail, afscheidsdiner,
              voordrachten, folklore- avonden...)
            </li>
            <li>
              De diensten van een Nederlandstalige Rivages du Monde
              cruisedirecteur samen met een team van Focus & WTV
            </li>
            <li>Een reisfilm van Focus & WTV, gemaakt tijdens deze reis. </li>
          </ul>
        </div>

        {/** Niet inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="niet-inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Niet inbegrepen
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>Andere dranken dan deze vermeld in het programma</li>
            <li>
              Visumkosten voor Egypte (€45 op heden voor personen met Belgische
              nationaliteit)
            </li>
            <li>
              Fooien voor het boordpersoneel (€9 /dag/pers. Aanbevolen, geen
              verplichting)
            </li>
            <li>
              Fooien voor gidsen (€ 5/dag/pers. Aanbevolen, geen verplichting)
            </li>
            <li>Reisverzekeringen</li>
            <li>
              Mogelijkheid om in Business Class te vliegen: consulteer ons
            </li>
            <li>Facultatieve excursies</li>
          </ul>
        </div>

        {/** Onze troeven */}
        <div className="mx-8 mt-10 lg:mx-32" id="troeven">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Onze troeven
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-4 text-left">
            <li>
              Een gloednieuw vijfsterrenschip, bijzonder luxueus en voorzien van
              alle moderne comfort. Dit wordt exclusief voor de kijkers van
              Focus & WTV gecharterd. Zo leer je makkelijk mensen uit je eigen
              streek kennen.
            </li>
            <li>
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
            </li>
            <li>
              Pakketprijs van België tot België: Vervoer (vluchten), cruise,
              hotelverblijf, transfers, en bijna alle excursies zijn inbegrepen.
            </li>
            <li>
              Luxe-schip 5*: de kajuiten beschikken over grote panoramische
              schuiframen.
            </li>
            <li>
              Vluchten inbegrepen met autocar transfer vanuit Brugge en
              Roeselare naar de luchthaven en terug.{" "}
            </li>
            <li>
              Volpension en dranken (water, alcoholvrije dranken, thee, koffie)
              inbegrepen tijdens de maaltijden aan boord.
            </li>
            <li>De reis wordt volledig begeleid in het Nederlands. </li>
            <li>
              Focus & WTV maken een reisfilm aan boord, die je achteraf
              toegestuurd krijgt. Een mooie herinnering!{" "}
            </li>
          </ul>
        </div>

        {/** Gallerij  */}
        <div className="mx-8 mt-10 lg:mx-32" id="fotos">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Foto's</h2>
          <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <PhotoAlbum />
          </div>
        </div>

        {/** Reservatie */}
        <div className="mx-8 mt-10 lg:mx-32" id="reservatie">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Reservatie</h2>
          <p className="text-lg text-[#162b58]">
            Contacteer voor reservatie de medewerkers van RIVAGES DU MONDE.
          </p>
        </div>

        {/** Contact info */}
        <div className="mx-8 mt-10 lg:mx-32">
          <div className="p-4">
            <BusinessInfoCard />
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

export default Egypte;
