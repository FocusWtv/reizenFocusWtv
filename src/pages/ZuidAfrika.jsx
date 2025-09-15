import { useState } from "react";
import GlobalNavbar from "../components/GlobalNavbar";
import zuidafrika from "../assets/zuidafrika/afrika-1.jpg";
import route from "../assets/zuidafrika/route.jpg";
import boot from "../assets/zuidafrika/ship/boot.jpg";
import BusinessInfoCard from "../components/BusinessInfoCard";
import logo from "../assets/zwartewoud/logo.jpg";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PhotoAlbum from "../components/PhotoAlbum";
import za1 from "../assets/zuidafrika/afrika2.jpg";
import za2 from "../assets/zuidafrika/afrika3.jpg";
import za3 from "../assets/zuidafrika/afrika4.jpg";
import za4 from "../assets/zuidafrika/afrika5.jpg";
import za5 from "../assets/zuidafrika/afrika6.jpg";
import za6 from "../assets/zuidafrika/afrika7.jpg";
import za7 from "../assets/zuidafrika/afrika8.jpg";
import za8 from "../assets/zuidafrika/afrika9.jpg";
import za9 from "../assets/zuidafrika/afrika10.jpg";
import za10 from "../assets/zuidafrika/afrika11.jpg";
import za11 from "../assets/zuidafrika/afrika12.jpg";
import za12 from "../assets/zuidafrika/afrika13.jpg";
import za13 from "../assets/zuidafrika/afrika14.jpg";
import za14 from "../assets/zuidafrika/afrika15.jpg";
import za15 from "../assets/zuidafrika/afrika16.jpg";
import za16 from "../assets/zuidafrika/afrika17.jpg";
import za17 from "../assets/zuidafrika/afrika18.jpg";
import za18 from "../assets/zuidafrika/afrika19.jpg";
import za19 from "../assets/zuidafrika/afrika20.jpg";
import za20 from "../assets/zuidafrika/afrika21.jpg";
import za21 from "../assets/zuidafrika/afrika22.jpg";
import za22 from "../assets/zuidafrika/afrika23.JPG";
import za23 from "../assets/zuidafrika/afrika24.jpg";
import za24 from "../assets/zuidafrika/afrika25.jpg";
import za25 from "../assets/zuidafrika/afrika1.jpeg";

