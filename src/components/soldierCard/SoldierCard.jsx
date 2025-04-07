import commentIcon from "../../assets/commentIcon.svg";
import likeIcon from "../../assets/likeIcon.svg";
import shareIcon from "../../assets/shareIcon.svg";
import saveIcon from "../../assets/saveIcon.svg";
import threeDotsIcon from "../../assets/threeDotsIcon.svg";
import profileImg from "../../assets/profileImage.jpg";

function SoldierCard({ soldierData }) {
  return (
    <a
      href={soldierData.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="soldierCard"
      style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
    >
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
    </a>
  );
}

export default SoldierCard;
