import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserEmail, getUserEmailAuth } from "../../apis/user/userapi";
import "../register/register.css";
const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  // const [authCode, setAuthCode] = useState("");
  // 메일 인증 시 처리할 함수
  const mailSubmit = async event => {
    // 웹브라우저 새로고침 방지 코드(기본기능 막기)
    event.preventDefault();

    // 백엔드로 전달한 이메일주소
    const reqData = `/api/user/auth/email?email=${userEmail}`;
    const result = await getUserEmail(reqData);

    console.log(result);

    // 메일 전송 완료 알림
    alert("메일이 전송되었습니다. 메일에서 인증코드를 확인해주세요");
  };
  // 인증 코드 확인 시 처리할 함수

  // const verifyCode = event => {
  //   event.preventDefault();

  //   const authData = `/api/user/auth/verify?code=${authCode}&email=${userEmail}`;
  //   const result = getUserEmailAuth(authData);

  //   console.log(result);
  // };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <main>
      <div className="register-wrap">
        <header>
          <Link to={"/"} className="back-btn">
            <span>&lt;</span>
          </Link>
          <h2>회원가입</h2>
          <hr />
        </header>
        <form onSubmit={event => mailSubmit(event)}>
          <label htmlFor="useremail">이메일</label>
          <div className="registerform-group">
            <input
              type="email"
              value={userEmail}
              className="user-email"
              required
              placeholder="메일주소를 입력해주세요"
              onChange={event => setUserEmail(event.target.value)}
            />
            <button type="submit" className="send-button">
              전송
            </button>
          </div>
        </form>

        <form onSubmit={() => {}}>
          <div className="registerform-group">
            <input
              type="text"
              className="register-id"
              required
              placeholder="인증코드를 입력해주세요"
              onChange={() => {}}
            />
            <button type="button" className="send-button">
              인증확인
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
