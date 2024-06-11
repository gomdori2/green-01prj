import React from "react";
import "./SearchContainer.scss";

const SearchContainer = ({
  searchOption,
  handleSearchOptionChange,
  searchTerm,
  handleSearchTermChange,
  handleSearch,
}) => {
  return (
    <div className="search-container">
      <select value={searchOption} onChange={handleSearchOptionChange}>
        <option value="title">제목</option>
        <option value="titleContent">제목+내용</option>
        <option value="author">글쓴이</option>
      </select>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchContainer;
