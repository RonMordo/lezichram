import one from "../../assets/galleryImages/first.webp";
import two from "../../assets/galleryImages/second.webp";
import three from "../../assets/galleryImages/three.webp";
import four from "../../assets/galleryImages/four.webp";
import gif from "../../assets/galleryImages/statueGif.gif";
import six from "../../assets/galleryImages/six.webp";
import seven from "../../assets/galleryImages/7.webp";
import eight from "../../assets/galleryImages/secondGif.gif";
import nine from "../../assets/galleryImages/9.webp";
import ten from "../../assets/galleryImages/10.webp";
import eleven from "../../assets/galleryImages/11.webp";
import twelve from "../../assets/galleryImages/12.webp";
import thirteen from "../../assets/galleryImages/13.webp";
import fourteen from "../../assets/galleryImages/14.webp";
import fifteen from "../../assets/galleryImages/15.webp";
import sixteen from "../../assets/galleryImages/16.webp";
import seventeen from "../../assets/galleryImages/17.webp";
import video from "../../assets/gifVideo.mp4";
import { ImEnlarge } from "react-icons/im";
import { useState } from "react";

function Gallery() {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const images = [
    one,
    two,
    three,
    four,
    gif,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen,
    seventeen,
  ];

  const handleEnlarge = (src) => {
    setEnlargedImage(src);
    setIsVideoOpen(false);
  };

  const openVideo = () => {
    setIsVideoOpen(true);
    setEnlargedImage(null);
  };

  const closeModal = () => {
    setEnlargedImage(null);
    setIsVideoOpen(false);
  };

  return (
    <>
      <div className="gallery">
        <h2>גלריה</h2>
        <div className="galleryImages">
          {images.map((src, i) => (
            <div
              className="gridImage"
              key={i}
              id={i === 5 ? "tall" : undefined}
            >
              <img src={src} alt="" />
              <div
                className="enlarge"
                onClick={() => (i === 7 ? openVideo() : handleEnlarge(src))}
              >
                <ImEnlarge size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {enlargedImage && (
        <div className="imageModal" onClick={closeModal}>
          <div
            className="enlargedImageContainer"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={enlargedImage} alt="Enlarged" />
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
