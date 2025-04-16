import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTop = () => {
      const container = document.getElementById("scroll-container");

      if (container) {
        container.scrollTo({ top: 0, behavior: "smooth" });
        container.scrollTop = 0;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    requestAnimationFrame(scrollToTop);

    const timeoutId = setTimeout(scrollToTop, 300);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
