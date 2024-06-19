import axios from "axios";
// 로그인 확인
export const postUserLogin = async data => {
  try {
    const response = await axios.post(data);
    return response;
  } catch (error) {
    return error;
  }
};

// 이메일 인증 확인
export const getUserEmail = async data => {
  try {
    const response = await axios.get(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 이메일인증 토큰 확인
export const getUserEmailToken = async data => {
  try {
    const response = await axios.get(data);
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
// 닉네임 정보 확인
export const getUserNickName = async data => {
  // console.log("getUserNickName data :", data);
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
    // {
    //   "id": "string",
    //   "pw": "string",
    //   "pwCheck": "string",
    //   "name": "string",
    //   "token": "string"
    // }
    const response = await axios.post("/api/user/sign_up", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 회원정보 수정
export const patchUserProfile = async data => {
  try {
    const response = await axios.patch("/api/user", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 로그아웃
export const getUserLogout = async () => {
  try {
    const response = await axios.get("/api/user/logout");
    return response;
  } catch (error) {
    console.log(error);
  }
};
