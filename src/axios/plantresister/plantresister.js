import axios from "axios";
import { toast } from "react-toastify";

// 공공데이터 식물 검색 Parameters
// /api/opendata/
// /api/opendata/?keyword=%EA%BD%83%20%EC%9D%B4%EB%A6%84&page=1&size=10
export const getOpenData = async ({ searchKeyword, page }) => {
  try {
    const data = await axios.get(
      `/api/opendata/?keyword=${searchKeyword}&page=${page}&size=10`,
    );
    return data;
  } catch (error) {
    toast.warning(error);
  }
};

// 식물등록리스트 조회
// /api/schedule/plant/list
// /api/schedule/plant/list?userSeq=1&page=1&size=10
export const getData = async ({ userSeq, page }) => {
  try {
    const data = await axios.get(
      `/api/schedule/plant/list?userSeq=${userSeq}&page=${page}&size=10`,
    );
    return data;
  } catch (error) {
    toast.warning(error);
  }
};

// 식물등록리스트 상세 조회
// /api/schedule/plant/detail
// /api/schedule/plant/detail?userSeq=1&plantSeq=1
export const getOneData = async ({ userSeq, plantSeq }) => {
  try {
    const data = await axios.get(
      `/api/schedule/plant/detail?userSeq=${userSeq}&plantSeq=${plantSeq}`,
    );
    return data;
  } catch (error) {
    toast.warning(error);
  }
};

// 식물등록
// /api/schedule/plant
// /api/schedule/plant
// 객체로 보내기. {}
//{
//   "userSeq": 9007199254740991,
//   "plantNickName": "testPlant",
//   "etc": "testEtcText",
//   "odataSeq": 9007199254740991 // 식물 공공 데이터 pk
// }
export const postData = async ({ userSeq, odataSeq, plantsAlias, etcData }) => {
  try {
    const data = await axios.post("/api/schedule/plant", {
      userSeq,
      odataSeq,
      plantNickName: plantsAlias,
      etc: etcData,
    });
    // stuatus 받으려고
    return data;
  } catch (error) {
    toast.warning(error);
  }
};

// 식물등록 수정
// /api/schedule/plant
// {
//   "userSeq": 9007199254740991,
//   "plantSeq": 9007199254740991,
//   "plantNickName": "string",
//   "etc": "string"
// }

export const patchData = async () => {
  try {
    const data = await axios.patch("/api/opendata/");
    return data;
  } catch (error) {
    toast.warning(error);
  }
};

// 식물등록 삭제
// /api/schedule/plant
// /api/schedule/plant?userSeq=1&plantSeq=1
export const deleteData = async ({ userSeq, plantSeq }) => {
  try {
    const data = await axios.delete(
      `/api/opendata/?userSeq=${userSeq}&plantSeq=${plantSeq}`,
    );
    return data;
  } catch (error) {
    toast.warning(error);
  }
};
