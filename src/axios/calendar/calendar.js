import axios from "axios";

export const getMonthCalendar = async () => {
  try {
    const a = await axios.get("/api/schedule/plant/management/month");
    return a;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정등록 삭제	n
// /api/schedule/plant/management	
export const  deletePlantSch= async () => {
  try {
    const a = await axios.get("/api/schedule/plant/management/month");
    return a;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정 상세 조회	n
// /api/schedule/plant/management/detail	
	
export const getDetailSch = async () => {
  try {
    const a = await axios.get("/api/schedule/plant/management/month");
    return a;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정 일 단위 조회	n
// /api/schedule/plant/management/day	
	
export const getDayReadSch = async () => {
  try {
    const a = await axios.get("/api/schedule/plant/management/month");
    return a;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정등록 수정	n
// /api/schedule/plant/management	
	
export const putPlantSch = async () => {
  try {
    const a = await axios.get("/api/schedule/plant/management/month");
    return a;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정등록	
// /api/schedule/plant/management	n

export const postPlantSch = async () => {
  try {
    const a = await axios.get("/api/schedule/plant/management/month");
    return a;
  } catch (error) {
    console.log(error);
  }
};