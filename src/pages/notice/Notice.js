import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notice.scss";
import { BsViewStacked, BsCardText } from "react-icons/bs";
import axios from "axios";

function Notice() {
  const navigate = useNavigate();

  const handleRowClick = boardSeq => {
    navigate(`/notice/post/${boardSeq}`);
  };

  // 게시물 데이터 불러오기 작업
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(""); // 전체 페이지
  const [totalPages, setTotalPages] = useState(""); // 전체 게시물 수

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/community/list");
        setGetData(res.data.data.list);
        setCurrentPage(res.data.data.totalPage); // 전체 페이지
        setTotalPages(res.data.data.totalElements); // 전체 게시물 수
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="inner">
      <article className="notice">
        <h2 className="title">커뮤니티</h2>
        <div className="notice__top">
          <div className="flex-gap-4">
            <button className="post-all btn">전체글</button>
            <button className="post-best btn">추천글</button>
          </div>
          <div className="notice__top__icon">
            <button className="view-Type">
              <BsCardText size={15} />
            </button>
            <button className="view-Type">
              <BsViewStacked size={15} />
            </button>
          </div>
        </div>
        <table className="notice__center">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성일</th>
              <th>추천</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            {getData.map(post => (
              <tr
                key={post.boardSeq}
                onClick={() => handleRowClick(post.boardSeq)}
              >
                <td>{post.boardSeq}</td>
                <td>{post.title}</td>
                <td>{post.writerName}</td>
                <td>{post.inputDt}</td>
                <td>{post.fav}</td>
                <td>{post.hit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="notice__bottom">
          <Link to="/notice/write" className="btn">
            글쓰기
          </Link>
        </div>
        <div className="notice__pagination">페이지네이션 부분</div>

        <div>검색창 부분</div>
      </article>
    </div>
  );
}

export default Notice;
