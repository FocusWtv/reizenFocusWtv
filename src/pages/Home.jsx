import React, { useEffect, useState } from "react";
import TravelCard from "../components/TravelCard";

// Import your new components
import CardFront from "../components/CardFront";
import CardBack from "../components/CardBack";

import { Link } from "react-router-dom";

// Firebase imports
import { db } from "../config/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 p-3 mx-8 lg:mx-32">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 mx-8">
      {events.map(ev => (
        <div key={ev.id} className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm mb-10">
          {ev.slug ? (
            <Link to={`/infoavonden/${ev.slug}`}>
              <img className="w-full h-48 object-cover" src={ev.heroUrl} alt={ev.title} />
            </Link>
          ) : (
            <img className="w-full h-48 object-cover" src={ev.heroUrl} alt={ev.title} />
          )}
          <div className="p-4">
            {ev.slug ? (
              <Link to={`/infoavonden/${ev.slug}`} className="no-underline">
                <h3 className="text-lg font-semibold mb-1 text-[#162b58]">{ev.title}</h3>
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
    <div>
      {/* Onze reizen */}
      <div className="text-center mb-8  mx-8 lg:mx-32">
        <h1 className="text-2xl lg:text-4xl text-[#162b58] font-extrabold text-center">
          Onze Reizen
        </h1>
        <p className="text-center text-[#162b58] mt-2 mx-8">
          Welkom bij Focus & WTV reizen! Klik op een kaart en vind alle info over de reis van uw keuze
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
      <div className="mt-12 mx-4 lg:mx-32">
        <h2 className="text-3xl text-[#162b58] font-bold text-center mt-8">
          Info avonden
        </h2>
        <p className="text-center text-[#162b58] mt-2 mx-8">
          Kom naar onze infoavonden om meer te weten te komen over onze
          reizen!
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
      </div> 
    </div>
  );
};

export default Home;
