import React, { createContext, useContext, useEffect, useState } from "react";

export const userInfoContext = createContext();
// export const useUser = () => useContext(userInfoContext);

const UserInfoProvider = ({ children }) => {
  // const savedUser = sessionStorage.getItem("user");

  // const [contextUserData, setContextUserData] = useState(() => {
  //   // 세션 스토리지에서 사용자 데이터를 불러옵니다.
  //   const savedUserData = sessionStorage.getItem("user");
  //   return savedUserData ? JSON.parse(savedUserData) : null;
  // });

  // useEffect(() => {
  //   // contextUserData가 변경될 때마다 세션 스토리지에 저장합니다.
  //   if (contextUserData) {
  //     sessionStorage.setItem("user", JSON.stringify(contextUserData));
  //   } else {
  //     sessionStorage.removeItem("user");
  //   }
  // }, [contextUserData]);

  // 다시 검토하셔요.
  const [contextUserData, setContextUserData] = useState(null);
  // 최초 실행
  useEffect(() => {
    const tempUser = sessionStorage.getItem("user");
    // console.log(tempUser);

    if (tempUser) {
      setContextUserData(JSON.parse(tempUser));
    } else {
      setContextUserData(null);
    }
  }, []);

  useEffect(() => {
    // console.log("UserInfoProvider contextUserData  : ", contextUserData);
  }, [contextUserData]);

  return (
    <userInfoContext.Provider value={{ contextUserData, setContextUserData }}>
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfoProvider;
