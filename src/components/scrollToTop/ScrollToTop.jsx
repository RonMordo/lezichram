import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const container = document.getElementById("scroll-container");
    if (container) container.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
