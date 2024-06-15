import React, { useState } from "react";
import axios from "axios";
import "./SearchComponent.scss";

const SearchComponent = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchTypeChange = event => {
    setSearchType(event.target.value);
  };

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    // 세션에서 order와 size 값 가져오기
    const order = sessionStorage.getItem("order") || 3; // 기본값 3 설정
    const size = sessionStorage.getItem("itemsPerPage") || 15; // 기본값 15 설정

    let searchValue = 1; // 기본적으로 제목으로 검색 설정

    // searchType에 따라 searchValue 설정
    if (searchType === "titleAndContent") {
      setSearchType("2");
    }
    if (searchType === "writer") {
      setSearchType("3");
    }

    try {
      const res = await axios.get(`/api/community/list`, {
        params: {
          order,
          search: searchValue,
          keyword: searchQuery,
          size,
          page: 1,
        },
      });
      onSearch(res.data.data, searchType, searchQuery); // 검색 결과와 검색 유형, 검색어를 전달
      console.log("검색결과", res.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  return (
    <div className="search-container">
      <select
        name="searchType"
        value={searchType}
        onChange={handleSearchTypeChange}
      >
        <option value="1">제목</option>
        <option value="2">제목+내용</option>
        <option value="3">글쓴이</option>
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
