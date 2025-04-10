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

  const handleSelectedPartner = (key) => {
    setSelectedPartnerKey((prev) => (prev === key ? null : key));
  };

  const selectedPartner = partners.find((p) => p.key === selectedPartnerKey);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 70;
    let lastTime = null;
    let paused = false;
    let timeoutID;

    const animate = (time) => {
      if (lastTime === null) {
        lastTime = time;
      }
      const delta = time - lastTime;
      lastTime = time;

      if (!paused) {
        el.scrollLeft += (speed * delta) / 1000;

        const cycleWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= cycleWidth) {
          el.scrollLeft -= cycleWidth;
        }
      }
      requestAnimationFrame(animate);
    };

    const pauseAutoScroll = () => {
      paused = true;
      clearTimeout(timeoutID);
    };

    const resumeAutoScroll = () => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        paused = false;
        lastTime = null;
      }, 3000);
    };

    el.addEventListener("mousedown", pauseAutoScroll);
    el.addEventListener("touchstart", pauseAutoScroll);
    el.addEventListener("wheel", pauseAutoScroll);
    el.addEventListener("scroll", pauseAutoScroll);

    el.addEventListener("mouseup", resumeAutoScroll);
    el.addEventListener("touchend", resumeAutoScroll);
    el.addEventListener("wheel", resumeAutoScroll);

    requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousedown", pauseAutoScroll);
      el.removeEventListener("touchstart", pauseAutoScroll);
      el.removeEventListener("wheel", pauseAutoScroll);
      el.removeEventListener("scroll", pauseAutoScroll);
      el.removeEventListener("mouseup", resumeAutoScroll);
      el.removeEventListener("touchend", resumeAutoScroll);
      el.removeEventListener("wheel", resumeAutoScroll);
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <div className="partnersContainer">
      <h2>שותפים למיזם</h2>
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
