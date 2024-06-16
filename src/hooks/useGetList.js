import { useState, useEffect } from "react";
import axios from "axios";

const useGetList = url => {
  const [getListData, setGetListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getList = async fetchUrl => {
    try {
      console.log("Fetching data from URL:", fetchUrl);
      const res = await axios.get(fetchUrl);
      setGetListData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      setIsLoading(true);
      getList(url);
    }
  }, [url]);

  return { getListData, isLoading, error };
};

export default useGetList;
