import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollToTop from "./components/ScrollToTop";
import { Analytics } from '@vercel/analytics/react';

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
import AdminInstructies from './admin/pages/AdminInstructies';

const App = () => {
  const location = useLocation();

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
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Analytics />
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
          <Route index element={<AdminInstructies />} />
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