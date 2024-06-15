import React, { useState } from "react";
import axios from "axios";
import "./SearchContainer.scss";

const SearchComponent = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchTypeChange = event => {
    setSearchType(event.target.value);
  };

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    // 세션에서 order와 size 값 가져오기
    const order = sessionStorage.getItem("order") || 0; // 기본값 0 설정
    const size = sessionStorage.getItem("itemsPerPage") || 10; // 기본값 10 설정

    let searchValue = 1; // 기본적으로 제목으로 검색 설정

    // searchType에 따라 searchValue 설정
    if (searchType === "titleAndContent") {
      searchValue = 2;
    } else if (searchType === "writer") {
      searchValue = 3;
    }

    try {
      const res = await axios.get(`/api/community/list`, {
        params: {
          order: order,
          search: searchValue,
          keyword: searchQuery,
          size: size,
          page: 1,
        },
      });
      onSearch(res.data); // 검색 결과를 부모 컴포넌트로 전달
    } catch (error) {
      console.error("Error while fetching data:", error);
      // 에러 처리 로직 추가
    }
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
