import { Link } from "react-router-dom";
import "../register/register.css";
import { useEffect, useState } from "react";
import { getUserEmail } from "../../apis/user/userapi";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  // 메일 인증시 처리할 함수
  const sendSubmit = async event => {
    // 웹브라우저 새로고침 방지 코드(기본기능 막기)
    event.preventDefault();

    const reqData = `/api/user/auth/email?email=${userEmail}`;
    const result = await getUserEmail(reqData);
    setInfoMessage(result.message);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="wrap">
      <header className="header">
        <Link to="/" className="back-btn">
          <span>&lt;</span>
        </Link>
        <h2>회원가입</h2>
        <hr />
      </header>

      <main className="register">
        <div className="register-wrap">
          <label htmlFor="useremail">이메일</label>
          <form>
            <input
              type="email"
              value={userEmail}
              className="user-email"
              required
              placeholder="메일 주소를 입력해주세요."
              onChange={event => {
                setUserEmail(event.target.value);
              }}
            />
            <input type="submit" value="전송" className="send-btn" />
          </form>
          <p className="info-message">발송된 메일에서 링크를 클릭해주세요.</p>
        </div>
      </main>

      <footer className="footer"></footer>
    </div>
  );
};

export default Register;
