import axios from "axios";
export const postUserLogin = async data => {
  try {
    const res = await axios.post(data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getUserEmail = async data => {
  try {
    const response = await axios.get(data);
  } catch (error) {
    console.log(error);
  }
};
