import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollToTop from "./components/ScrollToTop";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import "./index.css";
import HomePage from "./pages/HomePage";
import Egypte from "./pages/Egypte";
import ZwarteWoud from "./pages/ZwarteWoud";
import ZuidItalie from "./pages/ZuidItalie";
import ZuidAfrika from "./pages/ZuidAfrika";
import Mekong from "./pages/Mekong";
import ZuidFinland from "./pages/ZuidFinland";
import VideoDetailPage from "./pages/VideoDetailPage";

const App = () => {
  const [lenis, setLenis] = useState(null);
  const [useNativeScroll, setUseNativeScroll] = useState(false);

  // Browser detection
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/.test(navigator.userAgent);

  useEffect(() => {
    if (isChrome || isEdge) {
      setUseNativeScroll(true);
      return; // Use native scrolling for Chrome/Edge
    }

    // Initialize Lenis only for Firefox and other browsers
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisInstance.on('scroll', (e) => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    setLenis(lenisInstance);

    return () => {
      gsap.ticker.remove();
      lenisInstance.destroy();
      setLenis(null);
    };
  }, [isChrome, isEdge]);

  useGSAP(() => {
    const elements = gsap.utils.toArray(".reveal-up");
    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "-200 bottom",
          end: "bottom 80%",
          scrub: true,
          refreshPriority: -1,
          invalidateOnRefresh: true,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    });
  }, [lenis, useNativeScroll]);

  return (
    <BrowserRouter>
      <ScrollToTop lenis={lenis} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Egypte" element={<Egypte />} />
        <Route path="/zwarte-woud" element={<ZwarteWoud />} />
        <Route path="/zuiditalie" element={<ZuidItalie />} />
        <Route path="/zuidafrika" element={<ZuidAfrika />} />
        <Route path="/mekong" element={<Mekong />} />
        <Route path="/zuidfinland" element={<ZuidFinland />} />
        <Route path="/video/:id" element={<VideoDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;