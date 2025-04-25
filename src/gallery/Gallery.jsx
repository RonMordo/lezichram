import one from "../assets/galleryImages/first.webp";
import two from "../assets/galleryImages/second.webp";
import three from "../assets/galleryImages/three.webp";
import four from "../assets/galleryImages/four.webp";
import gif from "../assets/galleryImages/statueGif.gif";
import six from "../assets/galleryImages/six.webp";
import seven from "../assets/galleryImages/7.webp";
import eight from "../assets/galleryImages/8.webp";
import nine from "../assets/galleryImages/9.webp";
import ten from "../assets/galleryImages/10.webp";
import eleven from "../assets/galleryImages/11.webp";
import twelve from "../assets/galleryImages/12.webp";
import thirteen from "../assets/galleryImages/13.webp";
import fourteen from "../assets/galleryImages/14.webp";
import fifteen from "../assets/galleryImages/15.webp";
import sixteen from "../assets/galleryImages/16.webp";
import seventeen from "../assets/galleryImages/17.webp";

function Gallery() {
  return (
    <div className="gallery">
      <h2>גלריה</h2>
      <div className="galleryImages">
        <img src={one} alt="" />
        <img src={two} alt="" />
        <img src={three} alt="" />
        <img src={four} alt="" />
        <img src={gif} alt="" />
        <img src={six} alt="" className="tall" />
        <img src={seven} alt="" />
        <img src={eight} alt="" />
        <img src={nine} alt="" />
        <img src={ten} alt="" />
        <img src={eleven} alt="" />
        <img src={twelve} alt="" />
        <img src={thirteen} alt="" />
        <img src={fourteen} alt="" />
        <img src={fifteen} alt="" />
        <img src={sixteen} alt="" />
        <img src={seventeen} alt="" />
      </div>
    </div>
  );
}

export default Gallery;
