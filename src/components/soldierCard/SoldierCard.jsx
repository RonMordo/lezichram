import commentIcon from "../../assets/commentIcon.svg";
import likeIcon from "../../assets/likeIcon.svg";
import shareIcon from "../../assets/shareIcon.svg";
import saveIcon from "../../assets/saveIcon.svg";
import threeDotsIcon from "../../assets/threeDotsIcon.svg";
import profileImg from "../../assets/profileImage.jpg";
import clickIcon from "../../assets/click.webp";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function SoldierCard({ soldierData, showOverlay }) {
  return (
    <motion.a
      href={soldierData.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="soldierCard"
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
    >
      {showOverlay && (
        <div className="cardOverlay">
          <p>לחצו על הפוסט</p>
          <p>ושתפו בסטורי</p>
          <img src={clickIcon} alt="Left click icon" />
        </div>
      )}
      <div className="postHeader">
        <div className="profileImage">
          <img src={profileImg} alt="Instagram profile image" />
          <span>lezichram_</span>
        </div>
        <div className="threeDots">
          <img src={threeDotsIcon} alt="" />
        </div>
      </div>
      <div className="postImage">
        <img src={soldierData.imgSrc} alt="Soldier instagram post" />
      </div>
      <div className="postReactions">
        <div className="likes">
          <img src={likeIcon} alt="" />
          <span>{soldierData.likeCount}</span>
        </div>
        <div className="comments">
          <img src={commentIcon} alt="" />
          <span>{soldierData.commentsCount}</span>
        </div>
        <img src={shareIcon} className="sharesIcon" alt="" />
        <img src={saveIcon} className="saveIcon" alt="" />
      </div>
    </motion.a>
  );
}

export default SoldierCard;
