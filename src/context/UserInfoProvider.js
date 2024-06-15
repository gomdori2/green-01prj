import React, { createContext, useEffect, useState } from "react";

export const userInfoContext = createContext();
const UserInfoProvider = ({ children }) => {
  const [localUserData, setLocalUserData] = useState(null);
  const savedUser = sessionStorage.getItem("user");

  useEffect(() => {
    // console.log("UserInfoProvider savedUser : ", savedUser);
    // 객체 텍스트 째로 넘어와서 파싱해줌. 없으면 null
    const parseSaveUser = savedUser ? JSON.parse(savedUser) : null;
    if (savedUser !== null || savedUser !== "") {
      setLocalUserData(parseSaveUser);
    }
  }, []);

  return (
    <userInfoContext.Provider value={{ localUserData, setLocalUserData }}>
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfoProvider;
