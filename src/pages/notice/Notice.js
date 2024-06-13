import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notice.scss";
import { BsViewStacked, BsCardText } from "react-icons/bs";
import axios from "axios";
import ReactPaginate from "react-paginate";

function Notice() {
  const navigate = useNavigate();

  const handleRowClick = boardSeq => {
    navigate(`/notice/post/${boardSeq}`);
  };

  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPost, setTotalPost] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 0부터 시작
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [order, setOrder] = useState(0); // 초기 정렬 순서

  // 데이터 불러오기 함수
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/api/community/list?page=${currentPage + 1}&size=${itemsPerPage}&order=${order}`, // currentPage + 1
      );
      setGetData(res.data.data.list); // 실제 데이터 리스트 설정
      setTotalPost(res.data.data.totalElements); // 게시물 수
      setTotalPages(res.data.data.totalPage); // 페이지 수
      console.log("게시물 조회", res.data.data.list);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, order]);

  const handlePageClick = event => {
    setCurrentPage(event.selected); // 페이지 번호 업데이트
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0); // 페이지를 처음으로 리셋
  };

  const orderClick = () => {
    setOrder(prevOrder => (prevOrder === 1 ? 0 : 1)); // order 값을 토글
    setCurrentPage(0); // 페이지를 처음으로 리셋
  };

  const pageCount = totalPages;

  return (
    <div className="inner">
      <article className="notice">
        <h2 className="title">커뮤니티</h2>
        <div className="notice__top">
          <div className="flex-gap-4">
            <button className="post-all btn">전체글</button>
            <button className="post-best btn">추천글</button>
            <button className="post-best btn" onClick={orderClick}>
              ↕
            </button>
          </div>
          <div className="notice__top__icon">
            <button className="view-Type">
              <BsCardText size={15} />
            </button>
            <button className="view-Type">
              <BsViewStacked size={15} />
            </button>
            <select
              name="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5개씩</option>
              <option value="10">10개씩</option>
              <option value="15">15개씩</option>
              <option value="20">20개씩</option>
              <option value="30">30개씩</option>
              <option value="40">40개씩</option>
              <option value="50">50개씩</option>
            </select>
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
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
        <div>검색창 부분</div>
      </article>
    </div>
  );
}

export default Notice;
