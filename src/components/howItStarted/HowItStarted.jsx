import firstImage from "../../assets/firstImg.jpg";
import secondImage from "../../assets/secondImg.png";
import thirdImage from "../../assets/thirdImg.jpg";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const shakeTransition = {
  repeat: 1,
  duration: 0.5,
  ease: "easeInOut",
};

const shakeAnimation = {
  rotate: [0, -5, 5, -5, 5, 0],
};

function HowItStarted() {
  return (
    <motion.div
      className="outerContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
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
          <div className="contentImage">
            <motion.img
              src={firstImage}
              alt="People looking at lezchiram statue"
              initial="hidden"
              animate={shakeAnimation}
              transition={shakeTransition}
            />
          </div>
        </div>
        <div className="contentSection">
          <div className="contentImageLeft">
            <motion.img
              src={secondImage}
              alt="A women looking into the statue which has a father and a child in it"
              initial="hidden"
              animate={shakeAnimation}
              transition={shakeTransition}
            />
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
          <div className="contentImage">
            <motion.img
              src={thirdImage}
              alt="Instagram profile of lezichram"
              initial="hidden"
              animate={shakeAnimation}
              transition={shakeTransition}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default HowItStarted;
