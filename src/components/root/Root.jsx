// src/components/root/Root.jsx

import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PartnersSection from "../partnersSection/PartnersSection";
import lezichramLogo from "../../assets/lezichramLogo1.webp";
import Gallery from "../gallery/Gallery";
import ContactPage from "../contactPage/ContactPage";
import instagramLogo from "../../assets/instagramLogo1.webp";

function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [activeNav, setActiveNav] = useState(null);

  const isHowItStarted = location.pathname === "/how-it-started";

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    const handleScroll = () => setIsNavFixed(window.scrollY > 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!["/", "/how-it-started"].includes(location.pathname)) {
      setActiveNav(null);
      return;
    }

    const sectionIds = ["title", "contact", "gallery"];
    const handleScrollSpy = () => {
      const trigger = window.scrollY + window.innerHeight / 3;
      let current = null;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= trigger) current = id;
      });

      setActiveNav(current);
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [location.pathname]);

  const handleAnchorClick = (e, anchorId) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => scrollToAnchor(anchorId), 100);
    } else {
      scrollToAnchor(anchorId);
    }
  };

  const scrollToAnchor = (anchorId) => {
    const element = document.getElementById(anchorId);
    if (!element) return;
    const yOffset = -150;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <link rel="preload" as="image" href={lezichramLogo} />
      <div id="scroll-container" className="root">
        <AnimatePresence>
          {showIntro && (
            <motion.div
              key="intro"
              className="intro"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.p
                dir="rtl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 1, delay: 0.5, ease: "easeInOut" },
                }}
              >
                לזכרם
              </motion.p>
              <motion.p
                id="introFirst"
                dir="rtl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 1, delay: 0.5, ease: "easeInOut" },
                }}
              >
                כל עוד מישהו זוכר אותי, אני חי.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {!showIntro && (
          <>
            <div className="fixed-bg" />

            <nav className={`nav ${isNavFixed ? "fixed" : ""}`}>
              <Link
                className="navLink"
                to={isHowItStarted ? "/" : "/how-it-started"}
                style={{
                  color:
                    isHowItStarted && !isNavFixed
                      ? "rgb(255, 166, 0)"
                      : "white",
                }}
              >
                המיזם
              </Link>

              <a
                className="navLink"
                href="#title"
                onClick={(e) => handleAnchorClick(e, "title")}
                style={{
                  color:
                    location.pathname === "/" && activeNav === "title"
                      ? "rgb(255, 166, 0)"
                      : "white",
                }}
              >
                חיפוש חלל
              </a>

              <a
                className="navLink img"
                href="https://www.instagram.com/lezichram_?igsh=a3drdjhremNuMGo="
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagramLogo} alt="Instagram Logo" />
              </a>

              <a
                className="navLink"
                href="#contact"
                onClick={(e) => handleAnchorClick(e, "contact")}
                style={{
                  color: activeNav === "contact" ? "rgb(255, 166, 0)" : "white",
                }}
              >
                דברו איתנו
              </a>

              <a
                className="navLink"
                href="#gallery"
                onClick={(e) => handleAnchorClick(e, "gallery")}
                style={{
                  color: activeNav === "gallery" ? "rgb(255, 166, 0)" : "white",
                }}
              >
                גלריה
              </a>
            </nav>

            <div id="title" className="title">
              <img src={lezichramLogo} alt="Lezichram logo" />
            </div>
            <div className="about">
              <p>הנצחה חדשה לעולם חדש</p>
              <p>המטרה להגדיל את המודעות לנופלים בחיי</p>
              <p>היומיום ולהנגיש את ההנצחה לכולם</p>
            </div>

            <div className="howItStartedButton">
              <Link to={isHowItStarted ? "/" : "/how-it-started"}>
                <button>
                  <motion.span
                    animate={{ rotate: isHowItStarted ? -90 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FaChevronLeft />
                  </motion.span>
                  {isHowItStarted ? "חזרה לחיפוש" : "הכירו את המיזם"}
                </button>
              </Link>
            </div>

            <Outlet />
            <PartnersSection />
            <ContactPage />
            <Gallery />

            <p className="app-credit">
              Developed by Ron Mordukhovich
              <br />© {new Date().getFullYear()} All rights reserved.
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default Root;
