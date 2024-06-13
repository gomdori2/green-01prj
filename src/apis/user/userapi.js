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
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserEmailToken = async data => {
  try {
    const response = await axios.get(data);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false.error };
  }
};
// 아이디 중복확인
export const getUserId = async data => {
  try {
    const response = await axios.get(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 회원 정보 등록 중복확인
export const postUserSignUp = async data => {
  try {
    const response = await axios.post("/api/user/sign_up", data);
    return response;
  } catch (error) {
    return error;
  }
};

// 닉네임 정보 확인
export const getUserNickName = async(data) =>{
  try {
    const response = await axios.get(data)
    console.log(response)
  } catch (error) {
    console.log(error)
    
  }
}