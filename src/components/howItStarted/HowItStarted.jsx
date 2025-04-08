import firstImage from "../../assets/firstImg.jpg";
import secondImage from "../../assets/secondImg.png";
import thirdImage from "../../assets/thirdImg.jpg";
import enlargeButton from "../../assets/maximize.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

function HowItStarted() {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleEnlarge = (image) => {
    setEnlargedImage(image);
  };

  const closeModal = () => {
    setEnlargedImage(null);
  };

  return (
    <motion.div
      className="outerContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="howItStartedContainer">
        <div className="contentSection">
          <div className="content">
            <h2>?מה זה חלל</h2>
            <p>
              dasdasdndnjaskndfjkaj
              <br />
              fdasfkdsafksdklffdsasd
              <br />
              asdasdsfjiasdnfjisdanjf
            </p>
          </div>
          <div className="contentImage first">
            <motion.img
              className="firstImage"
              src={firstImage}
              alt="People looking at lezchiram statue"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <button>
              <img
                src={enlargeButton}
                alt="Enlarge button"
                onClick={() => handleEnlarge(firstImage)}
              />
            </button>
          </div>
        </div>
        <div className="contentSection">
          <div className="contentImageLeft">
            <motion.img
              src={secondImage}
              alt="A women looking into the statue which has a father and a child in it"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <button>
              <img
                src={enlargeButton}
                alt="Enlarge button"
                onClick={() => handleEnlarge(secondImage)}
              />
            </button>
          </div>
          <div className="content">
            <h2>הנצחה חדשה</h2>
            <p>
              dasdasdndnjaskndfjkaj
              <br />
              fdasfkdsafksdklffdsasd
              <br />
              asdasdsfjiasdnfjisdanjf
            </p>
          </div>
        </div>
        <div className="contentSection">
          <div className="content">
            <h2>מקום בחיי היומיום</h2>
            <p>
              dasdasdndnjaskndfjkaj
              <br />
              fdasfkdsafksdklffdsasd
              <br />
              asdasdsfjiasdnfjisdanjf
            </p>
          </div>
          <div className="contentImage lastImage">
            <motion.img
              src={thirdImage}
              alt="Instagram profile of lezichram"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <button>
              <img
                src={enlargeButton}
                alt="Enlarge button"
                onClick={() => handleEnlarge(thirdImage)}
              />
            </button>
          </div>
        </div>
      </div>
      {enlargedImage && (
        <div className="imageModal" onClick={closeModal}>
          <img
            src={enlargedImage}
            alt="Enlarged view"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </motion.div>
  );
}
export default HowItStarted;
