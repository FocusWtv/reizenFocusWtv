import React, { useEffect, useState } from "react";
import TravelCard from "../components/TravelCard";

// Import your new components
import CardFront from "../components/CardFront";
import CardBack from "../components/CardBack";

import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"

// Firebase imports
import { db } from "../config/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

// Rest van uw component

const Home = () => {
  const [dynamicCards, setDynamicCards] = useState([]);
  const [dynamicEvents, setDynamicEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Reiskaarten
        const qCards = query(
          collection(db, 'homepage_cards'),
          orderBy('order', 'asc')
        );
        const snapCards = await getDocs(qCards);
        const cards = snapCards.docs.map(d => ({ id: d.id, ...d.data() }))
          .filter(c => c.published === true);
        setDynamicCards(cards);

        // Infoavonden
        const qEvents = query(
          collection(db, 'events'),
          orderBy('order', 'asc')
        );
        const snapEvents = await getDocs(qEvents);
        const events = snapEvents.docs.map(d => ({ id: d.id, ...d.data() }))
          .filter(e => e.published === true);
        setDynamicEvents(events);
      } catch (_e) {
        // fallbacks disabled per request
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const renderCards = (cards) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 p-6 mx-6 lg:mx-32">
      {cards.map((card) => (
        <TravelCard
          key={card.id}
          front={<CardFront image={card.imageUrl} title={card.title} text={card.text} status={card.status} />}
          back={<CardBack text={card.backText} link={`/reizen/${card.slug}`} status={card.status} />}
        />
      ))}
    </div>
  );

  const renderInfoCards = (events) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mx-6 lg:mx-32">
      {events.map(ev => (
        <div key={ev.id} className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-sm mb-2">
          {ev.slug ? (
            <Link to={`/infoavonden/${ev.slug}`} className="w-full cursor-pointer">
              <img className="w-full h-48 object-cover" src={ev.heroUrl} alt={ev.title} />
            </Link>
          ) : (
            <img className="w-full h-48 object-cover" src={ev.heroUrl} alt={ev.title} />
          )}
          <div className="p-4">
            {ev.slug ? (
              <Link to={`/infoavonden/${ev.slug}`} className="no-underline text-left cursor-pointer">
                <h3 className="text-lg font-semibold mb-1 text-[#162b58] hover:text-[#4ab0e1] transition-colors">{ev.title}</h3>
              </Link>
            ) : (
              <h3 className="text-lg font-semibold mb-1 text-[#162b58]">{ev.title}</h3>
            )}
            {ev.dateTime && <p className="text-gray-600">{ev.dateTime}</p>}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white min-h-screen" style={{backgroundColor: 'white'}}>
      {/* Onze reizen: gebruik dit indien nodig voor titel en tekst */}
       <div className="text-center mt-8 mb-8 mx-8 lg:mx-32">
        <h1 className="text-2xl md:text-3xl lg:text-5xl text-[#162b58] font-extrabold text-center">
          Geplande reizen
        </h1>
        <p className="text-center text-lg font-semibold text-[#162b58] mt-2 mx-8">
          Welkom bij <a href="https://focus-wtv.be/reizen" className="text-[#4ab0e1] hover:text-[#162b58] font-semibold underline">Focus & WTV reizen</a>! Klik op een kaart en vind alle info over de reis van uw keuze
        </p>
      </div> 

      {loading ? (
        <div className="text-center text-[#162b58]">Laden...</div>
      ) : (
        dynamicCards.length > 0 ? (
          renderCards(dynamicCards)
        ) : (
          <div className="text-center text-[#162b58] mx-8 lg:mx-32 py-8">Nog geen reizen beschikbaar.</div>
        )
      )}

      {/* Info avonden */}
      <div className="mt-12 mx-2 lg:mx-16">
        <h2 className="text-3xl lg:text-5xl text-[#162b58] font-bold text-center mt-8">
          Infoavonden
        </h2>
        <p className="text-center text-[#162b58] text-md lg:text-lg font-semibold mt-2 mx-8">
          Kom naar onze infoavonden om meer te weten te komen over de reis van uw keuze!<br/>
          Daar worden al uw vragen beantwoord en kunnen we u graag inschrijven voor deze reis!
        </p>
        {/* Info cards */}
        {loading ? (
          <div className="text-center text-[#162b58]">Laden...</div>
        ) : (
          dynamicEvents.length > 0 ? (
            renderInfoCards(dynamicEvents)
          ) : (
            <div className="text-center text-[#162b58] mx-8 lg:mx-32 py-8">Nog geen infoavonden beschikbaar.</div>
          )
        )}
        
        {/* Terug naar officiële site knop */}
        <div className="text-center mt-8 mb-8">
          <a 
            href="https://focus-wtv.be/reizen" 
            className="inline-flex items-center gap-2 mb-8 bg-[#162b58] hover:bg-[#4ab0e1] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Terugblik vorige reizen
          </a>
        </div>
      </div> 
    </div>
  );
};

export default Home;
