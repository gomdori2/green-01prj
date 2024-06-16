// src/hooks/notice/useGetList.js
import { useState, useEffect } from "react";
import { fetchListData } from "../../apis/notice/api";

const useGetList = url => {
  const [getListData, setGetListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchListData(url);
        setGetListData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { getListData, isLoading, error };
};

export default useGetList;
