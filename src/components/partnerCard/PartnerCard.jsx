function PartnerCard({ companyName, paragraph }) {
  return (
    <div className="partnerCard">
      <h3>חברת ״{companyName}״</h3>
      <p dir="rtl">{paragraph}</p>
    </div>
  );
}

export default PartnerCard;
