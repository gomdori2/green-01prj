import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./Notice.scss";
import NoticeTop from "../../components/notice/NoticeTop";
import NoticeBottom from "../../components/notice/NoticeBottom";
import NoticeMain from "../../components/notice/NoticeMain";
import SearchComponent from "../../components/notice/SearchComponent";
import PageNation from "../../components/common/PageNation";
import useGetList from "../../hooks/notice/useGetList.js";
import axios from "axios";

function Notice() {
  const navigate = useNavigate();
  const { page } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOrder = Number(sessionStorage.getItem("order")) || 0;
  const initialItemsPerPage =
    parseInt(sessionStorage.getItem("itemsPerPage"), 10) || 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [getData, setGetData] = useState([]);
  const [totalPost, setTotalPost] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [order, setOrder] = useState(initialOrder);
  const [orderText, setOrderText] = useState(
    initialOrder === 3 ? "오래된 순" : "최신 순",
  );
  const [bestPost, setBestPost] = useState([]);
  const [showBest, setShowBest] = useState(false);

  const url = `/api/community/list?page=${currentPage}&size=${itemsPerPage}&order=${order}`;
  const { getListData, isLoading, error } = useGetList(url);

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
    if (getListData && getListData.data) {
      const { list, totalElements } = getListData.data;
      setGetData(list);
      setTotalPost(totalElements);
      setTotalPages(Math.ceil(totalElements / itemsPerPage));
    }
  }, [getListData, itemsPerPage]);

  const handlePageClick = event => {
    const selectedPage = event.selected + 1;
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

  const bestButtonClick = async () => {
    try {
      const URL = `/api/community/list?order=1`;
      const response = await axios.get(URL);
      setBestPost(response.data.data.list);
      setShowBest(true);
    } catch (error) {
      console.log(error);
    }
  };

  const allButtonClick = async () => {
    try {
      const URL = `/api/community/list?page=${currentPage}&size=${itemsPerPage}&order=${order}`;
      const response = await axios.get(URL);
      setGetData(response.data.data.list);
      setShowBest(false);
    } catch (error) {
      console.log(error);
    }
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
          bestButtonClick={bestButtonClick}
          allButtonClick={allButtonClick}
        />
        <NoticeMain
          handleSearchResult={handleSearchResult}
          getData={showBest ? bestPost : getData}
        />
        <NoticeBottom />
        <PageNation
          pageCount={totalPages}
          currentPage={currentPage - 1}
          onPageChange={handlePageClick}
        />
        <SearchComponent onSearch={handleSearchResult} />
      </article>
    </div>
  );
}

export default Notice;
