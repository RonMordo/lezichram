import SearchBar from "../searchBar/SearchBar";
import SoldierCard from "../soldierCard/SoldierCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function SearchPage({
  searchValue,
  setSearchValue,
  handleSearch,
  searchedSoldiers,
  notFoundError,
}) {
  return (
    <motion.div
      className="searchPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="searchBar">
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />
      </div>
      <div className="soldiersContainer">
        {notFoundError && (
          <p id="notFoundError" dir="rtl">
            מצטערים, לא מצאנו את הפוסט שחיפשת😔.
          </p>
        )}
        {searchedSoldiers &&
          searchedSoldiers.map((soldier) => (
            <SoldierCard soldierData={soldier} key={soldier.permalink} />
          ))}
      </div>
    </motion.div>
  );
}

export default SearchPage;
