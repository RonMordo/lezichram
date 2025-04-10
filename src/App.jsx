import Root from "./components/root/Root";
import SearchPage from "./components/searchPage/SearchPage";
import HowItStarted from "./components/howItStarted/HowItStarted";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [soldiersData, setSoldiersData] = useState([]);
  const [searchedSoldiers, setSearchedSoldiers] = useState([]);

  const handleSearch = (searchText) => {
    setSearchValue(searchText);
    const search = searchText.trim();
    if (search === "") {
      setSearchedSoldiers([]);
      return;
    }
    const filtered = soldiersData.filter((soldier) =>
      soldier.name.includes(search)
    );
    setSearchedSoldiers(filtered);
  };

  useEffect(() => {
    fetch("/soldiersData/soldiersData.json")
      .then((res) => res.json())
      .then((data) => {
        setSoldiersData(data);
      })
      .catch((err) => console.error("Failed to load soldiers data:", err));
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route
            index
            element={
              <SearchPage
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearch={handleSearch}
                searchedSoldiers={searchedSoldiers}
              />
            }
          />
          <Route path="how-it-started" element={<HowItStarted />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
