import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserEmail, getUserEmailToken } from "../../apis/user/userapi";
import "../register/register.scss";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const [emailPattern, setEmailPattern] = useState(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  const [emailValid, setEmailValid] = useState(true)

  const [authCode, setAuthCode] = useState("");
  
  const navigate = useNavigate();

  // 메일 인증 시 처리할 함수
  const mailSubmit = async (e) => {
    e.preventDefault();

    // 이메일 형식 유효성 검사
    const emailPattern = () =>{
    // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(userEmail)) {
      setEmailValid(false)
      return;
    }
    }

    try {
      // 백엔드로 전달할 메일주소
      const reqData = `/api/user/auth/email?email=${userEmail}`;
      const result = await getUserEmail(reqData);
      console.log(result);

      if (result.data.code === 1) {
        //메일 전송 완료 알림
        alert("메일이 전송되었습니다. 메일에서 인증코드를 확인해주세요");
        setEmailSend(true);
        // 인증 코드를 작성하는 곳을 작업시작
      }
      if (result.data.code === -2) {
        alert("이미 가입된 메일입니다.");
      }
    } catch (error) {
      alert("메일 전송 중 오류가 발생했습니다. 다시 시도해주세요");
      console.log("메일 전송 오류:", error);
    }
  };

  // 인증 코드 확인 시 처리할 함수
  const verifyCode = async (e) => {
    e.preventDefault();
    // 인증 코드 확인을 위해 콘솔에 출력
    console.log("Auth Code:", authCode); 

    // 토큰 인증 처리
    const tokenData = `/api/user/auth/email/token?token=${authCode}`;
    const result = await getUserEmailToken(tokenData);

    if (result.data.code === 1) {
      alert("인증이 성공했습니다!");
      navigate("/signup", { state: { email: userEmail, token: authCode } });
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
              onChange={e => 
                {setUserEmail(e.target.value)
                setEmailValid(emailPattern.test(e.target.value))
              }}
            />
            <button type="submit" className="send-button">
              전송
            </button>
          </div>
        </form>
            {!emailValid && (<p style={{ color: "red", fontSize: "12px", padding:"0px 10px 10px 10px"}}>이메일 형식이 올바르지 않습니다.</p>) }
        {emailSend && (
          <form onSubmit={verifyCode}>
            <div className="registerform-group">
              <input
                type="text"
                className="auth-code"
                value={authCode}
                required
                placeholder="인증코드를 입력해주세요"
                onChange={e => setAuthCode(e.target.value)}
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
