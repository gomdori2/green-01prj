import axios from "axios";

export const getMonthCalendar = async () => {
  try {
    const a = await axios.get("/api/schedule/plant/management/month");
    return a;
  } catch (error) {
    console.log(error);
  }
};
