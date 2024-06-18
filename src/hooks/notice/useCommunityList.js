import React, { useEffect, useState } from "react";

const useCommunityList = () => {
  const [order, setOrder] = useState(3);
  const [search, setSearch] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [size, setSize] = useState(15);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getCommunityList = async (order, search, keyword, size, page) => {
      try {
        const API_URL = `/api/community/list?order=${order}&search=${search}&keyword=${keyword}&size=${size}&page=${page}`;
        const response = await axios.get(API_URL);
        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return <div>useCommunityList</div>;
};

export default useCommunityList;
