import { useState } from "react";
import GlobalNavbar from "../components/GlobalNavbar";
import mekong from "../assets/Mekong.jpeg";
import route from "../assets/mekong/Mekong-1.jpg";
import boot from "../assets/mekong/ship/boot.jpg";
import prijs from "../assets/zuiditalie/ship/ship8.png";
import BusinessInfoCard from "../components/BusinessInfoCard";
import logo from "../assets/zwartewoud/logo.jpg";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PhotoAlbum from "../components/PhotoAlbum";
import ship1 from "../assets/mekong/ship/ship1.jpg";
import ship2 from "../assets/mekong/ship/ship2.jpg";
import ship3 from "../assets/mekong/ship/ship3.jpg";
import ship4 from "../assets/mekong/ship/ship4.jpg";
import ship5 from "../assets/mekong/ship/ship5.jpg";
import ship6 from "../assets/mekong/ship/ship6.jpg";
import ship7 from "../assets/mekong/ship/ship7.jpg";
import ship8 from "../assets/mekong/ship/ship8.jpg";
import me1 from "../assets/mekong/Mekong-2.jpeg";
import me2 from "../assets/mekong/Mekong-3.jpeg";
import me3 from "../assets/mekong/Mekong-4.jpeg";
import me4 from "../assets/mekong/Mekong-23.jpeg";
import me5 from "../assets/mekong/Mekong-6.jpeg";
import me6 from "../assets/mekong/Mekong-7.jpeg";
import me7 from "../assets/mekong/Mekong-8.jpg";
import me8 from "../assets/mekong/Mekong-9.jpeg";
import me9 from "../assets/mekong/Mekong-10.jpg";
import me10 from "../assets/mekong/Mekong-11.jpg";
import me11 from "../assets/mekong/Mekong-12.jpg";
import me12 from "../assets/mekong/Mekong-13.jpeg";
import me13 from "../assets/mekong/Mekong-14.jpeg";
import me14 from "../assets/mekong/Mekong-15.jpeg";
import me15 from "../assets/mekong/Mekong-16.jpg";
import me16 from "../assets/mekong/Mekong-17.jpg";
import me17 from "../assets/mekong/Mekong-18.JPG";
import me18 from "../assets/mekong/Mekong-19.jpg";
import me19 from "../assets/mekong/Mekong-20.jpg";
import me20 from "../assets/mekong/Mekong-21.jpeg";
import me21 from "../assets/mekong/Mekong-22.jpg";

