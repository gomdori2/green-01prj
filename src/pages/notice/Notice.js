import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./Notice.scss";
import axios from "axios";
import NoticeTop from "../../components/notice/NoticeTop";
import NoticeBottom from "../../components/notice/NoticeBottom";
import NoticeMain from "../../components/notice/NoticeMain";
import SearchComponent from "../../components/notice/SearchComponent";
import PageNation from "../../components/common/PageNation";

function Notice() {
  const navigate = useNavigate();
  const { page } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
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
    if (!page) {
      navigate(`/notice/page/${currentPage}`);
    }
  }, [page, currentPage, navigate]);

  useEffect(() => {
    const searchType = searchParams.get("searchType");
    const searchQuery = searchParams.get("searchQuery");
    if (searchType && searchQuery) {
      setSearchResult({ searchType, searchQuery });
    }
  }, [searchParams]);

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
      console.log("Fetching data from URL:", url);
      const res = await axios.get(url);
      if (res.status === 200 && res.data.data) {
        const { list, totalElements } = res.data.data;
        setGetData(list);
        setTotalPost(totalElements);
        setTotalPages(Math.ceil(totalElements / itemsPerPage));
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = event => {
    const selectedPage = event.selected + 1; // ReactPaginate는 0부터 시작하므로 +1
    setCurrentPage(selectedPage);
    navigate(
      `/notice/page/${selectedPage}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
    );
  };

  const handleItemsPerPageChange = event => {
    const newValue = parseInt(event.target.value, 10);
    setItemsPerPage(newValue);
    sessionStorage.setItem("itemsPerPage", newValue.toString());
    setTotalPages(Math.ceil(totalPost / newValue));
  };

  const handleOrderClick = () => {
    const newOrder = order === 3 ? 0 : 3;
    setOrder(newOrder);
    sessionStorage.setItem("order", newOrder.toString());
    setOrderText(newOrder === 3 ? "오래된 순" : "최신 순");
    navigate(
      `/notice/page/1${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
    );
  };

  const handleSearchResult = (searchData, searchType, searchQuery) => {
    setGetData(searchData.list);
    setTotalPost(searchData.list.length);
    const newTotalPages = Math.ceil(searchData.list.length / itemsPerPage);
    setTotalPages(newTotalPages);
    setCurrentPage(1);
    setSearchParams({ searchType, searchQuery });
    navigate(
      `/notice/page/1?searchType=${searchType}&searchQuery=${encodeURIComponent(searchQuery)}`,
    );
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
        <NoticeBottom />
        <PageNation
          pageCount={totalPages}
          currentPage={currentPage - 1} // ReactPaginate는 0부터 시작하므로 -1
          onPageChange={handlePageClick}
        />
        <SearchComponent onSearch={handleSearchResult} />
      </article>
    </div>
  );
}

export default Notice;
