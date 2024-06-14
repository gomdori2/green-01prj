import { useEffect, useState } from "react";
import "../login/userprofile.scss";
const UserProfile = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  //  유저 정보 수정 시 처리할 함수
  const handleSubmit = event => {
    // 이벤트 기본 동작 방지
    event.preventDefault();
  };

  return (
    <div className="userinfo-update">
      <h2>사용자 정보 수정</h2>
      <form
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        {/* <div className="form-group">
          <label htmlFor="seq">사용자 번호</label>
          <input type="text" name="seq"  />
        </div> */}
        <div className="form-group">
          <label htmlFor="password">새 비밀번호</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => {
              setPassword(e);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input
            type="password"
            name="confirm-password"
            value={newPassword}
            onChange={e => {
              setNewPassword(e);
            }}
          />
        </div>
        <div className="form-group">
          <label>닉네임</label>
          <input type="text" name="name" />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="수정하기"
            className="modify-bt"
            onClick={() => {}}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
