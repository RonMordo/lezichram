import { useState, useRef, useEffect } from "react";

import akrLogo from "../../assets/partners/akr.png";
import asafLogo from "../../assets/partners/asaf-dahan.png";
import leviLogo from "../../assets/partners/levi.png";
import lightLogo from "../../assets/partners/light.png";
import rabinskyLogo from "../../assets/partners/rabinsky.png";
import telAvivLogo from "../../assets/partners/tel-aviv.png";
import zambergLogo from "../../assets/partners/zamberg.png";
import gelemLogo from "../../assets/partners/gelem.png";

import PartnerCard from "../partnerCard/PartnerCard";

const partners = [
  {
    key: "rabinsky",
    logo: rabinskyLogo,
    paragraph: "אפשרו לנו לאחסן את המיצגים בשטחם באהבה.",
    companyName: "שיש רבינסקי בע״מ",
  },
  {
    key: "levi",
    logo: leviLogo,
    paragraph:
      "בתרומה גילוונו את המיצגים, כדי שיישמרו לאורך שנים בכל מזג אוויר, ולא יחלידו.",
    companyName: "א.לוי מתכות בע״מ",
  },
  {
    key: "asaf",
    logo: asafLogo,
    paragraph:
      "תרמו בנדיבות שלטים המצורפים למיצגים – הדפסה מקצועית על לוחות PVC ופרספקס, יצירת מדבקות 3M עמידות, והתקנה על המיצגים.",
    companyName: "אסף דהן מדיה",
  },
  {
    key: "akr",
    logo: akrLogo,
    paragraph:
      "תרמו בנדיבות אלמנטים מעוצבים מבטון ששימשו כבסיס ל6 מיצגי הנצחה.",
    companyName: "חברת אקרשטיין",
  },
  {
    key: "light",
    logo: lightLogo,
    paragraph:
      "מהתומכים הראשונים במיזם. סייעו בשרטוט אב-הטיפוס הראשוני של המיצג, ולקחו חלק בהובלה ובהצבה של המיצגים בתל אביב בשנים 2022 ו-2023, בהתנדבות.",
    companyName: "חברת לייט קונקט",
  },
  {
    key: "telAviv",
    logo: telAvivLogo,
    paragraph:
      "העירייה הראשונה שהאמינה בפרויקט, ראתה ערך בחחשיבותו, ואיפשרה להציב מיצגים בשטחה בשנים 2022-2024. אנו שואפים להמשיך להציב מיצגים ברחבי תל אביב - גם באופן קבע.",
    companyName: "עיריית תל אביב",
  },
  {
    key: "zamberg",
    logo: zambergLogo,
    paragraph:
      "הפכו רעיון למיצג אמיתי ומרגש – מהעיצוב וההנדסה ועד לייצור ולצביעה של 6 מיצגים, והכל בהתנדבות. תודה מיוחדת לנדב המנכ״ל, וליעל מנהלת הפרויקטים, שהאמינו בפרויקט מהרגע הראשון ודחפו לקידומו בחברה.",
    companyName: "י׳ זמברג מוצרי מתכת בע״מ",
  },
  {
    key: "gelem",
    logo: gelemLogo,
    paragraph: "תרמו בנדיבות לוחות פח 8ממ מהם הופקו 6 מיצגים.",
    companyName: "גלם מתכות ופלסטיק 2000 בע״מ",
  },
];

export default function PartnersSection() {
  const [selectedPartnerKey, setSelectedPartnerKey] = useState(null);
  const scrollRef = useRef(null);
  const selectedPartnerRef = useRef(selectedPartnerKey);
  const manualScrollRef = useRef(false);
  const manualTimeoutRef = useRef(null);

  useEffect(() => {
    selectedPartnerRef.current = selectedPartnerKey;
  }, [selectedPartnerKey]);

  const handleSelectedPartner = (key, e) => {
    if (manualTimeoutRef.current) {
      clearTimeout(manualTimeoutRef.current);
      manualTimeoutRef.current = null;
    }
    manualScrollRef.current = false;
    setSelectedPartnerKey((prev) => (prev === key ? null : key));
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const speed = 60;
    let lastTime = null;

    const animate = (time) => {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!selectedPartnerRef.current && !manualScrollRef.current) {
        el.scrollLeft += (speed * delta) / 1000;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    if (isMobile) {
      const onTouchStart = () => {
        manualScrollRef.current = true;
        if (manualTimeoutRef.current) {
          clearTimeout(manualTimeoutRef.current);
          manualTimeoutRef.current = null;
        }
      };
      const onTouchEnd = () => {
        manualTimeoutRef.current = setTimeout(() => {
          manualScrollRef.current = false;
          manualTimeoutRef.current = null;
        }, 500);
      };

      el.addEventListener("touchstart", onTouchStart, { passive: true });
      el.addEventListener("touchend", onTouchEnd);
      el.addEventListener("touchcancel", onTouchEnd);

      return () => {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchend", onTouchEnd);
        el.removeEventListener("touchcancel", onTouchEnd);
        if (manualTimeoutRef.current) {
          clearTimeout(manualTimeoutRef.current);
          manualTimeoutRef.current = null;
        }
      };
    }
  }, []);

  const selected = partners.find((p) => p.key === selectedPartnerKey);

  return (
    <div className="partnersContainer">
      <h2>שותפים למיזם</h2>
      <h3>לחצו על לוגו לעוד מידע</h3>

      <div className="logos" ref={scrollRef}>
        {[...partners, ...partners].map(({ key, logo }, i) => (
          <img
            key={`${key}-${i}`}
            src={logo}
            alt={key}
            className={key === selectedPartnerKey ? "selectedPartnerLogo" : ""}
            onClick={(e) => handleSelectedPartner(key, e)}
          />
        ))}
      </div>

      <div className="selectedPartner">
        {selected && (
          <PartnerCard
            companyName={selected.companyName}
            paragraph={selected.paragraph}
          />
        )}
      </div>
    </div>
  );
}
