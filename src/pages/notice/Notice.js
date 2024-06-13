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

  // 게시물 데이터 불러오기 작업
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalPost, setTotalPost] = useState(0); // 전제 게시물 수
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수

  /**
   *
   */

  // 상태 변수 currentPage를 0으로 초기화합니다. (useState Hook 사용)
  const [currentPage, setCurrentPage] = useState(0);

  // 페이지 클릭 이벤트 핸들러 함수입니다.
  const handlePageClick = data => {
    // 선택된 페이지 번호로 currentPage 상태를 업데이트합니다.
    setCurrentPage(data.selected);
  };

  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지당 보여줄 게시글 수 상태로 관리

  // 현재 페이지에 표시할 아이템의 시작 인덱스를 계산합니다.
  const offset = currentPage * itemsPerPage;

  // 현재 페이지에 표시할 아이템을 추출합니다. (slice 메서드 사용)
  const getDataView = getData.slice(offset, offset + itemsPerPage);

  // 총 페이지 수를 계산합니다. (Math.ceil 함수 사용)
  const pageCount = totalPages;

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/community/list");
        setGetData(res.data.data.list);
        setTotalPost(res.data.data.totalElements); // 전체 게시물 수
        setTotalPages(res.data.data.totalPage); // 전체 페이지
        console.log("게시물 조회", res.data.data.list);
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

  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

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
            {getDataView.map(post => (
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
        {/* ReactPaginate 컴포넌트를 사용하여 페이지네이션 UI 생성 */}
        <ReactPaginate
          previousLabel={"previous"} // 이전 버튼 레이블
          nextLabel={"next"} // 다음 버튼 레이블
          breakLabel={"..."} // 페이지 번호 대신 "..."으로 표시되는 부분의 레이블
          breakClassName={"break-me"} // "..." 레이블에 적용될 CSS 클래스 이름
          pageCount={pageCount} // 총 페이지 수
          marginPagesDisplayed={2} // 현재 페이지 양쪽에 표시될 페이지 수
          pageRangeDisplayed={5} // 페이지 번호가 연속적으로 표시될 페이지 수
          onPageChange={handlePageClick} // 페이지 클릭 이벤트 핸들러
          containerClassName={"pagination"} // 페이지네이션 컨테이너에 적용될 CSS 클래스 이름
          subContainerClassName={"pages pagination"} // 페이지 번호 컨테이너에 적용될 CSS 클래스 이름
          activeClassName={"active"} // 현재 페이지에 적용될 CSS 클래스 이름
        />

        <div>검색창 부분</div>
      </article>
    </div>
  );
}

export default Notice;
