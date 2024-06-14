import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Notice.scss";
import { BsViewStacked, BsCardText } from "react-icons/bs";
import axios from "axios";
import PageNation from "../../components/common/PageNation";
import NoticeContents from "../../components/notice/NoticeContents";

function Notice() {
  const navigate = useNavigate();
  const { page } = useParams(); // URL에서 페이지 번호 가져오기

  const [currentPage, setCurrentPage] = useState(Number(page) || 0); // URL에서 페이지 번호 가져오기
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPost, setTotalPost] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 세션 스토리지에서 초기 order 값을 가져옴, 없으면 0으로 초기화
  const initialOrder =
    sessionStorage.getItem("order") !== null
      ? Number(sessionStorage.getItem("order"))
      : 0;
  const [order, setOrder] = useState(initialOrder);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/api/community/list?page=${currentPage + 1}&size=${itemsPerPage}&order=${order}`,
      );
      setGetData(res.data.data.list);
      setTotalPost(res.data.data.totalElements);
      setTotalPages(res.data.data.totalPage);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(Number(page) || 0);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, order]);

  const handlePageClick = event => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    navigate(`/notice/page=${selectedPage}`);
  };

  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
    navigate(`/notice/page=0`);
  };

  const orderClick = () => {
    const newOrder = order === 3 ? 0 : 3;
    setOrder(newOrder);
    setCurrentPage(0);
    sessionStorage.setItem("order", newOrder); // 세션 스토리지에 새로운 order 값을 저장
    navigate(`/notice/`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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

        <NoticeContents getData={getData} />

        <div className="notice__bottom">
          <Link to="/notice/write" className="btn">
            글쓰기
          </Link>
        </div>
        <PageNation
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
        />
        <div>검색창 부분</div>
      </article>
    </div>
  );
}

export default Notice;
