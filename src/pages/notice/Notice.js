import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notice.scss";

function Notice({ posts = [] }) {
  // posts 데이터를 props로 받음 (기본값: 빈 배열)
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 20; // 페이지당 보여줄 게시글 수

  // 필터링된 게시글, 검색어, 검색 옵션 상태 관리
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("title");

  // 게시글 행 클릭 시 상세 페이지로 이동
  const handleRowClick = postId => {
    navigate(`/notice/post/${postId}`);
  };

  // posts 데이터가 변경될 때마다 필터링된 게시글 초기화
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // 페이지네이션 관련 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost); // 현재 페이지에 보여줄 게시글
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i); // 페이지 번호 배열 생성
  }

  // 검색 처리 함수
  const handleSearch = () => {
    let filtered = posts; // 필터링된 결과 초기화
    if (searchTerm) {
      // 검색어가 있을 때
      filtered = posts.filter(post => {
        // 검색 조건에 맞는 게시글 필터링
        const searchFields = {
          title: post.title.toLowerCase(),
          titleContent: `${post.title.toLowerCase()} ${post.content.toLowerCase()}`,
          author: post.author.toLowerCase(),
        };
        return searchFields[searchOption].includes(searchTerm.toLowerCase());
      });
    }
    setFilteredPosts(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 검색어 변경 처리 함수
  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  // 검색 옵션 변경 처리 함수
  const handleSearchOptionChange = event => {
    setSearchOption(event.target.value);
  };

  return (
    <div className="inner">
      <article className="notice">
        <h2>게시판</h2>
        <div className="notice__top">
          <button className="best-post btn">추천글</button>
          <div className="notice__top__icon">
            <Link to="/notice/write" className="btn">
              글쓰기
            </Link>
          </div>
        </div>
        <table className="notice__center">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(post => (
              <tr key={post.postId} onClick={() => handleRowClick(post.postId)}>
                <td>{post.postId}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
                <td>{post.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="notice__bottom">
          <Link to="/notice/write" className="btn">
            글쓰기
          </Link>
        </div>
        <div className="notice__pagination">
          {pageNumbers.map(number => (
            <button key={number} onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          ))}
        </div>
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
      </article>
    </div>
  );
}

export default Notice;
