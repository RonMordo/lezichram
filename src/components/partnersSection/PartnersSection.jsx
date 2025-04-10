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
    paragraph: "fasdjklfndsajkolfnsjkeod\naskojldnasjdnaosd\nasjkndasjkldljkna",
    companyName: "רבינסקי",
  },
  {
    key: "levi",
    logo: leviLogo,
    paragraph: "fasdjklfndsajkolfnsjkeod\naskojldnasjdnaosd\nasjkndasjkldljkna",
    companyName: "א.ל. מתכות",
  },
  {
    key: "asaf",
    logo: asafLogo,
    paragraph: "fasdjklfndsajkolfnsjkeod\naskojldnasjdnaosd\nasjkndasjkldljkna",
    companyName: "אסף דהן",
  },
  {
    key: "akr",
    logo: akrLogo,
    paragraph: "fasdjklfndsajkolfnsjkeod\naskojldnasjdnaosd\nasjkndasjkldljkna",
    companyName: "אקרשטיין",
  },
  {
    key: "light",
    logo: lightLogo,
    paragraph: "fasdjklfndsajkolfnsjkeod\naskojldnasjdnaosd\nasjkndasjkldljkna",
    companyName: "לייט קונקט",
  },
  {
    key: "telAviv",
    logo: telAvivLogo,
    paragraph: "fasdjklfndsajkolfnsjkeod\naskojldnasjdnaosd\nasjkndasjkldljkna",
    companyName: "עיריית תל אביב",
  },
  {
    key: "zamberg",
    logo: zambergLogo,
    paragraph: "fasdjklfndsajkolfnsjkeod\naskojldnasjdnaosd\nasjkndasjkldljkna",
    companyName: "זמברג",
  },
];

function PartnersSection() {
  const [selectedPartnerKey, setSelectedPartnerKey] = useState(null);
  const scrollRef = useRef(null);
  // This ref reflects the currently selected partner key
  const selectedPartnerRef = useRef(selectedPartnerKey);
  // This ref determines if auto scroll should be paused due to a partner selection
  const pausedBySelectionRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  // Update the selected partner ref whenever state changes.
  useEffect(() => {
    selectedPartnerRef.current = selectedPartnerKey;
  }, [selectedPartnerKey]);

  // When a partner is selected, mark auto scroll as paused and set a 2 sec timer to resume.
  useEffect(() => {
    if (selectedPartnerKey) {
      pausedBySelectionRef.current = true;
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
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
    // Toggle partner selection—clicking again deselects.
    setSelectedPartnerKey((prev) => (prev === key ? null : key));
  };

  const selectedPartner = partners.find((p) => p.key === selectedPartnerKey);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(
      window.navigator.userAgent
    );
    const speed = 60; // using the same speed for mobile and desktop

    let lastTime = null;

    const animate = (time) => {
      if (lastTime === null) {
        lastTime = time;
      }
      const delta = time - lastTime;
      lastTime = time;

      // Update scroll position only if no partner is selected,
      // or if a partner is selected but the 2 sec pause has expired
      if (!selectedPartnerRef.current || !pausedBySelectionRef.current) {
        el.scrollLeft += (speed * delta) / 1000;
        const cycleWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= cycleWidth) {
          el.scrollLeft -= cycleWidth;
        }
      }
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
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
