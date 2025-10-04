import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollToTop from "./components/ScrollToTop";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import "./index.css";
import Home from "./pages/Home";
import InfoavondDetail from "./pages/InfoavondDetail";
import ReisDetail from "./pages/ReisDetail";

// Admin imports
import AdminLayout from './admin/components/AdminLayout';
import AdminReizen from './admin/pages/AdminReizen';
import AdminHomepage from './admin/pages/AdminHomepage';
import AdminEvents from './admin/pages/AdminEvents';
import AdminLogin from './admin/pages/AdminLogin';
import AdminUsers from './admin/pages/AdminUsers';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminReisForm from './admin/pages/AdminReisForm';

const App = () => {
  const [lenis, setLenis] = useState(null);
  const [useNativeScroll, setUseNativeScroll] = useState(false);
  const location = useLocation();

  // Browser detection
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/.test(navigator.userAgent);

  useEffect(() => {
    // Gebruik native scroll op admin routes (lenis uitschakelen)
    if (location.pathname.startsWith('/admin')) {
      setUseNativeScroll(true);
      return;
    }

    if (isChrome || isEdge) {
      setUseNativeScroll(true);
      return; // Use native scrolling for Chrome/Edge
    }

    // Initialize Lenis only for Firefox and other browsers, and niet op /admin
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
  }, [isChrome, isEdge, location.pathname]);

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
    <>
      <ScrollToTop lenis={lenis} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/infoavonden/:slug" element={<InfoavondDetail />} />
        <Route path="/reizen/:slug" element={<ReisDetail />} />

        {/* Admin login (public) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="reizen" element={<AdminReizen />} />
          <Route path="reizen/new" element={<AdminReisForm />} />
          <Route path="reizen/:id" element={<AdminReisForm />} />
          <Route path="homepage" element={<AdminHomepage />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;