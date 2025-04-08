import "../../styles/global.css";

function SearchBar({ searchValue, setSearchValue, handleSearch }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <div>
      <h2>?מחפשים פוסט בעמוד</h2>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="חפש חלל"
      />
    </div>
  );
}

export default SearchBar;
