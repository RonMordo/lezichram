import { Outlet, Link, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PartnersSection from "../partnersSection/PartnersSection";
import lezichramLogo from "/lezichramLogo.svg";
import Gallery from "../gallery/Gallery";
import ContactPage from "../contactPage/ContactPage";

function Root() {
  const location = useLocation();
  const isHowItStarted = location.pathname === "/how-it-started";

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
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
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1, delay: 0.5 },
                ease: "easeInOut",
              }}
            >
              לזכרם
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <div className="fixed-bg" />
          <div className="title">
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
  );
}

export default Root;
