import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Notice.scss";
import axios from "axios";
import NoticeTop from "../../components/notice/NoticeTop";
import NoticeMain from "../../components/notice/NoticeMain";
import NoticeBottom from "../../components/notice/NoticeBottom";
import SearchComponent from "../../components/notice/SearchComponent";

function Notice() {
  const navigate = useNavigate();
  const { page } = useParams();

  const [currentPage, setCurrentPage] = useState(Number(page) || 0);
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPost, setTotalPost] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResult, setSearchResult] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const savedItemsPerPage = sessionStorage.getItem("itemsPerPage");
    return savedItemsPerPage ? parseInt(savedItemsPerPage, 10) : 10;
  });

  const initialOrder =
    sessionStorage.getItem("order") !== null
      ? Number(sessionStorage.getItem("order"))
      : 0;
  const [order, setOrder] = useState(initialOrder);

  // 버튼 텍스트를 관리하는 상태 추가
  const [orderText, setOrderText] = useState(
    order === 3 ? "오래된 순" : "최신 순",
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let url = `/api/community/list?page=${currentPage + 1}&size=${itemsPerPage}&order=${order}`;

      if (searchResult && searchResult.searchType && searchResult.searchQuery) {
        const { searchType, searchQuery } = searchResult;
        const encodedKeyword = encodeURIComponent(searchQuery);
        url += `&search=${searchType}&keyword=${encodedKeyword}`;
      }

      const res = await axios.get(url);
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

  useEffect(() => {
    fetchData();
  }, [searchResult]);

  const handlePageClick = event => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    navigate(`/notice/page=${selectedPage}`);
  };

  const handleItemsPerPageChange = event => {
    const newValue = parseInt(event.target.value, 10);
    setItemsPerPage(newValue);
    sessionStorage.setItem("itemsPerPage", newValue.toString());
  };

  const orderClick = () => {
    const newOrder = order === 3 ? 0 : 3;
    setOrder(newOrder);
    setCurrentPage(0);
    sessionStorage.setItem("order", newOrder);
    setOrderText(newOrder === 3 ? "오래된 순" : "최신 순"); // 버튼 텍스트 변경
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
          orderClick={orderClick}
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          orderText={orderText} // orderText 추가
        />
        <NoticeMain handleSearchResult={handleSearchResult} getData={getData} />
        <NoticeBottom
          totalPages={totalPages}
          handlePageClick={handlePageClick}
        />
        <SearchComponent onSearch={handleSearchResult} />
      </article>
    </div>
  );
}

export default Notice;
