import akrLogo from "../../assets/partners/akr.png";
import asafLogo from "../../assets/partners/asaf-dahan.png";
import leviLogo from "../../assets/partners/levi.png";
import lightLogo from "../../assets/partners/light.png";
import rabinskyLogo from "../../assets/partners/rabinsky.png";
import telAvivLogo from "../../assets/partners/tel-aviv.png";
import zambergLogo from "../../assets/partners/zamberg.png";

import PartnerCard from "../partnerCard/PartnerCard";
import { useState } from "react";

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

  const handleSelectedPartner = (key) => {
    if (key === selectedPartnerKey) {
      setSelectedPartnerKey(null);
    } else {
      setSelectedPartnerKey(key);
    }
  };

  const selectedPartner = partners.find((p) => p.key === selectedPartnerKey);

  return (
    <div className="partnersContainer">
      <div className="logos">
        {partners.map(({ key, logo }) => (
          <img
            key={key}
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
