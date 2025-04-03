import Root from "./components/root/Root";
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
      <Routes>
        <Route
          index
          element={
            <Root
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              searchedSoldiers={searchedSoldiers}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
