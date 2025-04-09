import { Outlet, Link, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronDown } from "react-icons/fa";
import PartnersSection from "../partnersSection/PartnersSection";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Root() {
  const location = useLocation();
  const isHowItStarted = location.pathname === "/how-it-started";

  return (
    <div className="root">
      <div className="fixed-bg" />
      <div className="title">
        <h1>לזכרם</h1>
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
            {isHowItStarted ? "חזרה לחיפוש" : "איך הכל התחיל"}
          </button>
        </Link>
      </div>

      <Outlet />
      <PartnersSection />
    </div>
  );
}
export default Root;
