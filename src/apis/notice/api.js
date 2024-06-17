// src/apis/notice/api.js
import axios from "axios";

export const fetchListData = async url => {
  const response = await axios.get(url);
  return response.data;
};

export const fetchBestPost = async () => {
  const URL = `/api/community/list?order=1`;
  const response = await axios.get(URL);
  return response.data.data.list;
};

export const fetchAllPosts = async (currentPage, itemsPerPage, order) => {
  const URL = `/api/community/list?page=${currentPage}&size=${itemsPerPage}&order=${order}`;
  const response = await axios.get(URL);
  return response.data.data.list;
};
