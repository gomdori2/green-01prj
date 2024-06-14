import React, { createContext, useEffect, useState } from "react";
export const userInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [localUserData, setLocalUserId] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    // 객체 텍스트 째로 넘어와서 파싱해줌. 없으면 null
    const parseSaveUser = savedUser ? JSON.parse(savedUser) : null;
    if (savedUser !== null || savedUser !== "") {
      setLocalUserId(parseSaveUser);
    }
  }, []);

  return (
    <userInfoContext.Provider
      value={{
        localUserData,
      }}
    >
      {children}
    </userInfoContext.Provider>
  );
};

export default UserInfoProvider;