const Mekong = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const suiteData = [
    {
      name: "Dubbelkajuit - Bovendek",
      color: "bg-orange-400",
      dubbele: "€4.499 p.p.",
      individuele: "€4.499 p.p.",
    },
    {
      name: "Singlekajuit - Bovendek",
      color: "bg-blue-200",
      dubbele: "€5.758 p.p.",
      individuele: "€5.758 p.p.",
    },
    {
      name: "Dubbelkajuit - Hoofddek",
      color: "bg-purple-400",
      dubbele: "€4.199 p.p.",
      individuele: "-",
    },
    {
      name: "Singlekajuit - Hoofddek",
      color: "bg-purple-200",
      dubbele: "-",
      individuele: "€5.558 p.p.",
    },
    {
      name: "Dubbelkajuit bovendek met klein terras*",
      color: "bg-orange-200",
      dubbele: "€4.599 p.p.",
      individuele: "-",
    },
    {
      name: "Singlekajuit bovendek met klein terras*",
      color: "bg-purple-200",
      dubbele: "-",
      individuele: "€5.858 p.p.",
    },
  ];

  const shipPhotos = [
    { width: 1600, height: 900, src: ship1 },
    { width: 1600, height: 900, src: ship2 },
    { width: 1600, height: 900, src: ship3 },
    { width: 1600, height: 900, src: ship4 },
    { width: 1600, height: 900, src: ship5 },
    { width: 1600, height: 900, src: ship6 },
    { width: 1600, height: 900, src: ship7 },
    { width: 1600, height: 900, src: ship8 },
  ];

  const mekongPhotos = [
    { width: 1600, height: 900, src: me1 },
    { width: 1600, height: 1067, src: me2 },
    { width: 1600, height: 1067, src: me3 },
    { width: 1600, height: 900, src: me4 },
    { width: 1600, height: 900, src: me5 },
    { width: 1600, height: 900, src: me6 },
    { width: 1600, height: 900, src: me7 },
    { width: 1600, height: 900, src: me8 },
    { width: 1600, height: 900, src: me9 },
    { width: 1600, height: 900, src: me10 },
    { width: 1600, height: 900, src: me11 },
    { width: 1600, height: 900, src: me12 },
    { width: 1600, height: 900, src: me13 },
    { width: 1600, height: 900, src: me14 },
    { width: 1600, height: 900, src: me15 },
    { width: 1600, height: 900, src: me16 },
    { width: 1600, height: 900, src: me17 },
    { width: 1600, height: 900, src: me18 },
    { width: 1600, height: 900, src: me19 },
    { width: 1600, height: 900, src: me20 },
    { width: 1600, height: 900, src: me21 },
  ];

  return (
    <section>
      <GlobalNavbar />
      <div className="relative" id="home">
        <img
          src={mekong}
          alt={"image"}
          className=" w-full h-96 lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-center p-4">
          {/* White overlay box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md text-center shadow-lg text-black opacity-65 hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Reis naar Cambodja/Vietnam
            </h1>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            <p className="text-sm text-gray-700 font-bold">
              DATUM:
              <br />5 - 17 maart 2026
            </p>
          </div>
          {/* brochure Button */}
          <a
            href="/assets/brochures/Brochure-Mekong-2026.pdf"
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

      {/* Mekong reis */}
      <div className="text-center mb-8" id="intro">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
          Reis naar Cambodja/Vietnam
        </h2>
        <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
          <p className="text-lg">
            Van 5 tot 17 maart 2026 maken we een cruise op de Mekong. Dat
            betekent dat we jullie meenemen naar Vietnam en Cambodja. We laten
            je grote steden zien zoals Ho Chi Minh, Siem Reap & Phnom Penn, maar
            we bezoeken evenzeer heel wat kleine dorpjes. Je zult versteld staan
            van de bedrijvigheid op, langs, en in de Mekong rivier. Je mag je
            verwachten aan heel wat mooie natuur, aan kunst en cultuur ook – zo
            volgen we o.a. de voetsporen van de Franse schrijfster Marguerite
            Duras.
            <br /> <br />
            We nemen je mee in de geschiedenis van Vietnam en Cambodja, en laten
            je plaatsen zien als de Cu Chi tunnels, of het voormalige
            detentiecentrum van de Rode Khmer.
            <br />
            <br />
            Het is genieten van het varen, de uitzichten, het leven op het
            water. En de mensen.
            <br />
            <br />
            We laten je het verhaal achter heel wat ambachten zien, nemen je mee
            naar de tempels en vertellen je over de gebruiken. Een hoogtepunt is
            zeker de site van Angkor, waar we uitgebreid de tijd nemen om je de
            mooiste plaatsen te laten zien.
            <br />
            <br />
            Het is een cruise, met een 5-anker schip, in vol pension, waarin ook
            de vluchten, excursies, dranken aan tafel/bar (op het schip) en ook
            ons verblijf voor de cruise in een vijfsterrenhotel inbegrepen zit.
            Een reis voor 62 personen.
          </p>
        </div>

        {/** Info Avond */}
        <div className="text-center mb-8" id="infoavond">
          <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
            Infoavond
          </h2>
          <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
            <p className="text-lg">
              Focus & WTV organiseren ook een infoavond waarop je meer te weten
              komt over onze cruise op de Mekong. De infoavond gaat door in de
              gebouwen van Focus & WTV, Kwadestraat 151B Roeselare op
              <b> woensdagavond 8 oktober 2025</b>. We verwelkomen jullie vanaf
              18u30. De presentatie gaat van start om 19u00.
            </p>
            <a
              class="group mt-10 relative inline-block text-sm font-medium text-[#162b58] focus:ring-3 focus:outline-hidden"
              href="https://focus-wtv.be/reizen/mekongcruise-infoavond"
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
                    Donderdag 5 maart 2026 – BRUSSEL -{">"} Siem Reap
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Lijnvlucht naar Siem Reap (met tussenstop) Diner en
                      nachtvlucht.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Vrijdag 6 maart 2026 – Siem Reap
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md">
                        We komen aan in Siem Reap, waar we ons in het SOFITEL
                        ANGKOR PHOKEETHRA GOLF & SPA hotel installeren. We nemen
                        de ochtend vrij om even te acclimatiseren. We lunchen in
                        het hotel, en in de namiddag maken we een boottocht op
                        het Tonlé-meer om de drijvende dorpen en het
                        traditionele leven van de bewoners te ontdekken.
                        Aansluitend gaan we ook naar de nachtmarkt of de Angkor
                        Night Market". We dineren in de stad, en overnachten in
                        ons hotel.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Zaterdag 7 maart 2026 – Siem Reap - Tempels van Angkor
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      ‘Angkor’ betekent eigenlijk ‘heilige stad’. Wat een plek!
                      400 km² groot, en daarmee het grootste religieuze complex
                      ter wereld. We gaan er o.a. naar de heel gekende tempel
                      ‘Ta Phrom’ – die bekend staat om de enorme boomwortels die
                      over en door de ruïnes groeien We verkennen Angkor Thom.
                      We wandelen door de raadselachtige gezichten van de Bayon
                      Tempel, daarna zien we het terras van de Olifanten en het
                      terras van Koning Lépreux. We lunchen in de stad. In de
                      namiddag bezoeken we de ‘Senteurs d'Angkor’, een fabriek
                      waar men kaarsen en zeep bereidt, en het B.R.B.
                      ambachtscentrum. Dat ligt in het centrum, in een prachtige
                      historische tuin. Hier worden de belangrijkste
                      Cambodjaanse voorouderlijke vaardigheden gepresenteerd,
                      waaronder steen- en houtsnijwerk, textiel en natuurlijke
                      vezels met rotan en waterhyacint, leer, sieraden,
                      schilderen en nog veel meer. We dineren in de stad. ’s
                      Avonds genieten we van een show van de circusgroep Phare.
                      Overnachting in het hotel.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Zondag 8 maart - Siem Reap - Tempels van Angkor - TONLE
                    RIVIER
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Een hoogtepunt vandaag! Dé reden waarom zoveel mensen naar
                      Cambodja komen – een bezoek aan de tempel van Angkor Wat,
                      het meesterwerk van de Khmerarchitectuur. Dit is het
                      beroemdste en meest indrukwekkende monument van Angkor.
                      Hiervoor nemen we uitgebreid de tijd.
                      <br /> <br />
                      ’s Middags lunchen we in het hotel. Daarna rijden we naar
                      Koh Chen, waar we de traditionele dorpen ontdekken. We
                      nemen onze intrek in de kajuiten van het schip. Tijd voor
                      een cocktail, de voorstelling van de bemanning en een
                      uitgebreid diner aan boord. We overnachten voor anker.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Maandag 9 maart 2026 – KOH CHEN - KAMPONG TRALACH
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Ontdekking van Koh Chen, een rijk dorpje van ambachtslui
                      gespecialiseerd in de bewerking van gegraveerd koper. We
                      lunchen aan boord. In de namiddag bezoeken we de pagode
                      ‘Wat Kampong Tralach Leu’. We overnachten voor anker.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Dinsdag 10 maart 2026 - KAMPONG CHHNANG - PHNOM PENH
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Kampong Chhnang is een van de grootste vissershavens ter
                      wereld waar ook vis gekweekt wordt. De regio is vooral
                      bekend om zijn bijzonder archaïsche aardewerk. Proeverij
                      van streekproducten. Terug aan boord, lunch aan boord en
                      varen naar Phnom Penh. Tochtje met een “tuktuk” om de
                      belangrijkste monumenten van de stad te ontdekken.
                      Traditionele Apsara dansshow aan boord. Overnachting voor
                      anker.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Woensdag 11 maart 2026 - PHNOM PENH
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      We ontdekken verder de Cambodjaanse hoofdstad - Phnom
                      Penn, wat eigenlijk ‘de heuvel van Penn’ betekent. Die is
                      er ook. Die heuvel. Een gebedsplaats door mevr. Penn
                      opgericht, een vrouw die hier Boeddhabeelden had gevonden.
                      In 1866 vestigde de regering zich permanent in deze stad,
                      en toen bouwde men hier ook het koninklijk paleis, met
                      ernaast de zilveren pagode. Dat gaan we bezoeken.
                      Impressionant is het hier. Het domein is bijna 18 ha
                      groot. De koning heeft een ceremoniële functie, en dus ook
                      een perfecte plek om mensen te ontvangen. We gaan ook naar
                      het Nationaal museum – dat werd in dezelfde stijl als het
                      paleis opgetrokken. Het museum heeft 4 zalen, die rond een
                      centrale binnenplaats met vijvers liggen. Het herbergt een
                      uitzonderlijke collectie kunst uit het oude Khmer rijk. We
                      lunchen in de stad. In de namiddag worden we meegenomen in
                      het geschiedenis van de Rode Khmer. We gaan naar de School
                      Tuol Sleng S21, het voormalig detentiecentrum van de Rode
                      Khmer. Een terugkeer naar de jaren ’70, toen het land in
                      handen kwam van dictator Pol Pot en hij Cambodja wilde
                      veranderen in een boerenheilstaat. Dit oude schoolgebouw
                      werd toen door de speciale veiligheidsdienst ingenomen en
                      gebruikt als gevangenis en folterplek. Voor we teruggaan
                      naar het schip heb je nog wat vrije tijd op de markt. Eens
                      aan boord, varen we naar Chau Doc, een stad op de grens
                      tussen Cambodja en Vietnam waarvan het grondgebied 300
                      jaar geleden Vietnamees werd. We dineren aan boord, en
                      overnachten voor anker.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Donderdag 12 maart 2026 – Chau Doc
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      ‘Het zeer welvarende Chau Doc breidt zich uit op basis van
                      de visvangst en de kweek. We ontdekken in de ochtend de
                      pagode Phat Thay Tay An en de tempel Ba Chua Xu. We
                      lunchen aan boord en varen daarna verder naar Sa Dec. We
                      overnachten voor anker.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Vrijdag 13 maart 2026 - SA DEC - VINH LONG - CAI BE
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      We bezoeken de oude verblijfplaats van de minnaar van
                      schrijfster Marguerite Duras – voor wie het boek ‘l’Amant’
                      gelezen heeft! Daarna heb je wat vrije tijd in Sa Dec – de
                      markt is hier een belevenis an sich. We lunchen aan boord
                      en varen naar Vinh Long. Daar maken we een boottocht langs
                      de arroyo‘s. We bezoeken ook een steenbakkerij en een
                      ambachtelijke fabriek van gepofte rijst, rijstwafels en
                      rijstalcohol*. Terug aan boord varen we verder, en
                      genieten intussen van het diner. We overnachten voor
                      anker.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Zaterdag 14 maart 2026 - MY THO - HO CHI MINH-STAD (Saigon)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      We brengen een bezoek aan een bijenboerderij en we proeven
                      thee met honing en exotische vruchten. Daarna varen we met
                      kleine sampans op het kanaal met de waterpalmen. We
                      lunchen aan boord, en maken een prachtige vaartocht door
                      het zeer smalle kanaal van Chao Gao naar Ho Chi Minh-Stad.
                      We overnachten aan de kade in het centrum van de stad.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Zondag 15 maart 2026 - HO CHI MINH-STAD
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      We eindigen onze reis in Hu chi Minh. Niet de hoofdstad
                      van Vietnam. Maar – met 10 miljoen inwoners, wel de
                      grootste stad van het land. Veel mensen kennen deze plek
                      onder de oude naam ‘Saigon’ – toen dit gebied nog een
                      Franse kolonie was en Saigon de hoofdstad. Uit die tijd
                      komen o.a. de Notre Dame kathedraal, en het centrale
                      postkantoor. De stad profileert zich ook als cultuurstad.
                      De collectie van het historisch museum is knap om zien. Na
                      de lunch duiken we letterlijk de geschiedenis is via de Cu
                      Chi tunnels – waar we meer horen over de
                      overlevingstechnieken van de Vietcong tijdens de oorlog
                      Cocktail en afscheidsdiner. Overnachting aan de kade.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Maandag 16 maart 2026 - HO CHI MINH-STAD
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Na een laatste ontbijt aan boord, ontschepen we. We laten
                      je nog ‘Cholon’ zien - het grote Chinese
                      wijk/winkelcentrum. We gaan lunchen, en je hebt een vrije
                      namiddag (mogelijkheid om van het zwembad van het hotel te
                      genieten op het dak van het hotel). Verplaatsing naar de
                      luchthaven van Ho Chi Minh-Stad en vlucht naar Brussel
                      (met tussenstop). We vliegen ’s nachts.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Dinsdag 17 maart 2026 - Brussel
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">Aankomst in België.</p>
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
                src="https://player.clevercast.com/?account_id=VzaPKg&item_id=2ndrZM"
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
                  Het schip - RV INDOCHINE II
                </h1>
                <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <p className="text-lg text-[#162b58] mt-10">
              De RV Indochine II is een 5-anker schip, gebouwd in 2017, dat 65 m
              lang en 13 m breed is. Het schip biedt plaats aan 62 passagiers in
              31 ruime kajuiten, die elk comfortabel en goed verlicht zijn,
              gerangschikt op drie dekken. Elk van hen heeft alle voorzieningen,
              evenals een eigen balkon. Deze kajuiten bieden de beste
              verblijfsvoorwaarden. Ze zijn niet alleen comfortabel, ze werden
              ook smaakvol ingericht.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Het restaurant
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Op het bovendek - biedt een verfijnde keuken. Dankzij de grote
              ramen heb je hier tijdens de maaltijden een panoramisch uitzicht.
              Op hetzelfde niveau bevindt zich ook de receptie en de
              massageruimte.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Het zonnedek
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Het zonnedek, bovenaan het schip, is de ideale plek om te
              ontspannen en te genieten van het landschap. Hier bevindt zich het
              zwembad en de grote salon / bar.
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
                    <p className=" text-md font-bold">
                      * 4 kajuiten beschikbaar met klein terras en grote
                      schuifraam.
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
              De internationale vluchten en luchthaventaksen (320€/ persoon
              onder voorbehoud van wijzigingen)
            </li>
            <li>De transfers zoals vermeld in het programma</li>
            <li>
              Het verblijf aan boord van de R/V INDOCHINE II in een
              tweepersoonskajuit tijdens de volledige cruise in de gekozen
              categorie
            </li>
            <li>
              De accommodatie op hotel 1ste categorie in tweepersoonskamer
            </li>
            <li>
              Volpension + ook de drank bij alle maaltijden in Siem Reap en bij
              de lunch in Phnom Penh en Ho Chi Minh-Stad
            </li>
            <li>De bezoeken en excursies vermeld in het programma</li>
            <li>Vroege check-in in het hotel in Siem Reap</li>
            <li>
              Shows zoals vermeld in het programma: Traditionele Apsara
              dansshow, show van de circusgroep Phare.
            </li>
            <li>De diensten van een Nederlandstalige cruise director </li>
            <li>De bijstands-/repatriëringsverzekering</li>
            <li>
              De fooien: om uw verblijf te vergemakkelijken, omvatten onze
              prijzen inclusief fooien, die volledig betaald worden aan de
              bemanning tijdens de cruise (45€/passagier) en aan het personeel
              van het land van bestemming (35€/passagier), bepaald door ons
              rekening houdend met lokale gewoonten en gebruiken.
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
              Visumkosten voor Vietnam en Cambodja <br />
              <b>
                Wilt u dat CroisiEurope, tegen een supplement, de visumaanvraag
                voor u in orde brengt?{" "}
              </b>
              <br />
              <b>Vraag hiernaar bij boeking.</b>
              <br />
              <b>VISA VIETNAM - 115 EUR per persoon</b>
              <br />
              <b>VISA CAMBODJA - 80 EUR per persoon</b>
            </li>
            <li>De persoonlijke uitgaven</li>
            <li>De dranken op de speciale kaart aan boord (Champagne,..)</li>
            <li>Annnuleringsverzekering/bagageverzekering</li>
            <li>Mogelijkheid om in Business Class te vliegen</li>
          </ul>
        </div>

        {/** Onze troeven */}
        <div className="mx-8 mt-10 lg:mx-32" id="troeven">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Troeven</h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-4 text-left">
            <li>
              Bezoek aan 4 tempels van Angkor, de Cu Chi tunnels en Tuol Sleng.
            </li>
            <li>
              De ontdekking van 3 grote historische steden - Ho Chi Minh-Stad,
              Phnom Penh en Siem Reap. Maar ook aandacht voor het leven en de
              cultuur van de kleinere dorpen - Koh Chen, My Tho, ...
            </li>
            <li>Unieke en onvergetelijke vaartocht op het kanaal Chao Gao </li>
            <li>
              Pakketprijs van België tot België: Vervoer, cruise, hotel, alle
              transfers, excursies, vol pension en dranken bij de maaltijden/bar
              inbegrepen (behalve deze van de speciale kaart).{" "}
            </li>
            <li>Een 5-ankercruiseschip, enkel voor Focus & WTV gecharterd. </li>
            <li>
              De reis wordt begeleid in het Nederlands
            </li>
            <li>Audiogidsen tijdens de excursies zijn inbegrepen</li>
            <li>Je leert nieuwe mensen kennen uit je buurt</li>
          </ul>
        </div>

        {/** Gallerij  */}
        <div className="mx-8 mt-10 lg:mx-32" id="fotos">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Foto's</h2>
          <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <PhotoAlbum photos={mekongPhotos} />
          </div>
        </div>

        {/** Reservatie en contact info*/}
        <div className="mx-8 mt-10 lg:mx-32" id="reservatie">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Reservatie</h2>
          <p className="text-lg text-[#162b58]">
            Heb je vragen? Wil je graag deze reis boeken? Hiervoor kan je
            terecht bij Claudio, Mirte & Cidjy van CroisiEurope.
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

export default Mekong;
