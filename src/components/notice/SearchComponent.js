import React, { useState } from "react";

const SearchComponent = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchTypeChange = event => {
    setSearchType(event.target.value);
  };

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시, 검색 함수 호출
    onSearch(searchType, searchQuery);
  };

  return (
    <div className="search-container">
      <select
        name="searchType"
        value={searchType}
        onChange={handleSearchTypeChange}
      >
        <option value="title">제목</option>
        <option value="titleAndContent">제목+내용</option>
        <option value="writer">글쓴이</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button className="btn" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};

export default SearchComponent;
