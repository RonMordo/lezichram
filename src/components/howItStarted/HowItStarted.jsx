import firstImage from "../../assets/firstImg.webp";
import soldierGif from "../../assets/gif.gif";
import thirdImage from "../../assets/secondImg.webp";
import fourthImage from "../../assets/secondImg1.webp";
import fifthImage from "../../assets/soldierStatue.webp";
import sixthImage from "../../assets/instagramPage.webp";
import seventhImage from "../../assets/soldierPostImage.webp";
import gifVideo from "../../assets/gifVideo.mp4";
import enlargeButton from "../../assets/maximize.svg";
import { PiVideoLight } from "react-icons/pi";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

function FadeImage({ src, alt, className, disableFade = false, ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={{ opacity: disableFade ? 1 : 0 }}
      animate={{ opacity: loaded || disableFade ? 1 : 0 }}
      transition={{ duration: disableFade ? 0 : 0.8, ease: "easeInOut" }}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  );
}

function HowItStarted() {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleEnlarge = (image) => setEnlargedImage(image);
  const openVideo = () => setIsVideoOpen(true);
  const closeVideoModal = () => setIsVideoOpen(false);
  const closeModal = () => setEnlargedImage(null);

  return (
    <motion.div
      className="outerContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="howItStartedContainer">
        <div className="contentSection">
          <div className="content goal">
            <h2>המטרה</h2>
            <p dir="rtl">
              בשנת 2022 הוקם מיזם ״לזכרם״ להנצחת חללי מערכות ישראל ונרצחי פעולות
              האיבה בחיי היומיום באונליין ובאופליין, במטרה לעזור לאנשים, בעיקר
              צעירים, להתחבר ולזכור.
            </p>
          </div>
          <motion.div className="image right" id="firstImage">
            <FadeImage src={firstImage} alt="Lezichram statue" />
            <button
              className="enlargeButton"
              id="firstEnlarge"
              onClick={() => handleEnlarge(firstImage)}
            >
              <img src={enlargeButton} alt="Enlarge" />
            </button>
          </motion.div>
        </div>

        <div className="contentSection gifSection">
          <motion.div className="gif left">
            <FadeImage
              src={soldierGif}
              alt="Soldier life passing inside of his image"
            />
            <button id="videoButton" onClick={openVideo}>
              <PiVideoLight size="2.5rem" />
            </button>
          </motion.div>
          <div className="content">
            <h2>ההשראה</h2>
            <p dir="rtl">
              הרעיון למיזם נולד ביום הזיכרון 2021 כשישבתי עם עצמי ושמעתי שיר
              שנקרא ״Pray”, בפזמון, דמיינתי אמא שכולה, מגיעה למקום שמיימי ופוגשת
              חלל בצורת הגוף של הבן שלה, מושיטה יד כדי לגעת בו וברגע אחד הופך
              החלל לחלון זכרונות ובתוכו רצים רגעים מחייו בצורת פלאשבקים, מהרגע
              שנולד ועד רגע הפרידה מהמשפחה.
            </p>
            <p dir="rtl">(יגל בר - יזם הפרויקט)</p>
          </div>
        </div>

        <div className="contentSection">
          <div className="content whatIs">
            <h2 dir="rtl">מה זה חלל?</h2>
            <p dir="rtl">
              הדמיון הדהד בי חזק וגרם לי לחשוב;
              <br />
              <strong>
                אולי ה- ׳חלל׳ שהותיר הנופל לא ריק. הוא בעצם מלא בזיכרונות ורגעים
                מחיי הנופל, והם אלו שיוצרים את הכאב והגעגוע.
              </strong>
            </p>
          </div>
          <motion.div className="image right">
            <FadeImage
              src={thirdImage}
              alt="Women looking into soldier figure with his life shown"
            />
            <button
              className="enlargeButton"
              id="whatIs"
              onClick={() => handleEnlarge(thirdImage)}
            >
              <img src={enlargeButton} alt="Enlarge" />
            </button>
          </motion.div>
        </div>

        <div className="contentSection">
          <motion.div className="image left double">
            <FadeImage
              src={fourthImage}
              alt="Women touching a soldier figure shows his childhood"
              className="primary"
            />
            <button
              className="enlargeButton"
              id="leftPrimary"
              onClick={() => handleEnlarge(fourthImage)}
            >
              <img src={enlargeButton} alt="Enlarge" />
            </button>

            <FadeImage
              src={fifthImage}
              alt="Lezichram statue"
              className="secondery"
            />
            <button
              className="enlargeButton"
              id="leftSecondery"
              onClick={() => handleEnlarge(fifthImage)}
            >
              <img src={enlargeButton} alt="Enlarge" />
            </button>
          </motion.div>
          <div className="content double">
            <h2>מיצגי הנצחה</h2>
            <p dir="rtl">
              יצרנו מיצגים בדמויות חללים - גוף ריק עם מסגרת בלבד, ופרסנו אותם
              במקומות מרכזיים בארץ כדי שאנשים ילכו ברחוב, ייתקלו בהם ויזכרו.
            </p>
            <p dir="rtl">
              המיצג ממחיש את החוסר, ובו זמנית מסמל תקווה - דרכו משתקפים החיים
              בחוץ שממשיכים בזכות הנופלים; זוגות מטיילים, משפחות, ילדים משחקים.
            </p>
          </div>
        </div>

        <div className="contentSection lastSection">
          <div id="contentLast" className="content">
            <h2>עמוד אינסטגרם</h2>
            <p dir="rtl">
              בנוסף, פתחנו את עמוד האינסטגרם <span>״לזכרם״</span> - עמוד ההנצחה
              המרכזי כיום ברשת, בו יש מאות פוסטים. כל פוסט מוקדש לחלל אחר, ואת
              הפוסטים אנשים משתפים בקלות בסטורי, כדי להגדיל את המודעות ברשת.
            </p>
            <p dir="rtl">(!אלפים שיתפו פוסטים)</p>
          </div>
          <motion.div className="image right double">
            <FadeImage
              src={seventhImage}
              alt="Soldier Instagram post"
              className="secondery"
            />
            <button
              className="enlargeButton"
              id="rightSecondery"
              onClick={() => handleEnlarge(seventhImage)}
            >
              <img src={enlargeButton} alt="Enlarge" />
            </button>

            <FadeImage
              src={sixthImage}
              alt="Lezichram Instagram profile"
              className="primary"
            />
            <button
              className="enlargeButton"
              id="rightPrimary"
              onClick={() => handleEnlarge(sixthImage)}
            >
              <img src={enlargeButton} alt="Enlarge" />
            </button>
          </motion.div>
        </div>

        <div className="quotes">
          <p dir="rtl">
            ״לקחת את המושג ׳חלל׳ שהוא ריק וכלום, והכנסת בו חיים. אתה פשוט הבאת
            את הגאולה״
          </p>
          <p dir="rtl" className="by">
            נאוה, אמו של עמית בן יגאל ז״ל
          </p>
          <p dir="rtl" className="quotes">
            ״זו יוזמה חסרת תקדים, שמתאימה ממש לזמן הזה - נוגעת בצעירים ומאפשרת
            הנצחה בחיי היום-יום״
          </p>
          <p dir="rtl" className="by">
            איריס, אמו של אייל יפרח ז״ל
          </p>
        </div>

        <Link to="/">
          <button>סגירה</button>
        </Link>
      </div>

      {enlargedImage && (
        <div className="imageModal" onClick={closeModal}>
          <div
            className="enlargedImageContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <FadeImage
              src={enlargedImage}
              alt="Enlarged view"
              disableFade={true}
            />
          </div>
        </div>
      )}

      {isVideoOpen && (
        <div className="videoModal" onClick={closeVideoModal}>
          <video
            src={gifVideo}
            controls
            autoPlay
            style={{ maxWidth: "90%", maxHeight: "90%" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </motion.div>
  );
}

export default HowItStarted;
