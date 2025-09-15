import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ lenis }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use setTimeout to ensure this runs after other updates
    const timer = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;