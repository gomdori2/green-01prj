import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Notice.scss";
import axios from "axios";
import NoticeTop from "../../components/notice/NoticeTop";
import NoticeBottom from "../../components/notice/NoticeBottom";
import NoticeMain from "../../components/notice/NoticeMain";
import SearchComponent from "../../components/notice/SearchComponent";

function Notice() {
  const navigate = useNavigate();
  const { page } = useParams();
  const initialOrder = Number(sessionStorage.getItem("order")) || 0;
  const initialItemsPerPage =
    parseInt(sessionStorage.getItem("itemsPerPage"), 10) || 10;

  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPost, setTotalPost] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [order, setOrder] = useState(initialOrder);
  const [orderText, setOrderText] = useState(
    initialOrder === 3 ? "오래된 순" : "최신 순",
  );

  useEffect(() => {
    // 페이지 파라미터가 없으면 첫 페이지로 이동
    if (!page) {
      navigate(`/notice/page/${currentPage}`);
    }
  }, [page, currentPage, navigate]);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, order, searchResult]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let url = `/api/community/list?page=${currentPage}&size=${itemsPerPage}&order=${order}`;
      if (searchResult) {
        const { searchType, searchQuery } = searchResult;
        const encodedKeyword = encodeURIComponent(searchQuery);
        url += `&search=${searchType}&keyword=${encodedKeyword}`;
      }
      const res = await axios.get(url);
      const { list, totalElements, totalPage } = res.data.data;
      setGetData(list);
      setTotalPost(totalElements);
      setTotalPages(totalPage);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = event => {
    const selectedPage = event.selected + 1; // ReactPaginate는 0부터 시작하므로 +1
    setCurrentPage(selectedPage);
    navigate(`/notice/page/${selectedPage}`);
  };

  const handleItemsPerPageChange = event => {
    const newValue = parseInt(event.target.value, 10);
    setItemsPerPage(newValue);
    sessionStorage.setItem("itemsPerPage", newValue.toString());
  };

  const handleOrderClick = () => {
    const newOrder = order === 3 ? 0 : 3;
    setOrder(newOrder);
    sessionStorage.setItem("order", newOrder.toString());
    setOrderText(newOrder === 3 ? "오래된 순" : "최신 순");
    navigate(`/notice/`);
  };

  const handleSearchResult = (searchType, searchQuery) => {
    setSearchResult({ searchType, searchQuery });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="inner">
      <article className="notice">
        <h2 className="title">커뮤니티</h2>
        <NoticeTop
          orderClick={handleOrderClick}
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          orderText={orderText}
        />
        <NoticeMain handleSearchResult={handleSearchResult} getData={getData} />
        <NoticeBottom
          totalPages={totalPages}
          currentPage={currentPage - 1} // ReactPaginate는 0부터 시작하므로 -1
          handlePageClick={handlePageClick}
        />
        <SearchComponent onSearch={handleSearchResult} />
      </article>
    </div>
  );
}

export default Notice;