const ZuidAfrika = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const suiteData = [
    {
      name: "Dubbelkajuit zonder balkon",
      color: "bg-orange-400",
      dubbele: "€6.690 p.p.",
      individuele: "€6.690 p.p.",
    },
    {
      name: "Singlekajuit zonder balkon",
      color: "bg-blue-200",
      dubbele: "€8.475 p.p.",
      individuele: "€8.475 p.p.",
    },
    {
      name: "Dubbelkajuit met balkon",
      color: "bg-purple-400",
      dubbele: "€6.925 p.p.",
      individuele: "€6.925 p.p.",
    },
    {
      name: "Singlekajuit met balkon",
      color: "bg-purple-200",
      dubbele: "€8.710 p.p.",
      individuele: "€8.710 p.p.",
    },
  ];

  const zafrikaPhotos = [
    { width: 1600, height: 900, src: za1 },
    { width: 1600, height: 1067, src: za2 },
    { width: 1600, height: 1067, src: za3 },
    { width: 1600, height: 900, src: za4 },
    { width: 1600, height: 900, src: za5 },
    { width: 1600, height: 900, src: za6 },
    { width: 1600, height: 900, src: za7 },
    { width: 1600, height: 900, src: za8 },
    { width: 1600, height: 900, src: za9 },
    { width: 1600, height: 900, src: za10 },
    { width: 1600, height: 900, src: za11 },
    { width: 1600, height: 900, src: za12 },
    { width: 1600, height: 900, src: za13 },
    { width: 1600, height: 900, src: za14 },
    { width: 1600, height: 900, src: za15 },
    { width: 1600, height: 900, src: za16 },
    { width: 1600, height: 900, src: za17 },
    { width: 1600, height: 900, src: za18 },
    { width: 1600, height: 900, src: za19 },
    { width: 1600, height: 900, src: za20 },
    { width: 1600, height: 900, src: za21 },
    { width: 1600, height: 900, src: za22 },
    { width: 1600, height: 900, src: za23 },
    { width: 1600, height: 900, src: za24 },
    { width: 1600, height: 900, src: za25 },
  ];

  return (
    <section>
      <GlobalNavbar />
      <div className="relative" id="home">
        <img
          src={zuidafrika}
          alt={"image"}
          className=" w-full h-96 lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-start items-center p-4">
          {/* White overlay box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md text-center shadow-lg text-black opacity-65 hover:opacity-100 transition-opacity duration-300">
            <p className="text-md font-bold mb-2 tracking-wide">
              Reis naar Zuidelijk Afrika
            </p>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Zuid-Afrika, Namibië, Botswana, Zimbabwe
            </h1>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-2"></div>
          </div>
          {/* brochure Button */}
          <a
            href="/assets/brochures/Brochure-RONDREIS-ZUIDELIJK-AFRIKA.pdf"
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

      {/* Afrika reis */}
      <div className="text-center mb-8" id="intro">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
          Zuid-Afrika, Namibië, Botswana, Zimbabwe
        </h2>
        <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
          <p className="text-lg">
            In 2026 maken we op zes verschillende momenten een reis door
            Zuidelijk Afrika. Je leest er hier alles over!
          </p>
          <h2 className="text-2xl font-bold mt-4">Data reizen: </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-4 text-left">
            <li className="mt-2">Reis 1: Van 01/04 – 11/04/2026</li>
            <li className="mt-2">Reis 2: Van 01/05 – 11/05/2026</li>
            <li className="mt-2">Reis 3: Van 21/06 – 01/07/2026: volzet</li>
            <li className="mt-2">Reis 4: van 01/09 – 11/09/2026*</li>
            <li className="mt-2">Reis 5: Van 28/09 – 08/10/2026*</li>
            <li className="mt-2">Reis 6: Van 03/11 – 13/11/2026*</li>
            <p className="mt-2 italic font-bold">
              * deze afvaarten, prijs per persoon + €200 op basisprijs.
            </p>
          </ul>
          <div>
            <p className="text-lg mt-4">
              In 2026 maken we op verschillende momenten een hele unieke reis
              door het zuiden van Afrika. In kleine groepjes. We starten in de
              grootste stad van Zuid-Afrika – Johannesburg. De financiële
              hoofdstad. Ook wel ‘de stad van goud’ genoemd. Een plek vol
              contrasten. Hier volgen we o.a. het verhaal van Nelson Mandela, en
              zijn strijd tegen het apartheidsregime. Na de ‘grote stad’ gaan we
              voor de ‘volle natuur’. In de Zambezi regio in Namibië. We logeren
              op het eiland Impalila, wat ‘afgelegen plek’ betekent. We bezoeken
              er de verschillende dorpen, en we zitten hier ook vlakbij wat
              bijna een vierlandenpunt is van Botswana, Namibië, Zambia and
              Zimbabwe. Zo kunnen we makkelijk naar het Chobe National park in
              Botswana – wat bekend staat om z’n rijke en afwisselende
              landschappen aan het water, en om de dieren uiteraard. Niets zo
              bijzonder als dieren in hun natuurlijke omgeving te zien. Het doet
              je op een heel andere manier kijken naar de natuur. <br /><br /> We nemen een
              privévliegtuig en volgen verder de Zambezi-rivier richting
              Zimbabwe. Een vlucht – op deze hoogte – geeft je een schitterend
              beeld van de regio, en de krachtige rivier die zich hierdoor een
              weg baant. We varen enkele dagen met ons schip op het Karibameer.
              Met een lengte van 290 km is dit één van de grootste door de mens
              gemaakte stuwmeren ter wereld. We krijgen uiteraard ook de dam te
              zien, en we komen erachter van waar al die ‘versteende bomen’ in
              het meer komen. Het is ontzettend mooi hier, en stil. Soms zie je
              meer nijlpaarden dan mensen. Een rust die je dicht bij de dieren
              brengt. <br /><br />We verkennen in Zimbabwe ook het Matusadona National Park
              en we verbazen ons – net als ontdekkingsreiziger David Livingstone
              – over de kracht, de omvang en de schoonheid van de Victoria
              Watervallen.
            </p>
          </div>
        </div>

        {/** Info Avond */}
        <div className="text-center mb-8" id="infoavond">
          <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mb-8">
            Infoavond
          </h2>
          <div className="text-center text-[#162b58] mt-2 mx-8 lg:mx-32">
            <p className="text-lg">
              Op dinsdag 23 september organiseren wij een infoavond in De Spil
              (adres: Hippoliet Spilleboutdreef 1, Roeselare).
            </p>
            <a
              class="group mt-10 relative inline-block text-sm font-medium text-[#162b58] focus:ring-3 focus:outline-hidden"
              href="https://focus-wtv.be/reizen/afrikareis-infoavond"
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
                    DAG 1 – BRUSSEL -{">"} JOHANNESBURG (Zuid-Afrika)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      We vliegen met een nachtvlucht vanuit Zaventem naar
                      Johannesburg, waar we de volgende ochtend aankomen.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DAG 2 – JOHANNESBURG (Zuid-Afrika)
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md">
                        Na aankomst genieten we van het ontbijt. We nemen de
                        ochtend vrij om even te acclimatiseren. We lunchen in
                        het hotel, en in de namiddag trekken we deze grootste
                        stad van Zuid-Afrika in. De financiële hoofdstad. Ook
                        wel ‘de stad van goud’ genoemd. Een plek vol contrasten.
                        Die ons meteen ook doet denken aan Nelson Mandela, en
                        zijn strijd tegen het apartheidsregime. Daar gaan we ons
                        verder in verdiepen, met een bezoek aan het museum van
                        de Apartheid – over de rassenscheiding in Zuid-Afrika en
                        het huidige Namibië tussen 1948 en 1994. Het museum is 7
                        ha, je volgt een multimediale toer door de geschiedenis.
                        Het begint al bij de aparte ingangen voor blanken en
                        niet-blanken. Per ras volg je een andere weg door het
                        museum. En zo maak je een reis door de tijd. (Het museum
                        is geopend van woensdag tot zondag. Als u Johannesburg
                        op maandag bezoekt, wordt dit bezoek vervangen door het
                        Mandela House. Op dinsdag wordt het vervangen door het
                        Hector Pieterson Museum). Na een bezoek aan het museum
                        maken we een panoramische rondrit door de stad.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DAG 3 - JOHANNESBURG - KASANE - verblijf in de LODGE
                    (Zuid-Afrika-Botswana- Namibië)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      We verlaten de stad, en Zuid-Afrika, en gaan voor de volle
                      natuur…. We vliegen van Johannesburg naar ‘Kasane’ in het
                      uiterste noordoosten van Botswana. Kasane ligt vlakbij de
                      grens met Zambia, Zimbabwe en Namibië. Logeren doen we in
                      een 5-sterren-lodge op het Impalila eiland, wat ‘afgelegen
                      plek’ betekent – we zitten dan ook in het uiterste puntje
                      van Namibië. In een privébootje varen we daarnaar toe. De
                      rust overvalt je meteen. Het is stil als we hier varen. De
                      landschappen zijn zo mooi, het is een spel van de wolken
                      in het water, en het is ontdekken ook dat onze komst niet
                      onopgemerkt blijft. Onderweg zie je verschillende soorten
                      vogels die deze overstroomde vlakten bevolken, en
                      misschien krijg je meteen ook al één van de vele
                      nijlpaarden te zien, of een familie krokodillen die liggen
                      te luieren op de oevers. We worden hartelijk ontvangen in
                      de lodge. Op deze plek zou avonturier en
                      ontdekkingsreiziger Livingstone vaak gelogeerd hebben –
                      hier aan de 700 jaar oude Baobab boom. <br />
                      <br />
                      Elke lodge heeft uitzicht over de rivier, en je beschikt
                      over een eigen terras en zwembad. We overlopen samen met
                      de reisbegeleider de komende dagen, genieten van een
                      drankje en een uitgebreid diner.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DAG 4 - Nationaal Park Chobe (Namibië-Botswana)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Het eiland Impalila wordt omgeven aan de ene kant door de
                      Zambezi, en aan de andere kant door de Chobe rivier. We
                      zitten vlakbij wat bijna een vierlandenpunt is van
                      Botswana, Namibië, Zambia and Zimbabwe. Makkelijk dus om
                      naar Botswana te gaan, naar het Chobe National park – wat
                      bekend staat om z’n rijke en afwisselende landschappen aan
                      het water, en de dieren, uiteraard. ’s Morgens vroeg
                      rijden we met een 4x4 door dit park, dat meer dan een
                      kwart van de totale populatie van de Afrikaanse olifant
                      huisvest. Je hoort er ook meer over de impala’s – en hoe
                      ze in groep leven. Wij zagen er ook giraffen, gieren,
                      bavianen,… en zelfs een leeuw. Maar vooral - de ‘rangers’
                      van het park zorgen voor duiding en uitleg. Dankzij hen
                      leer je op een andere manier te kijken naar de natuur. Je
                      let op de kleine dingen, op de sporen in het zand, op de
                      drollen ook, op de planten en het groen, en de reacties
                      van dieren. ‘Kijken’ is tijd nemen. Je leert ‘anders te
                      kijken’. En dat is een ervaring die bijblijft. <br />{" "}
                      <br />
                      Op een open plek – onder een grote boom – zorgen we voor
                      een Afrikaanse lunch in de natuur. Na het eten ruilen we
                      de jeeps in voor een privébootje langs de Chobe-rivier tot
                      aan de moerassen van Sedudu Island. We genieten van het
                      diner samen in de lodge, waar we ook overnachten.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DAG 5 – IMPALILA-EILAND (NAMIBIË)
                  </summary>
                  <div className="p-4 border-t">
                    <div>
                      <p className="text-md">
                        Vanmorgen gaan we te voet naar een paar van de 36 dorpen
                        op Impalila-eiland. Ieder dorp heeft zo’n 70-tal
                        bewoners, en is ontstaan uit een familie die zich daar
                        gevestigd heeft. We horen meer over de traditionele
                        woningen, de lokale leefwijze en gebruiken. We komen
                        voorbij de school en het ziekenhuis. En uiteraard is er
                        ook dans & muziek – zo belangrijk in deze cultuur. We
                        lunchen in onze lodge, en in de namiddag kan je kiezen
                        voor één van de volgende activiteiten. - Vrije tijd en
                        ontspanning in de lodge, waar je kunt genieten van je
                        privézwembad en de comfortabele voorzieningen. -
                        Verkenning van de Zambeze rivier in privébootje.
                        <br /> <br />
                        We dineren samen in de lodge, en de avond wordt
                        afgesloten met het vertellen van verhalen over de
                        tradities van de bewoners van dit eiland, vertelt door
                        onze gids.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DAG 6 - Karibameer – aan boord van de ZIMBABWEAN DREAM
                    (Namibië-Botswana-Zimbabwe)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      We vertrekken van de lodge en maken tijd voor een laatste
                      watersafari in de streek van het Nationaal Park Chobe. We
                      lunchen langs het water, en vertrekken dan naar de
                      luchthaven van Kasane, waar we een privévliegtuig nemen
                      naar ‘Kariba’ in Zimbabwe. Deze anderhalf uur durende
                      vlucht is een bijzondere excursie an sich! Met dit kleine
                      vliegtuig vlieg je op de perfecte hoogte om alles te zien.
                      Je ontdekt de veranderende panorama’s van de savanne, die
                      krachtige Zambezi rivier, en de sublieme uitzichtpunten op
                      het Karibameer. <br />
                      <br />
                      Bij aankomst gaan we naar ons schip, en starten we een
                      cruise op het Karibameer. Met een lengte van 290 km is dit
                      één van de grootste door de mens gemaakte stuwmeren ter
                      wereld. Dit meer ontstond in 1955 als gevolg van de bouw
                      van de Kariba stuwdam – voor de productie van
                      elektriciteit. De bomen die tevoor in de landschap
                      stonden, staan nu ‘versteend’ in het water – dat geeft
                      deze plek een heel bijzonder uitzicht.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DAG 7 - KARIBAMEER - SPURWING EILAND (Zimbabwe)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Bij zonsopgang varen we langs symbolische en
                      sprookjesachtige landschappen van het Karibameer: de
                      silhouetten van de dode bomen die boven het water
                      uitsteken, weerspiegelen zich in het water en verlenen een
                      mysterieuze sfeer aan het meer. We verkennen in een
                      privébootje de kleine rivieren die door het Matusadona
                      National Park kronkelen en de diersoorten die ze
                      herbergen. De meanders, de grote bochten en de kleine
                      wilde kreken van deze rivier dompelen je helemaal onder in
                      een feeërieke sfeer. Het is stil op dit meer. Wij zagen er
                      meer nijlpaarden en krokodillen dan mensen… We lunchen aan
                      boord, en in de namiddag varen we naar Palm Bay. En als
                      het licht magisch wordt, varen we uit om de met roze
                      getinte lucht te bewonderen, en te aperitieven op het
                      water. Aansluitend wacht een uitgebreid diner op ons aan
                      boord van ons schip.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DAG 8 - KARIBAMEER - NATIONAAL PARK VAN MATUSADONA
                    (Zimbabwe)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Ochtendsafari om kennis te maken met het gebied in het
                      Nationaal Park van Matusadona, tussen de rivieren Sanyati
                      en Ume gelegen. Dit wilde territorium, met een oppervlakte
                      van meer dan 1.400 km², vormt de thuishaven van heel wat
                      diersoorten zoals olifanten, nijlpaarden, krokodillen,
                      buffels, maar ook duizenden vogels zoals de mythische
                      Afrikaanse zeearend, de majestueuze geelbekooievaars of de
                      zwarte zilverreiger met zijn verbazingwekkende
                      vistechniek. En als het geluk ons toelacht te midden van
                      de savanne, dan kruist een katachtige misschien ons pad.
                      De geschiedenis van het park hangt samen met die van het
                      meer: toen het water steeg tijdens de bouwwerken van de
                      stuwdam, werden vele duizenden dieren in veiligheid
                      gebracht in Matusadona, waar het formeel verboden is om te
                      jagen. Dat was de gigantische „Operatie Noah“, waarbij
                      onder meer grote zoogdieren, roofdieren en impala‘s werden
                      gered. In de namiddag genieten we van het varen, en we
                      vertellen je meer over de geschiedenis van het meer, de
                      inwoners en het ecosysteem. We dineren ’s avonds aan
                      boord.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DAG 9 – KARIBAMEER - Victoria Falls (Zimbabwe)
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Bij zonsopgang varen we verder richting Kariba. We
                      ontschepen, en rijden richting luchthaven. Onderweg
                      stoppen we bij de "dam wall", de gigantische dam die het
                      meer in 1955 heeft gecreëerd en die vandaag 70% van de
                      elektriciteit van Zimbabwe afgeeft. We vertellen je de
                      geschiedenis van de dam, en de legendes eromheen, zoals
                      het verhaal van van NyamiNyami, de geest van de rivier. We
                      vliegen – met een privévliegtuig - van Kariba naar de
                      Victoria watervallen. ’s Middags maken we een cruiselunch
                      op de Zambeze boven de waterval. <br /> <br />
                      In de namiddag ben je vrij. Je kunt kiezen uit de volgende
                      activiteiten - Je kunt genieten van wat ontspanning aan
                      het hotelzwembad en het uitzicht op de omliggende savanne.
                      - Optioneel: Helikoptervlucht boven de Victoriawatervallen
                      (245 EUR per persoon). - Optioneel: Een unieke kans voor
                      een laatste safari door de ongerepte landschappen van een
                      privéreservaat! Ga in een comfortabele 4x4 op zoek naar de
                      zwarte neushoorn van Afrika, onder begeleiding van een
                      ervaren ranger. Met wat geluk spot u ook de andere
                      legendarische leden van de “Big Five” (leeuw, olifant,
                      buffel, luipaard), en een indrukwekkende verscheidenheid
                      aan vogelsoorten. (Excursies zijn compatibel en vinden na
                      elkaar plaats. Te reserveren bij inschrijving. De safari
                      wordt privé aangeboden aan CroisiEurope-passagiers vanaf 6
                      ingeschreven deelnemers. Bij minder inschrijvingen kunnen
                      zij deelnemen samen met andere klanten. In beide gevallen
                      is onze lokale gids aanwezig om hen te begeleiden.) (169
                      EUR per persoon). We dineren en overnachten in een
                      viersterrenhotel.
                    </p>
                  </div>
                </details>
              </div>

              <div className="w-full text-[#162b58] space-y-4">
                <details className="border rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer text-left">
                    DAG 10 – VICTORIA FALLS - BRUSSEL
                  </summary>
                  <div className="p-4 border-t">
                    <p className="text-md">
                      Na een uitgebreid ontbijt in ons hotel, wandelen we langs
                      de Victoriawatervallen: de vele uitzichtpunten hier
                      behoren tot de meest uitzonderlijke van onze planeet: de
                      Zambezerivier mondt hier uit in de grootste waterval ter
                      wereld op meer dan 108 m hoogte, een spektakel dat
                      oorspronkelijk „de dampende rook“ werd genoemd maar door
                      David Livingstone werd omgedoopt tot de „Victoria Falls“.{" "}
                      <br />
                      <br />
                      Na de excursie vliegen we terug naar Johannesburg/Brussel
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
                src="https://player.clevercast.com/?account_id=VzaPKg&item_id=WdPq0N"
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
                  HET SCHIP 'Zimbabwean Dream'
                </h1>
                <div className="w-12 sm:w-16 h-px bg-[#162b58] mx-auto mb-2"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <p className="text-lg text-[#162b58] mt-10">
              De Zimbabwean Dream, gebouwd in 2020, is een van de pareltjes van
              CroisiEurope en beschikt over een zeer smaakvolle inrichting. Een
              combinatie van elegantie en exotisme, comfort en ver­fijning. Het
              is een 5-anker schip, van slechts 33 m lang en 8 m breed, dat
              vaart op Karibameer. Het schip kan 16 passagiers, in 8 kajuiten
              van 17 m² verwelkomen.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Kajuiten
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              De kajuiten hebben een Frans balkon (twee van hen hebben een eigen
              balkon). Zijn grote ruimtes en grote ramen geven het schip een
              ruimtelijk gevoel. Het edele hout van zijn materialen en de
              stoffen versierd met lokale motieven zijn in perfecte harmonie met
              de prachtige landschappen die het schip doorkruist.
            </p>
          </div>

          <div className="relative">
            <h2 className="text-xl italic mt-10 font-bold text-[#162b58]">
              Faciliteiten aan boord
            </h2>
            <p className="text-lg text-[#162b58] mt-4">
              Op het bovendek is een klein zwembad, het restaurant, en de
              salon/bar. Het zonnedek is een ideale plek om te ontspannen en te
              genieten van de prachtige plekken van Zuidelijk Afrika, een van de
              meest mooie plekken in de wereld.
            </p>
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
              <div>
                <p className="text-lg font-bold text-[#162b58] mt-4 italic">
                  Prijs van de afvaarten 01/09, 28/09 en 03/11/2026 zijn €200
                  per persoon extra bij basisprijs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/** Inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Inbegrepen</h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>Vluchten en transfers vanuit Brussel (heen en terug)</li>
            <li>Lijnvlucht Johannesburg/Kasane</li>
            <li>Privévlucht Kasane/Kariba/Victoria Falls</li>
            <li>De luchthaventaksen (150€ - tarief 2023)</li>
            <li>
              De cruise met verblijf in een tweepersoonskajuit volgens de
              gekozen categorie - verblijf in een tweepersoonskamer in de lodge
              CroisiEurope van eerste categorie en in 4*en 5* hotels LN
            </li>
            <li>
              Volpension tijdens de safari-cruise - dranken inbegrepen bij elke
              maaltijd en aan de bar op het schip en in de lodge CroisiEurope -
              in Johannesburg en Victoria Falls, dranken inbegrepen: 1 water, 1
              glas lokaal wijn* of 1 frisdrank of 1 lokale bier* + 1 thee of
              koffie per persoon en per maaltijd
            </li>
            <li>Bezoeken en excursies zoals vermeld in het programma</li>
            <li>Bijstands- en repatriëringsverzekering</li>
            <li>
              Fooien: om het verblijf te vergemakkelijken, omvatten onze prijzen
              fooien volledig betaald aan het personeel van het land van
              bestemming (met uitzondering van het personeel van het schip en
              van de lodge) voor een bedrag van €20 TTC, door ons bepaald op
              basis van douane en lokale gebruiken.
            </li>
            <li>Begeleiding door onze reisbegeleider</li>
          </ul>
        </div>

        {/** Niet inbegrepen */}
        <div className="mx-8 mt-10 lg:mx-32" id="niet-inbegrepen">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">
            Niet inbegrepen
          </h2>
          <ul className="list-disc pl-6 text-lg text-[#162b58] space-y-2 text-left">
            <li>Annuleringsverzekering / bagageverzekering</li>
            <li>Zimbabwaans visum (30 $US tot op heden, ter plaatse regelen in $US)</li>
            <li>
              Optionele excursie (helikoptervlucht)
            </li>
            <li>Ae toeristenbelasting in Botswana (30 US$ ter plaatse regelen in $US)</li>
            <li>De fooien voor het personeel van het schip en van de lodge (indien gewenst)</li>
            <li>Het Namibische visum €100 per persoon</li>
            <li>Persoonlijke uitgaven.</li>
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
              We reizen ter plaatse met privévliegtuigen.
            </li>
            <li>De enorme kleinschaligheid van deze reis, en de keuze voor heel wat plaatsen waar nog weinig andere reizigers komen.</li>
            <li>Het is een pakketreis: vluchten, transfers, enkele excursies, en vol pension inbegrepen!</li>
            <li>Gratis Wifi aan boord</li>
            <li>
              Je wordt begeleid door onze eigen Nederlandstalige reisbegeleider
            </li>
          </ul>
        </div>

        {/** Gallerij  */}
        <div className="mx-8 mt-10 lg:mx-32" id="fotos">
          <h2 className="text-3xl text-[#162b58] font-bold mb-4">Foto's</h2>
          <div className="mt-8 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <PhotoAlbum photos={zafrikaPhotos} />
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

export default ZuidAfrika;
