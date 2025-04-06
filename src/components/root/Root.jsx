import { Outlet, Link, useLocation } from "react-router-dom";

function Root() {
  const location = useLocation();
  const isHowItStarted = location.pathname === "/how-it-started";

  return (
    <div className="root">
      <div className="title">
        <h1>לזכרם</h1>
      </div>
      <div className="about">
        <p>הנצחה חדשה לעולם חדש</p>
        <p>המטרה להגדיל את המודעות לנופלים בחיי</p>
        <p>היומיום ולהנגיש את ההנצחה לכולם</p>
      </div>
      <div className="howItStartedButton">
        <Link to={isHowItStarted ? "/" : "/how-it-started"}>
          <button>
            {isHowItStarted ? "← חזרה לחיפוש" : "← איך הכל התחיל"}
          </button>
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
export default Root;
