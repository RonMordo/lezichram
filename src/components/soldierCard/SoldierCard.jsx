function SoldierCard({ soldierData }) {
  return (
    <div>
      <div className="soldierImage">
        <img src={soldierData.imgSrc} alt="Soldier Photo" />
      </div>
      <div className="soldierData">
        <p>{soldierData.rank}</p>
        <p>{soldierData.name}</p>
        <p>{soldierData.service}</p>
        <p>{soldierData.dateOfFall}</p>
        <p>{soldierData.age}</p>
        <p>{soldierData.residence}</p>
      </div>
    </div>
  );
}
export default SoldierCard;
