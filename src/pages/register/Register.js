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
    // 웹브라우저 새로고침 방지 코드(기본기능 막기)
    event.preventDefault();

    // 백엔드로 전달한 이메일주소
    const reqData = `/api/user/auth/email?email=${userEmail}`;
    const result = await getUserEmail(reqData);

    // 메일 전송 완료 알림
    alert("메일이 전송되었습니다. 메일에서 인증코드를 확인해주세요");
    setEmailSend(true);
  };
  // 인증 코드 확인 시 처리할 함수

  // 토큰 인증시 처리할 함수
  const verifyCode = async event => {
    // 웹브라우저 새로고침 방지코드(기본기능 막기)
    event.preventDefault();
    // 이메일이 전송되었는지 확인

    // 토큰 인증 처리
    const tokenData = `/api/user/auth/email/token?token=${authCode}`;
    const result = await getUserEmailToken(tokenData);

    if (result.success) {
      // 토큰정보가 일치하지 않아도 메세지가 띄여져서 수정해야 함
      alert("인증이 성공했습니다!");
      navigate("/signup", { state: { email: userEmail } });
      // 인증이 성공하면 회원가입 페이지 이동 해야함
      // 인증코드를 받은 이메일 주소를 signup페이지에 불러옴
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
        <form
          onSubmit={event => {
            mailSubmit(event);
          }}
        >
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

        {/* <form
          onSubmit={event => {
            verifyCode(event);
          }}
        >
          <div className="registerform-group">
            <input
              type="text"
              className="register-id"
              required
              placeholder="인증코드를 입력해주세요"
              onChange={event => {
                setAuthCode(event.target.value);
              }}
            />
            <button type="submit" className="send-button">
              인증확인
            </button>
          </div>
        </form> */}

        {/* 이메일이 전송된 경우에만 아래 폼 렌더링 */}
        {emailSend && (
          <form
            onSubmit={event => {
              verifyCode(event);
            }}
          >
            <div className="registerform-group">
              <input
                type="text"
                className="register-id"
                required
                onChange={event => {
                  setAuthCode(event.target.value);
                }}
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
