import React from "react";
import GlobalNavbar from "../components/GlobalNavbar";
import Hero from "../components/Hero";
import TravelCard from "../components/TravelCard";

// Import your new components
import CardFront from "../components/CardFront";
import CardBack from "../components/CardBack";

// Import your images
import image1 from "../assets/egypte/egypte.jpg";
import image2 from "../assets/zwartewoud.jpeg";
import image3 from "../assets/zuiditalie.jpg";
import image4 from "../assets/afrika.jpg";
import image5 from "../assets/Mekong.jpeg";
import image6 from "../assets/Finland.jpg";

import { Link } from "react-router-dom";
import { videos } from "../data/videos";

const cardsData = [
  {
    front: (
      <CardFront
        image={image1}
        title="Egyptereis"
        text=" 29 november tot 9 december 2025"
        status="volzet"
      />
    ),
    back: (
      <CardBack
        text="In november 2025 maken we een onvergetelijke reis naar Egypte! Klik op de knop voor meer info!"
        link="/egypte"
        status="volzet"
      />
    ),
  },
  {
    front: (
      <CardFront
        image={image2}
        title="Kerst in de Elzas & het Zwarte Woud"
        text="14 tot 17 december 2025"
        status="volzet"
      />
    ),
    back: (
      <CardBack
        text="We gaan naar de mooiste kerstmarkt van Duitsland - in Freiburg! Klik op de knop voor meer info!"
        link="/zwarte-woud"
        status="volzet"
      />
    ),
  },
  {
    front: (
      <CardFront
        image={image3}
        title="Nieuwsjaarscruise Zuid-Italië"
        text="26 december tot 2 januari 2026"
        status="beperkt"
      />
    ),
    back: (
      <CardBack
        text="We maken opnieuw een Nieuwjaarscruize richting Zuid-Italië! Klik op de knop voor meer info!"
        link="/zuiditalie"
        status="beperkt"
      />
    ),
  },
  {
    front: (
      <CardFront
        image={image4}
        title="Reis Zuidelijk Afrika"
        text="In 2026 op 5 verschillende momenten!"
        status="open"
      />
    ),
    back: (
      <CardBack
        text="We gaan op reis naar Zuidelijk Afrika (Zuid-Afrika, Namibïe, Botswana, Zimbabwe). Klik op de knop voor meer info!"
        link="/zuidafrika"
        status="open"
      />
    ),
  },
  {
    front: (
      <CardFront
        image={image5}
        title="Mekong cruise"
        text="5 tot 17 maart 2026"
        status="open"
      />
    ),
    back: (
      <CardBack
        text="We gaan op cruize op de Mekong, reis naar Cambodja/Vietnam! Klik op de knop voor meer info!"
        link="/mekong"
        status="open"
      />
    ),
  },
  {
    front: (
      <CardFront
        image={image6}
        title="Midzomer Zuid-Finland"
        text="17 tot 24 juni 2026"
        status="open"
      />
    ),
    back: (
      <CardBack
        text="In Juni 2026 maken we een rondreis in Zuid-Finland en vieren we samen Midzomer! Klik op de knop voor meer info!"
        link="/zuidfinland"
        status="open"
      />
    ),
  },
];

const HomePage = () => {
  return (
    <div>
      <GlobalNavbar />
      <Hero />
      {/* Onze reizen */}
      <div className="text-center mb-8  mx-8 lg:mx-32">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8">
          Onze Reizen
        </h2>
        <p className="text-center text-[#162b58] mt-2 mx-8">
          Klik op een kaart om meer te weten te komen over de reis!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 p-3 mx-8 lg:mx-32">
        {cardsData.map((card, index) => (
          <TravelCard key={index} front={card.front} back={card.back} />
        ))}
      </div>

      {/* Info avonden */}
      <div className="mt-12 mx-8 lg:mx-32">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8">
          Info avonden
        </h2>
        <p className="text-center text-[#162b58] mt-2 mx-8">
          Kom naar een van onze infoavonden om meer te weten te komen over onze
          reizen!
        </p>
        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 p-3 mx-8">
          <div class="w-full max-w-sm bg-[#162b58] border border-gray-200 rounded-lg shadow-2xl [perspective:50rem] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <a href="https://focus-wtv.be/reizen/afrikareis-infoavond">
              <img
                className="w-full h-48 border-4 border-[#162b58] rounded-md p-3 object-cover"
                src={image4}
                alt="Zuid-Afrika"
              />
            </a>
            <div class="px-5 pb-5">
              <h2 class="text-xl font-bold tracking-tight text-white">
                Reis naar Zuid-Afrika: dinsdag 23 september
              </h2>
            </div>
          </div>
          <div class="w-full max-w-sm bg-[#162b58] border border-gray-200 rounded-lg shadow-2xl [perspective:50rem] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <a href="https://focus-wtv.be/reizen/mekongcruise-infoavond">
              <img
                className="w-full h-48 border-4 border-[#162b58] rounded-md p-3 object-cover"
                src={image5}
                alt="Zuid-Italië"
              />
            </a>
            <div class="px-5 pb-5">
              <h2 class="text-xl font-bold tracking-tight text-white">
                Cruise op de Mekong: woensdag 8 oktober
              </h2>
            </div>
          </div>
          <div class="w-full max-w-sm bg-[#162b58] border border-gray-200 rounded-lg shadow-2xl [perspective:50rem] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <a href="https://focus-wtv.be/reizen/finland-2026-infoavond">
              <img
                className="w-full h-48 border-4 border-[#162b58] rounded-md p-3 object-cover"
                src={image6}
                alt="Zuid-Finland"
              />
            </a>
            <div class="px-5 pb-5">
              <h2 class="text-xl font-bold tracking-tight text-white">
                Reis Zuid-Finland: woensdag 3 december
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Terugblik vorige reizen */}
      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8 mx-8">
          Terugblik op vorige reizen
        </h2>
        <p className="text-center text-[#162b58] mt-2 mx-8">
          Bekijk enkele hoogtepunten van onze vorige reizen!
        </p>
        {/* Video cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-3 p-3 mx-8 lg:mx-32">
          {videos.map((video) => (
            <Link
              to={`/video/${video.id}`}
              key={video.id}
              className="w-full max-w-sm bg-white border-4 border-orange-500 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl no-underline"
            >
              <h3 className="text-lg font-bold tracking-tight text-[#162b58] p-2">
                {video.title}
              </h3>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  src={video.src}
                  className="absolute inset-0 w-full h-full pointer-events-none" // pointer-events-none makes the whole card clickable
                  allow="autoplay; fullscreen"
                  title={video.title}
                ></iframe>
              </div>
              <p className="text-md text-[#162b58] p-2 font-semibold">
                {video.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
