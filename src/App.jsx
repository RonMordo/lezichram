import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./postsScript/supabaseClient";

import Root from "./components/root/Root";
import SearchPage from "./components/searchPage/SearchPage";
import HowItStarted from "./components/howItStarted/HowItStarted";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [soldiersData, setSoldiersData] = useState([]);
  const [searchedSoldiers, setSearchedSoldiers] = useState([]);

  useEffect(() => {
    async function loadSoldiers() {
      const { data, error } = await supabase
        .from("posts")
        .select(
          "name, caption, img_url, permalink, like_count, comments_count"
        );
      if (error) {
        console.error("Error loading soldiers:", error);
        return;
      }
      const normalized = data.map((row) => ({
        name: row.name,
        imgSrc: row.img_url,
        permalink: row.permalink,
        likeCount: row.like_count,
        commentsCount: row.comments_count,
      }));
      setSoldiersData(normalized);
    }
    loadSoldiers();
  }, []);

  const handleSearch = (searchText) => {
    setSearchValue(searchText);
    const trimmed = searchText.trim();
    if (!trimmed) {
      setSearchedSoldiers([]);
      return;
    }
    setSearchedSoldiers(soldiersData.filter((s) => s.name.includes(trimmed)));
  };

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
