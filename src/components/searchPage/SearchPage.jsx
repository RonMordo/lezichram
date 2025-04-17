import SearchBar from "../searchBar/SearchBar";
import SoldierCard from "../soldierCard/SoldierCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function SearchPage({
  searchValue,
  setSearchValue,
  handleSearch,
  searchedSoldiers,
}) {
  const [showOverlay, setShowOverlay] = useState(true);
  useEffect(() => {
    if (searchedSoldiers?.length === 0) return;
    setShowOverlay(true);
    const timer = setTimeout(() => setShowOverlay(false), 1500);
    return () => clearTimeout(timer);
  }, [searchedSoldiers]);
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
        {searchedSoldiers &&
          searchedSoldiers.map((soldier) => (
            <SoldierCard
              soldierData={soldier}
              key={soldier.permalink}
              showOverlay={showOverlay}
            />
          ))}
      </div>
    </motion.div>
  );
}

export default SearchPage;
