import { useState } from "react";
import GlobalNavbar from "../components/GlobalNavbar";
import adriatisch from "../assets/adriatischecruise/foto16.jpeg";
import route from "../assets/adriatischecruise/Afbeelding2.jpg";
import boot from "../assets/adriatischecruise/Afbeelding1.jpg";
import ship1 from "../assets/adriatischecruise/Afbeelding3.jpg";
import ship2 from "../assets/adriatischecruise/Afbeelding4.jpg";
import ship3 from "../assets/adriatischecruise/Afbeelding5.jpg";
import ship4 from "../assets/adriatischecruise/Afbeelding6.jpg";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PhotoAlbum from "../components/PhotoAlbum";

const AdriatischeCruise = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const suiteData = [
    {
      name: "Dubbelkajuit op het 1e dek ",
      color: "bg-pink-200",
      dubbele: "€2.199 p.p",
      individuele: "€2.199",
    },
    {
      name: "Singlekajuit op het 1e dek ",
      color: "bg-purple-200",
      dubbele: "€2.199 p.p",
      individuele: "€2.199",
    },
    {
      name: "Dubbelkajuit op het 2e dek",
      color: "bg-blue-200",
      dubbele: "€2.399 p.p",
      individuele: "€2.399",
    },
    {
      name: "Singlekajuit op het 2e dek	",
      color: "bg-blue-200",
      dubbele: "€3.189 p.p",
      individuele: "€3.189",
    },
    {
      name: "Dubbelkajuit op het 3e dek",
      color: "bg-yellow-200",
      dubbele: "€2.599 p.p",
      individuele: "€2.599",
    },
    {
      name: "Singlekajuit op het 3e dek",
      color: "bg-yellow-200",
      dubbele: "€3.389 p.p",
      individuele: "€3.389",
    },
    {
      name: "Dubbelkajuit op het 4e dek",
      color: "bg-teal-200",
      dubbele: "€2.799 p.p",
      individuele: "€2.799",
    },
    {
      name: "Singlekajuit op het 4e dek",
      color: "bg-teal-200",
      dubbele: "€3.589 p.p",
      individuele: "€3.589",
    },
  ];

  const shipPhotos = [
    { width: 1600, height: 900, src: ship1 },
    { width: 1600, height: 900, src: ship2 },
    { width: 1600, height: 900, src: ship3 },
    { width: 1600, height: 900, src: ship4 },
  ];

  return (
    <section>
      <GlobalNavbar />
      <div className="relative" id="home">
        <img
          src={adriatisch}
          alt={"image"}
          className=" w-full h-96 lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-center p-4">
          {/* White overlay box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md text-center shadow-lg text-black opacity-65 hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              ADRIATISCHE KUST CRUISE
            </h1>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            <p className="text-sm text-gray-700 font-bold">
              DATUM:
              <br />
              VAN 28 MEI TOT 4 JUNI 2026
            </p>
          </div>
          {/** status label */}
          <div className="mt-3 bg-green-500 text-white underline font-semibold py-3 px-6 rounded-lg border-4 shadow-lg flex items-center gap-2">
            Beschikbaar
          </div>
        </div>
      </div>

      {/** Navigation */}
      <div className="sticky top-[56px] z-40 bg-[#4ab0e1] shadow-md">
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
                  {/* <Nav.Link href="#reportage" className="mx-2 text-white">
                    Reportage
                  </Nav.Link> */}
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
          Adriatische kustlijn van Kroatië en Montenegro
        </h2>
        <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
          <p className="text-lg">
            Stap aan boord van de Belle de l’Adriatique voor een onvergetelijke
            cruise langs de betoverende Adriatische kusten. Deze reis neemt u
            mee naar een wereld van eeuwenoude steden, charmante haventjes en
            indrukwekkende natuur.
            <br />
            <br />
            We beginnen in de parel van de Adriatische Zee: Dubrovnik, met zijn
            imposante stadsmuren en schilderachtige straatjes. Van daaruit varen
            we naar het groene eiland Mljet, waar natuur en rust centraal staan.
            Op Korčula dompelen we ons onder in een middeleeuwse sfeer, terwijl
            Šibenik en Trogir ons verwelkomen met hun rijke geschiedenis en
            prachtige architectuur. Split, bruisend en levendig, verrast met het
            indrukwekkende paleis van Diocletianus. Ook Hvar mag niet ontbreken,
            het jetset-eiland met zijn elegante pleinen en zonnige charme. Het
            eiland Vis laat u kennismaken met authentieke schoonheid, ver weg
            van het massatoerisme. Ten slotte varen we de majestueuze baai van
            Kotor in Montenegro binnen, één van de meest indrukwekkende
            natuurwonderen van de regio.
            <br />
            <br />
            Tijdens deze cruise ontdekt u niet alleen cultureel erfgoed, maar
            ook adembenemende landschappen en de warme mediterrane sfeer van
            Dalmatië. De combinatie van zon, zee, natuur en cultuur maakt deze
            reis tot een unieke ervaring.
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
                    Donderdag 28 mei 2026 – BELGIË -{">"} DUBROVNIK
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      ’s Morgens hebben we afspraak op de luchthaven van
                      Oostende, van waar we vertrekken met een chartervlucht
                      naar Dubrovnik. We komen tegen de middag aan, en we
                      brengen je meteen naar het Unesco geklasseerde
                      stadscentrum. Over je koffers hoef je je geen zorgen te
                      maken, die worden naar het schip gebracht. Intussen hebben
                      wij alle tijd om vrij te lunchen, en om het stadcentrum
                      alvast wat te verkennen. Het is hier heerlijk struinen
                      over de Stradun, de hoofdstraat, je kunt ook de kleine
                      straatjes verder verkennen, een terrasje doen of genieten
                      van het uitzicht. Of je kunt het ook wat ‘hoger’ gaan
                      zoeken, en een wandeling maken over de stadmuren. Een
                      kleine 2km is dat. Het is iets wat we iedereen kunnen
                      aanraden!
                      <br />
                      In de late namiddag is er een transfer naar het schip. We
                      nemen onze kajuiten in, en maken bij de welkomstcocktail
                      kennis met de bemanning. ’s Avonds genieten we uiteraard
                      van ons eerste diner aan boord. Het schip blijft liggen in
                      Dubrovnik. Wie dus zin heeft om nog even de stad in te
                      trekken, kan dat zeker doen.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Vrijdag 29 mei 2026 – DUBROVNIK (optionele excursie)
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md">
                        Vandaag maken we er een dagje Dubrovnik van. En zoals je
                        gisteren al merkte, heeft Dubrovnik een unieke ligging.
                        De stad ligt op een schiereiland, aan de voet van een
                        kalksteengebergte en is omringd door heel wat groen. De
                        reeks ‘Game of Thrones’ werd hier niet voor niets
                        gefilmd… Tegelijkertijd is deze stad ook een
                        strategische plek en dat heeft de voorbije eeuwen dan
                        weer voor heel wat bezetters gezorgd… ’s Morgens neemt
                        een gids ons op sleeptouw door Dubrovnik om ons het hele
                        verhaal te doen. Zo bezoeken we het Dominicanerklooster
                        en zijn museum met religieuze kunst en waardevolle
                        schilderijen. We gaan ook naar het Paleis van de Rector,
                        wat vroeger de zetel van de regering was, en wat
                        intussen omgevormd werd tot een museum over het verleden
                        van de stad. In de kathedraal zien we de relikwieën van
                        de patroonheilige en schilderijen uit het atelier van
                        Titiaan. En verder is er het paleis Sponza, de fonteinen
                        van Onofrio, en nog enkele andere historische gebouwen.
                      </p>
                    </div>
                    <div>
                      <p className="text-md mt-2">
                        We lunchen op het schip en in de namiddag heb je vrije
                        tijd. Winkelen in Dubrovnik? Alsnog de wandeling over de
                        muren van de stad maken, zonnen, een terrasje doen, of
                        oesters gaan proeven in de haven? Je hebt er alle tijd
                        voor. ’s Avonds geniet u van een typische, Kroatische
                        folklore avond waarna het schip om 23u vertrekt voor een
                        nachtelijke vaart naar het eiland Mljet.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Zaterdag 30 mei 2026 – MLJET (optionele excursie) & KORCULA
                    (optionele excursie)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Deze voormiddag staat er natuur op het programma, want we
                      bezoeken het Nationaal Park op Mljet. Met de sloepen gaan
                      we aan land en wandelen we naar de ingang van het park.
                      Kroatië telt trouwens acht nationale parken, waarvan er
                      dus één op Mljet is. Het Nationaal Park beslaat het
                      westelijke deel van het eiland en verrast met ongerepte
                      bossen, kristalhelder water en twee betoverende
                      zoutwatermeren. We wandelen langs het grote turquoise meer
                      naar de ferry die ons naar een piepklein eilandje in het
                      midden van het meer brengt. Daar bezoeken we het oude
                      benedictijnenklooster. Het klooster biedt niet alleen een
                      blik op het verleden, maar ook prachtige uitzichten over
                      het meer en de overweldigende natuur van het Nationaal
                      Park. Mljet ademt stilte en authenticiteit, ver weg van de
                      drukte van de stad. Na het bezoek van het klooster is er
                      wat vrije tijd om helemaal tot rust te komen en tegelijk
                      te genieten van cultuur en natuur. <br />
                      <br />
                      Wanneer iedereen terug aan boord is van de Belle de
                      l’Adriatique, is het tijd voor de lunch terwijl we verder
                      varen naar het eiland Korčula. We bezoeken het
                      gelijknamige stadje, sfeervol vol middeleeuwse charme en
                      vaak omschreven als het kleine Dubrovnik. Binnen de oude
                      stadsmuren ontdekt u kronkelende straatjes, elegante
                      pleinen en statige huizen. Volgens de traditie is dit de
                      geboorteplaats van ontdekkingsreiziger Marco Polo, wat
                      extra glans geeft aan de rijke geschiedenis. U bezoekt ook
                      de Sint-Marcuskathedraal, een meesterwerk van steenhouwers
                      en beeldhouwers uit de 15de eeuw. En dankzij het
                      stadsmuseum krijgt u een mooie inkijk in het ontstaan van
                      de stad. <br /> ’s Avonds varen we naar Sibenik.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Zondag 31 mei 2026 – KRKA NATIONAL PARK (optionele excursie)
                    & SIBENIK (inbegrepen excursie)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Tijdens de ochtend kunt u nog verder genieten van de vaart
                      naar Sibenik, langs één van de vier forten die de stad
                      beschermden tegen de Ottomanen. De haven waar we aanmeren,
                      is opnieuw vlakbij de stad, waardoor u in de late
                      voormiddag alvast even te voet Sibenik kan verkennen. Na
                      de lunch vertrekken we eerst met de bus naar het tweede
                      grootste Nationaal Park van Kroatië, Krka, één van de
                      spectaculairste natuurgebieden die het land rijk is. Het
                      water stort er over 17 travertijnterrassen naar beneden.
                      Travertijn is een steen die gevormd wordt door organismen
                      in het water. De verschillende watervallen zijn te
                      bewonderen via een houten wandelpad dat je meeneemt
                      doorheen de prachtige natuur van het Nationaal Park.
                      <br />
                      <br />
                      Aansluitend zet de bus ons af in de haven, van waar we in
                      15 minuten naar Sibenik wandelen. Wie liever een
                      aperitiefje drinkt op het schip om even op adem te komen,
                      kan dat natuurlijk ook. In Sibenik bezoeken we onder meer
                      de door Unesco beschermde Kathedraal van Saint James en
                      ontdekken we het verhaal van de 17de-eeuwse burcht die in
                      58 dagen werd gebouwd om de stad te beschermen tegen de
                      Ottomanen. Sibenik is trouwens de oudste Slavische stad en
                      zeker een bezoekje waard.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Maandag 1 juni 2026 – TROGIR (optionele excursie) & SPLIT
                    (optionele excursie)
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md">
                        Na een nacht varen, komen we aan in Trogir. Met de
                        tenderboten meren we aan op het eilandje waarop deze
                        stad gebouwd is. Trogir is een kleine parel – 700m lang,
                        400m breed, waar u heerlijk kan verdwalen in de
                        middeleeuwse straten. Hier vindt u ook één van de
                        mooiste religieuze erfgoedschatten van Kroatië: de
                        indrukwekkende romaanse kathedraal waar 400 jaar aan
                        gebouwd is. Je voelt hier ook de Venetiaanse invloeden
                        uit de derde eeuw voor Christus. Trogir is de best
                        bewaarde middeleeuwse stad ter wereld. Zoals de gidsen
                        het daar zo mooi zeggen: ‘Het lijkt wel een tijdsmachine
                        in architecturale stijlen.’ We zien romaneske invloeden,
                        gotiek en renaissance elementen. Na de wandeling met de
                        gids is er vrije tijd om wat te kuieren door de straten
                        of te genieten van een drankje in de zon met zicht op
                        zee.
                      </p>
                    </div>
                    <div>
                      <p>
                        ’s Middags lunchen we aan boord en varen we richting
                        Split. De tweede grootste stad van Kroatië en het
                        kloppend hart van Centraal-Dalmatië. In de stad lijkt
                        het wel of je door een openluchtmuseum wandelt. Je
                        brengt een bezoek aan het paleis dat keizer Diocletianus
                        liet bouwen als zijn residentie, maar liefst 1700 jaar
                        geleden. Later groeide er een middeleeuwse stad rondom,
                        die zich verder ontwikkelde tot het huidige Split. In
                        het paleis vind je ook de oudste kathedraal van de
                        wereld en als je een ‘Game of Thrones’-fan bent, dan kun
                        je hier een aantal scènes uit de serie herbeleven. Na de
                        wandeling door Split, is er wat vrije tijd om je dieper
                        in de bruisende stadsleven te begeven.
                        <br />
                        <br />
                        Het schip blijft vannacht liggen in Split. Vanop het
                        zonnedek heeft u een prachtig zicht op de lichtjes van
                        de stad.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Dinsdag 2 juni 2026 – HVAR (inbegrepen excursie) & VIS
                    (optionele excursie)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      In de vroege ochtend zet het schip koers richting het
                      eiland Hvar, waar we iets later die ochtend al aankomen.
                      Vanuit het schip stap je meteen het hart van de
                      gelijknamige stad Hvar binnen. Die wordt ook wel het
                      Saint-Tropez van Kroatië genoemd en je begrijpt al snel
                      waarom. Hvar stad ligt rond een schilderachtige,
                      natuurlijke haven en is één van de populairste badplaatsen
                      van Dalmatië. Heel wat monumenten, zoals de kathedraal en
                      het Franciscanenklooster, getuigen van een rijke
                      geschiedenis, beïnvloed door gotiek en renaissance. Met
                      het meeste zonne-uren van alle eilanden, is Hvar de
                      perfecte plek voor lavendel en kruiden als rozemarijn. Je
                      vindt ook allerlei producten met lavendel in de gezellige
                      kraampjes in de haven. Er is voldoende vrije tijd om wat
                      souvenirs te kopen, of om even de Adriatische Zee in te
                      duiken. <br />
                      <br />
                      Terwijl we lunchen, vaart La Belle de l’Adriatique verder
                      naar het kleine eiland Vis. Een groen eiland met een
                      gezellig stadje waar een aantal scènes van de film ‘Mamma
                      Mia’ - met onder meer Meryl Streep - zijn opgenomen.
                      Toeristen waren hier trouwens jarenlang verboden, waardoor
                      Vis z’n ongerepte karakter heeft behouden. Je geniet hier
                      van wat vrije tijd op het eiland. Wie graag fietst, kan
                      een korte fietstocht maken op de heuvels van het eiland,
                      met een elektrische fiets uiteraard. Maar je kunt ook
                      kuieren door het stadje of gaan baden aan één van de mooie
                      strandjes op wandelafstand van het schip.
                      <br />
                      <br />
                      ’s Avonds wordt er gezorgd voor ‘het galadiner van de
                      kapitein’, waarbij de chef-kok van het schip een heel
                      bijzonder menu presenteert, met bijpassende Kroatische
                      wijnen.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Woensdag 3 juni 2026 – KOTOR/Montenegro (optionele excursie)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      ’s Morgens varen we de baai van Kotor binnen. Dat uitzicht
                      wil je niet missen! De Adriatische zee dringt hier
                      kilometers ver het land in en vormt een reeks rustige
                      baaien die ooit doorkruist werden door een machtige vloot.
                      Dankzij het natte, milde klimaat zorgt de vegetatie op de
                      flanken voor een landschap dat lijkt op een fjord.
                      Helemaal op het einde van de inham in Montenegro, ligt de
                      middeleeuwse stad Kotor, die als Unesco werelderfgoed werd
                      erkend. De stad heeft eeuwenlang de tand des tijds en vele
                      oorlogen en aardbevingen doorstaan. Na de laatste grote
                      aardbeving in 1979 werd de stad heropgebouwd tot de
                      prachtige stad die het vandaag is. De bergen rondom zorgen
                      voor een imposante indruk.
                      <br />
                      <br />
                      In Kotor neemt een gids ons mee voor een blik achter de
                      stadsmuren. Muren die je hier trouwens gratis kan
                      bewandelen. Je ontdekt een havenstad vol witte stenen
                      gebouwen, genesteld in een natuurlijke cirkel van
                      kalkstenen kliffen. Het bekendste gebouw van de stad is
                      ongetwijfeld de kathedraal. Aan die kathedraal zijn twee
                      klokkentorens die niet even hoog zijn. Volgens verhalen
                      zou er geen budget meer geweest zijn om de tweede toren af
                      te werken, anderen zeggen dan weer dat de vele
                      aardbevingen ervoor zorgden dat de tweede toren nooit tot
                      de top is gebouwd.
                      <br />
                      <br />
                      Na wat vrije tijd in Kotor, lunchen we aan boord terwijl
                      het schip in de majestueuze baai voor anker ligt. Pas na
                      de lunch varen we terug verder zodat je opnieuw kunt
                      genieten van een prachtige vaart in de baai van Kotor.
                      <br />
                      <br />
                      De rest van de namiddag en avond varen we terug naar waar
                      deze prachtige cruise begon: Dubrovnik in Kroatië.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    Donderdag 4 juni – DUBROVNIK – OOSTENDE/ROESELARE/BRUGGE
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Na een laatste ontbijt aan boord van de Belle de
                      l’Adriatique brengt de bus ons naar de oude stad van
                      Dubrovnik waar u deze voormiddag nog kunt genieten van wat
                      vrije tijd. Nog een souvenirtje kopen, de kabelbaan nemen,
                      op de stadsmuren wandelen of een terrasje met zicht op de
                      azuurblauwe zee, is de ideale afsluiter van een prachtige
                      cruise door Dalmatië. <br />
                      <br />
                      Tegen de middag brengt de bus ons naar de luchthaven van
                      waaruit we in goed twee uur terugkeren naar Oostende.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        {/** Reportage */}
        {/* <div className="text-center my-16" id="reportage">
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
        </div> */}

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
                  Het schip ‘LA BELLE DE L’ADRIATIQUE’
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
              de dekken bedient. De kajuiten op het bovendek en op het
              inschepingsdek hebben grote ramen. Deze op het benedendek hebben
              patrijspoorten. Op het hoofddek bevindt zich het restaurant waar
              alle maaltijden worden geserveerd tijdens de cruise. Op het
              inschepingsdek word je in de salon / bar verwelkomd. Het grote
              zonneterras beschikt over twee jacuzzi’s en ligstoelen.
            </p>
          </div>
          <div className="relative">
            <h2 className="text-xl mt-10 font-bold text-[#162b58]">Kajuiten</h2>
            <p className="text-lg text-[#162b58] mt-4">
              Inrichting : alle kajuiten hebben buitenzicht en zijn uitgerust
              met een douche en WC, satelliet-tv, haardroger, kluis, radio,
              individuele centrale verwarming of airconditioning, 220V
              stopcontacten, wifi.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl mt-10 font-bold text-[#162b58]">
              Faciliteiten aan boord
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Groot salon met dansvloer, eetzaal met bediening, panoramabar met
              TV, bibliotheek en terras, groot zonnedek met bar en restaurant, 2
              jacuzzi’s, ligstoelen, souvenirwinkel, lift, wifi.
              Airconditioning: op het hele schip en in elke kajuit.
            </p>
          </div>
          <div className="relative">
            <h2 className="text-xl mt-10 font-bold text-[#162b58]">
              Een traditionele keuken
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              De chef-kok biedt je een internationale keuken aan met een vleugje
              lokale smaken.
            </p>
          </div>
          <div className="relative">
            <h2 className="text-xl mt-10 font-bold text-[#162b58]">
              De gemeenschappelijke ruimtes
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Het schip beschikt over heel wat aangename plaatsen met respect
              voor ieders privacy.
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
                </div>
              </div>
              <div className="mx-8 mt-10 lg:mx-32">
                <h2 className="text-lg text-[#162b58] font-bold mb-4">
                  Optionele excuries
                </h2>
                <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
                  <li>Dubrovnik €53</li>
                  <li>Nationaal Park van Mljet €56</li>
                  <li>Korcula €31 </li>
                  <li>Trogir €20</li>
                  <li>Split €23</li>
                  <li>Kotor €19</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/** Inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Inbegrepen</h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>Vluchten</li>
            <li>
              De cruise in volpension van het avondmaal van de 1ste dag tot en
              met het ontbijt van de laatste dag
            </li>
            <li>
              Alle dranken aan boord – zowel tijdens de maaltijden, als in de
              bar. Met uitzondering van champagne en dranken van de speciale
              wijnkaart.
            </li>
            <li>Alle excursies vermeld in het programma</li>
            <li>Begeleiding door ons reisteam</li>
            <li>Bijstands-/repatriëringsverzekering</li>
            <li>Reisfilm achteraf (je krijgt een downloadlink toegestuurd)</li>
            <li>Haventaksen</li>
          </ul>
        </div>

        {/** Niet inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="niet-inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Niet inbegrepen
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>Enkele optionele excursies</li>
            <li>Persoonlijke uitgaven</li>
            <li>Dranken van de speciale wijnkaart en champagne</li>
            <li>
              Dranken bij de maaltijden tijdens excursies/ dranken tijdens
              transfers
            </li>
            <li>Annuleringsverzekering/bagageverzekering</li>
          </ul>
        </div>

        {/** Onze troeven */}
        <div className="mx-8 mt-10 lg:mx-32" id="troeven">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Onze troeven
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-4 text-left">
            <li>
              Dit schip werd volledig gecharterd voor de kijkers van Focus & WTV
            </li>
            <li>
              Het is een pakketreis: vluchten, transfers, enkele excursies, en
              vol pension inbegrepen!
            </li>
            <li>
              Alles in je eigen taal. Een reis met je eigen Nederlandstalige
              begeleiders.
            </li>
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
            <li>Je leert nieuwe mensen kennen uit je buurt</li>
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
            Heb je vragen? Wil je graag deze reis boeken? Hiervoor kan je
            terecht bij Claudio, Mirte & Cidjy van CroisiEurope.
            <br />
            <br />
            Dat kan op verschillende manieren: <br /> Via telefoon: Je kunt
            hen elke weekdag bereiken van 9u30 tot 17u30 op het nummer{" "}
            <b>0465/025993</b>. <br /> Mocht de lijn bezet zijn, dan kan je ook
            steeds op het vaste nummer terecht: <b>02/514.21.49</b> <br /> Per
            email op <b>FocusWTV@croisieurope.com</b>
            <br />
            <br />
            Problemen? Je mag steeds een mailtje sturen naar <b>reizen@focus-wtv.be</b>
          </p>
          {/* brochure Button */}
          {/* <div className="mt-3 flex justify-center">
            <a
              href="/assets/brochures/Brochure-Egypte-2025-FocusWTV-19-11-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#162b58] hover:!bg-[#4ab0e1] text-white font-bold py-3 px-6 rounded-xl shadow-xl duration-200 flex items-center gap-2"
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
          </div> */}
        </div>

        {/** Back to alle reizen */}
        <div className="mx-8 mt-10 lg:mx-32">
          <Link
            to="/"
            className="inline-block bg-white px-6 py-3 rounded-lg transition"
          >
            {"<-"}- Terug naar alle reizen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdriatischeCruise;
