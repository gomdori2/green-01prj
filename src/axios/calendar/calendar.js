import axios from "axios";

export const getMonthCalendar = async () => {
  try {
    const result = await axios.get("/api/schedule/plant/management/month");
    return result;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정등록 삭제	n
// /api/schedule/plant/management
export const deletePlantSch = async (plantSeq, gardenSeq) => {
  try {
    const result = await axios.delete(
      `/api/schedule/plant/management?plantSeq=${plantSeq}&plantManagementSeq=${gardenSeq}`,
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정 상세 조회	n
// /api/schedule/plant/management/detail?page=1&size=10

export const getDetailSch = async ({ gardenSeq, managementDate }) => {
  try {
    const result = await axios.get(
      `/api/schedule/plant/management/detail?plantManagementSeq=${gardenSeq}&managementDate=${managementDate}&page=0&size=0`,
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정 일 단위 조회	n
// /api/schedule/plant/management/day
// http://34.70.113.56:8080/api/schedule/plant/management/day?userSeq=10&managementDate=2024-01-02&page=1&size=10
export const getDayReadSch = async (userSeq, managementDate, page) => {
  console.log(userSeq, managementDate, page);
  try {
    const result = await axios.get(
      `/api/schedule/plant/management/day?userSeq=${userSeq}&managementDate=${managementDate}&page=${page}&size=10`,
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정등록 수정	n
// /api/schedule/plant/management

export const calendarPatchData = async (
  plantSeq,
  plantManagementSeq,
  gardening,
  contents,
) => {
  console.log(plantSeq, plantManagementSeq, gardening, contents);
  try {
    const result = await axios.patch("/api/schedule/plant/management", {
      plantSeq,
      plantManagementSeq,
      gardening,
      contents,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
// 식물일정등록
// /api/schedule/plant/management	n

export const postPlantSch = async (
  plantSeq,
  managementDate,
  gardening,
  contents,
) => {
  console.log(plantSeq, managementDate, gardening, contents);
  try {
    const result = await axios.post("/api/schedule/plant/management", {
      plantSeq,
      managementDate,
      gardening,
      contents,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
