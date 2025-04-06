import SearchBar from "../searchBar/SearchBar";
import SoldierCard from "../soldierCard/SoldierCard";

function Root({ searchValue, setSearchValue, handleSearch, searchedSoldiers }) {
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

      <div className="searchBar">
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />
      </div>
      <div className="soldiersContainer">
        {searchedSoldiers &&
          searchedSoldiers.map((soldier) => (
            <SoldierCard soldierData={soldier} key={soldier.permalink} />
          ))}
      </div>
    </div>
  );
}
export default Root;
