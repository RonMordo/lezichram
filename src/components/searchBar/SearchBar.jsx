import "../../styles/global.css";
import xIcon from "../../assets/xIcon.svg";

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
        placeholder="חפשו לפי שם"
      />
      <button
        onClick={() => {
          setSearchValue("");
          handleSearch("");
        }}
      >
        <img src={xIcon} alt="Clear button" />
      </button>
    </div>
  );
}

export default SearchBar;
