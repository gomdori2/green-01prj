import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserEmail, getUserEmailToken } from "../../apis/user/userapi";
import "../register/register.css";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const navigate = useNavigate();

  // 메일 인증 시 처리할 함수
  const mailSubmit = async event => {
    event.preventDefault();

    // 이메일 형식 유효성 검사
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(userEmail)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    // 백엔드로 전달한 이메일주소
    const reqData = `/api/user/auth/email?email=${userEmail}`;
    const result = await getUserEmail(reqData);

    // 메일 전송 완료 알림
    alert("메일이 전송되었습니다. 메일에서 인증코드를 확인해주세요");
    setEmailSend(true);
  };

  // 인증 코드 확인 시 처리할 함수
  const verifyCode = async event => {
    event.preventDefault();

    // 토큰 인증 처리
    const tokenData = `/api/user/auth/email/token?token=${authCode}`;
    const result = await getUserEmailToken(tokenData);

    if (result.success) {
      alert("인증이 성공했습니다!");
      navigate("/signup", { state: { email: userEmail } });
    } else {
      alert("인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

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
        <form onSubmit={mailSubmit}>
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

        {emailSend && (
          <form onSubmit={verifyCode}>
            <div className="registerform-group">
              <input
                type="text"
                className="register-id"
                required
                placeholder="인증코드를 입력해주세요"
                onChange={event => setAuthCode(event.target.value)}
              />
              <button type="submit" className="send-button">
                인증확인
              </button>
            </div>
            <p className="check-message">
              메일에 발송된 인증코드를 기재해주세요
            </p>
          </form>
        )}
      </div>
    </main>
  );
};

export default Register;
