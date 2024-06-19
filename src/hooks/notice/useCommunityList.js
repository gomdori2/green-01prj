import axios from "axios";
import { useEffect, useState } from "react";

const useCommunityList = () => {
  const [order, setOrder] = useState(3);
  const [search, setSearch] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [size, setSize] = useState(15);
  const [page, setPage] = useState(1);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getCommunityList = async (order, search, keyword, size, page) => {
      try {
        const API_URL = `/api/community/list?order=${order}&search=${search}&keyword=${keyword}&size=${size}&page=${page}`;
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCommunityList();
  }, [order, search, keyword, size, page]);

  return { order, search, keyword, size, page, data, isLoading, error };
};

export default useCommunityList;
