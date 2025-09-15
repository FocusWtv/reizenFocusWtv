import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";

const TravelCard = ({ front, back }) => {
  const [card, setCard] = useState({
    showBack: false,
    isFlipping: false,
    flip() {
      setCard((prev) => ({ ...prev, showBack: !prev.showBack, isFlipping: true }));
    },
  });

  // Reset flipping state after transition
  useEffect(() => {
    if (card.isFlipping) {
      const timer = setTimeout(() => {
        setCard(prev => ({ ...prev, isFlipping: false }));
      }, 500); // Half of transition duration
      return () => clearTimeout(timer);
    }
  }, [card.isFlipping]);

  return (
    <button
      type="button"
      onClick={() => card.flip()}
      className="w-full h-96 outline-none [perspective:50rem] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div
        className={cn(
          "relative size-full transition duration-1000 [transform-style:preserve-3d]",
          card.showBack && "[transform:rotateY(180deg)]"
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 size-full [backface-visibility:hidden]",
            card.showBack && !card.isFlipping && "[transform:scaleX(-1)]"
          )}
        >
          {front}
        </div>
        <div className="absolute inset-0 size-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </button>
  );
};

export default TravelCard;
