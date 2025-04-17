import akrLogo from "../../assets/partners/akr.png";
import asafLogo from "../../assets/partners/asaf-dahan.png";
import leviLogo from "../../assets/partners/levi.png";
import lightLogo from "../../assets/partners/light.png";
import rabinskyLogo from "../../assets/partners/rabinsky.png";
import telAvivLogo from "../../assets/partners/tel-aviv.png";
import zambergLogo from "../../assets/partners/zamberg.png";

import PartnerCard from "../partnerCard/PartnerCard";
import { useState, useRef, useEffect } from "react";

const partners = [
  {
    key: "rabinsky",
    logo: rabinskyLogo,
    paragraph: "אפשרו לנו לאחסן את המיצגים בשטחם באהבה.",
    companyName: "רבינסקי",
  },
  {
    key: "levi",
    logo: leviLogo,
    paragraph:
      "בתרומה גילוונו את המיצגים, כדי שיישמרו לאורך שנים בכל מזג אוויר, ולא יחלידו.",
    companyName: "א.ל. מתכות",
  },
  {
    key: "asaf",
    logo: asafLogo,
    paragraph:
      "תרמו בנדיבות שלטים המצורפים למיצגים – הדפסה מקצועית על לוחות PVC ופרספקס, יצירת מדבקות 3M עמידות, והתקנה על המיצגים.",
    companyName: "אסף דהן",
  },
  {
    key: "akr",
    logo: akrLogo,
    paragraph:
      "תרמו בנדיבות אלמנטים מעוצבים מבטון ששימשו כבסיס ל6 מיצגי הנצחה.",
    companyName: "אקרשטיין",
  },
  {
    key: "light",
    logo: lightLogo,
    paragraph:
      "מהתומכים הראשונים במיזם. סייעו בשרטוט אב-הטיפוס הראשוני של המיצג, ולקחו חלק בהובלה ובהצבה של המיצגים בתל אביב בשנים 2022 ו-2023, בהתנדבות.",
    companyName: "לייט קונקט",
  },
  {
    key: "telAviv",
    logo: telAvivLogo,
    paragraph:
      "העייריה הראשונה שהאמינה בפרויקט, ראתה ערך בחשיבותו, ואיפשרה להציב מיצגים בשטחה בשנים 2022-2024. אנו שואפים להמשיך להציב מיצגים ברחבי תל אביב - גם באופן קבע.",
    companyName: "עיריית תל אביב",
  },
  {
    key: "zamberg",
    logo: zambergLogo,
    paragraph:
      "הפכו רעיון למיצג אמיתי ומרגש – מהעיצוב וההנדסה ועד לייצור ולצביעה של 6 מיצגים, והכל בהתנדבות. תודה מיוחדת לנדב המנכ״ל, וליעל מנהלת הפרויקטים, שהאמינו בפרויקט מהרגע הראשון ודחפו לקידומו בחברה.",
    companyName: "זמברג",
  },
];

function PartnersSection() {
  const [selectedPartnerKey, setSelectedPartnerKey] = useState(null);
  const scrollRef = useRef(null);
  const selectedPartnerRef = useRef(selectedPartnerKey);
  const pausedBySelectionRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const manualScrollRef = useRef(false);
  const manualTimeoutRef = useRef(null);

  useEffect(() => {
    selectedPartnerRef.current = selectedPartnerKey;
  }, [selectedPartnerKey]);

  useEffect(() => {
    if (selectedPartnerKey) {
      pausedBySelectionRef.current = true;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        pausedBySelectionRef.current = false;
      }, 2000);
    } else {
      pausedBySelectionRef.current = false;
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    }
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };
  }, [selectedPartnerKey]);

  const handleSelectedPartner = (key) => {
    setSelectedPartnerKey((prev) => (prev === key ? null : key));
  };

  const selectedPartner = partners.find((p) => p.key === selectedPartnerKey);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(
      window.navigator.userAgent
    );
    const speed = 60;
    let lastTime = null;

    const animate = (time) => {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (
        (!selectedPartnerRef.current || !pausedBySelectionRef.current) &&
        !manualScrollRef.current
      ) {
        el.scrollLeft += (speed * delta) / 1000;
        const cycleWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= cycleWidth) {
          el.scrollLeft -= cycleWidth;
        }
      }
      requestAnimationFrame(animate);
    };

    let touchHandlers = {};
    if (isMobile) {
      touchHandlers.handleTouchStart = () => {
        manualScrollRef.current = true;
        if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
      };
      touchHandlers.handleTouchEnd = () => {
        manualTimeoutRef.current = setTimeout(() => {
          manualScrollRef.current = false;
        }, 1000);
      };

      el.addEventListener("touchstart", touchHandlers.handleTouchStart);
      el.addEventListener("touchend", touchHandlers.handleTouchEnd);
      el.addEventListener("touchcancel", touchHandlers.handleTouchEnd);
    }

    requestAnimationFrame(animate);

    return () => {
      if (isMobile && touchHandlers.handleTouchStart) {
        el.removeEventListener("touchstart", touchHandlers.handleTouchStart);
        el.removeEventListener("touchend", touchHandlers.handleTouchEnd);
        el.removeEventListener("touchcancel", touchHandlers.handleTouchEnd);
        if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
      }
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <div className="partnersContainer">
      <h2>שותפים למיזם</h2>
      <h3>לחצו על לוגו לעוד למידע</h3>
      <div className="logos" ref={scrollRef}>
        {[...partners, ...partners].map(({ key, logo }, index) => (
          <img
            key={`${key}-${index}`}
            src={logo}
            alt={`${key} logo`}
            className={key === selectedPartnerKey ? "selectedPartnerLogo" : ""}
            onClick={() => handleSelectedPartner(key)}
          />
        ))}
      </div>
      <div className="selectedPartner">
        {selectedPartner && (
          <PartnerCard
            companyName={selectedPartner.companyName}
            paragraph={selectedPartner.paragraph}
          />
        )}
      </div>
    </div>
  );
}

export default PartnersSection;
