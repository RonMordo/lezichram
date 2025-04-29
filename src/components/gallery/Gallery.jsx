import React, { useState, useEffect } from "react";
import { ImEnlarge } from "react-icons/im";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

function Gallery() {
  const BATCH_SIZE = 6;

  const images = [
    {
      src: one,
      description:
        "מיצג ברחבת הבימה ת״א, ודגל ישראל שמשתקף דרכו (תמונה מיום הזיכרון 2024)",
    },
    {
      src: eight,
      description: "ההשראה לפרויקט לזכרם. חלון זכרונות בצורת גוף של נופל...",
    },
    { src: three, description: "השרטוט הראשון של המיצג" },
    { src: four, description: "תהליך יצירת הפוסטים הראשונים באפריל 2022" },
    {
      src: twentysix,
      description: "הדמיה למיצגים בחניון רעים עם המחשה לחלון זכרונות של נופל",
    },
    {
      src: two,
      description:
        "אנשים מתאספים ליד המיצג כדי לחוות מקרוב (תמונה מיום הזיכרון 2022)",
    },
    { src: seven, description: "מיצג בגן צ׳רלוס קלור ת״א (מיום הזיכרון 2022)" },
    { src: gif, description: "מיצג בכיכר דיזינגוף (תמונה מיום הזיכרון 2024)" },
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
    { src: six, description: "עמוד אינסטגרם" },
  ];

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(Array(images.length).fill(false));
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [startY, setStartY] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (currentIndex !== null) closeModal();
    };
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleScroll);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", handleScroll);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentIndex]);

  const handleTouchStartModal = (e) => setStartY(e.touches[0].clientY);
  const handleTouchMoveModal = (e) => {
    if (startY !== null && e.touches[0].clientY - startY > 100) {
      closeModal();
    }
  };

  const handleIsLoaded = (idx) =>
    setIsLoaded((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });

  const openModal = (i) => setCurrentIndex(i);
  const closeModal = () => setCurrentIndex(null);

  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };
  const showNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
  };

  const loadMore = () =>
    setVisibleCount((v) => Math.min(v + BATCH_SIZE, images.length));
  const collapse = () => setVisibleCount(BATCH_SIZE);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50 && currentIndex < images.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (touchEndX - touchStartX > 50 && currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  const media = currentIndex !== null ? images[currentIndex] : null;
  const isVideo = media?.src.toLowerCase().endsWith(".mp4");

  return (
    <>
      <div id="gallery" className="gallery">
        <h2>גלריה</h2>
        <div className="galleryImages">
          {images.slice(0, visibleCount).map((image, i) => {
            const gridVideo = image.src.toLowerCase().endsWith(".mp4");
            return (
              <div className="gridImage" key={i}>
                <div
                  className={`skeletonLoading ${isLoaded[i] ? "hide" : ""}`}
                />

                {gridVideo ? (
                  <video
                    src={image.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={() => handleIsLoaded(i)}
                  />
                ) : (
                  <img
                    loading="lazy"
                    src={image.src}
                    alt={image.description || `Image ${i + 1}`}
                    onLoad={() => handleIsLoaded(i)}
                    style={{
                      visibility: isLoaded[i] ? "visible" : "hidden",
                    }}
                  />
                )}

                <div className="enlarge" onClick={() => openModal(i)}>
                  <ImEnlarge
                    size={20}
                    style={{
                      visibility: isLoaded[i] ? "visible" : "hidden",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < images.length ? (
          <button className="loadMoreBtn" onClick={loadMore}>
            הצג עוד
          </button>
        ) : (
          <button className="collapseBtn" onClick={collapse}>
            הצג פחות
          </button>
        )}
      </div>

      {currentIndex !== null && (
        <div className="imageModal" onClick={closeModal}>
          <div
            className="enlargedImageContainer"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              handleTouchStart(e);
              handleTouchStartModal(e);
            }}
            onTouchMove={(e) => {
              handleTouchMove(e);
              handleTouchMoveModal(e);
            }}
            onTouchEnd={handleTouchEnd}
          >
            {media.src === eight ? (
              <video
                src={video}
                controls
                autoPlay
                preload="metadata"
                style={{ width: "100%", height: "100%" }}
              />
            ) : isVideo ? (
              <video
                src={media.src}
                controls
                autoPlay
                preload="metadata"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <img src={media.src} alt="Enlarged" />
            )}

            {media.description && (
              <div className="modalDescription">
                <p>{media.description}</p>
              </div>
            )}

            {currentIndex > 0 && (
              <button className="navArrow left" onClick={showPrev}>
                <FaChevronLeft size={24} />
              </button>
            )}
            {currentIndex < images.length - 1 && (
              <button className="navArrow right" onClick={showNext}>
                <FaChevronRight size={24} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
