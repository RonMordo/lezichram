import one from "../../assets/galleryImages/first.webp";
import two from "../../assets/galleryImages/second.webp";
import three from "../../assets/galleryImages/three.webp";
import four from "../../assets/galleryImages/four.webp";
import gif from "../../assets/galleryImages/statueGif.mp4";
import six from "../../assets/galleryImages/six.webp";
import seven from "../../assets/galleryImages/7.webp";
import eight from "../../assets/galleryImages/secondGif.mp4";
import nine from "../../assets/galleryImages/9.webp";
import ten from "../../assets/galleryImages/10.webp";
import eleven from "../../assets/galleryImages/11.webp";
import twelve from "../../assets/galleryImages/12.webp";
import thirteen from "../../assets/galleryImages/13.webp";
import fourteen from "../../assets/galleryImages/14.webp";
import fifteen from "../../assets/galleryImages/15.webp";
import sixteen from "../../assets/galleryImages/16.webp";
import seventeen from "../../assets/galleryImages/17.webp";
import eighteen from "../../assets/galleryImages/18.webp";
import nineteen from "../../assets/galleryImages/19.webp";
import twenty from "../../assets/galleryImages/20.webp";
import twentyone from "../../assets/galleryImages/21.webp";
import twentytwo from "../../assets/galleryImages/22.webp";
import twentythree from "../../assets/galleryImages/23.webp";
import twentyfour from "../../assets/galleryImages/24.webp";
import twentyfive from "../../assets/galleryImages/25.webp";
import twentysix from "../../assets/galleryImages/26.webp";
import video from "../../assets/gifVideo.mp4";
import { ImEnlarge } from "react-icons/im";
import { useState } from "react";

function Gallery() {
  const images = [
    {
      src: one,
      description:
        "מיצג ברחבת הבימה ת״א, ודגל ישראל שמשתקף דרכו (תמונה מיום הזיכרון 2024)",
    },
    {
      src: two,
      description:
        "אנשים מתאספים ליד המיצג כדי לחוות מקרוב (תמונה מיום הזיכרון 2022)",
    },
    { src: three, description: "השרטוט הראשון של המיצג" },
    { src: four, description: "תהליך יצירת הפוסטים הראשונים באפריל 2022" },
    { src: gif, description: "מיצג בכיכר דיזינגוף (תמונה מיום הזיכרון 2024)" },
    { src: six, description: "עמוד אינסטגרם" },
    { src: seven, description: "מיצג בגן צ׳רלוס קלור ת״א (מיום הזיכרון 2022)" },
    {
      src: eight,
      description: "ההשראה לפרויקט לזכרם. חלון זכרונות בצורת גוף של נופל...",
    },
    { src: nine, description: "" },
    {
      src: ten,
      description:
        "זוג משתקף דרך המיצג כמעין המחשה לחיים שממשיכים בזכות הנופלים",
    },
    { src: eleven, description: "לוח ומדבקות שמותקנים על המיצג" },
    {
      src: twelve,
      description: "שקיעה בטיילת ת״א שמשתקפת דרך המיצג (תמונה ממאי 2024)",
    },
    {
      src: thirteen,
      description:
        "בחורה מצלמת את המיצג בדיזינגוף תל אביב (תמונה מיום הזיכרון 2022)",
    },
    {
      src: fourteen,
      description: "מיצג הנצחה ברחבת שרונה מרקט (תמונה מיום הזיכרון 2022)",
    },
    {
      src: fifteen,
      description:
        "עוברת אורח סורקת את הברקוד שעל המיצג ברחבת עזריאלי ת״א (מיום הזיכרון 2022)",
    },
    {
      src: sixteen,
      description: "איסוף המיצגים מהמפעל של חברת י׳ זמברג לתל אביב",
    },
    { src: seventeen, description: "ילדות מסתכלות על המיצג בדיזינגוף ת״א" },
    { src: eighteen, description: "אנשים מתאספים סביב המיצג" },
    {
      src: nineteen,
      description: "השלט שמחובר למיצג ״במקום בו היית נותר חלל״",
    },
    {
      src: twenty,
      description:
        "התקנת מיצג ברחבת הבימה ת״א בשעות הקטנות של הלילה (תמונה מיום הזיכרון 2024)",
    },
    {
      src: twentyone,
      description: "מאחורי הקלעים התקנת מיצגי הנצחה בת״א לפני יום הזיכרון 2024",
    },
    { src: twentytwo, description: "מיצג - ילדים קופצים בטבע" },
    {
      src: twentythree,
      description: "מיצג בדיזינגוף ת״א, זוג מסתכלים וסורקים את הברקוד על הלוח",
    },
    {
      src: twentyfour,
      description:
        "מיצג בטיילת ת״א מול מלון דן על רקע השקיעה בים (תמונה מיום הזיכרון 2024)",
    },
    {
      src: twentyfive,
      description: "שלושה חברים עומדים ומסתכלים על המיצג (תמונה ממאי 2024)",
    },
    {
      src: twentysix,
      description: "הדמיה למיצגים בחניון רעים עם המחשה לחלון זכרונות של נופל",
    },
  ];

  const [enlarged, setEnlarged] = useState({ src: null, description: "" });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(Array(images.length).fill(false));

  const handleIsLoaded = (idx) => {
    setIsLoaded((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  const handleEnlarge = (image) => {
    setEnlarged({ src: image.src, description: image.description });
    setIsVideoOpen(false);
  };

  const openVideo = () => {
    setIsVideoOpen(true);
    setEnlarged({ src: null, description: "" });
  };

  const closeModal = () => {
    setEnlarged({ src: null, description: "" });
    setIsVideoOpen(false);
  };

  return (
    <>
      <div id="gallery" className="gallery">
        <h2>גלריה</h2>
        <div className="galleryImages">
          {images.map((image, i) => (
            <div
              className="gridImage"
              key={i}
              id={i === 5 ? "tall" : undefined}
            >
              <div className={`skeletonLoading ${isLoaded[i] ? "hide" : ""}`} />
              <img
                src={image.src}
                alt={image.description || `Image ${i + 1}`}
                onLoad={() => handleIsLoaded(i)}
                style={{ visibility: isLoaded[i] ? "visible" : "hidden" }}
              />
              <div
                className="enlarge"
                onClick={() => (i === 7 ? openVideo() : handleEnlarge(image))}
              >
                <ImEnlarge
                  size={20}
                  style={{ visibility: isLoaded[i] ? "visible" : "hidden" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {enlarged.src && (
        <div className="imageModal" onClick={closeModal}>
          <div
            className="enlargedImageContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={enlarged.src} alt="Enlarged" />
            {enlarged.description && (
              <div className="modalDescription">
                <p>{enlarged.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isVideoOpen && (
        <div className="videoModal" onClick={closeModal}>
          <div
            className="enlargedImageContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={video}
              controls
              autoPlay
              style={{ maxWidth: "90%", maxHeight: "90%" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
