import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollToTop from "./components/ScrollToTop";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import "./index.css";
import { useEffect } from "react";
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

  useEffect(() => {
    const lenisInstance = new Lenis();

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  useGSAP(() => {
    const elements = gsap.utils.toArray(".reveal-up");

    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "-200 bottom",
          end: "bottom 80%",
          scrub: true,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    });
  });

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
