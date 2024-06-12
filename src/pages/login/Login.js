import { useEffect, useState } from "react";
import "../login/login.css";
import { postUserLogin } from "../../apis/user/userapi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // const [loginId, setLoginId] = useState("jowonyoung1");
  // const [loginPw, setLoginPw] = useState("asdf@1234");
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 로그인시 처리할 함수
  const handleSubmit = async event => {
    // 웹브라우저 새로고침 방지 코드(기본기능 막기)
    event.preventDefault();
    if (loginId === "" || loginPw === "") {
      // ID와 비밀번호 필드가 모두 입력되었는지 확인
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
      return; // 함수 종료
    }

    // console.log("백엔드로 전달할 로그인아이디", loginId);
    // console.log("백엔드로 전달할 로그인비번", loginPw);
    const reqData = `/api/user/login?id=${loginId}&pwd=${loginPw}`;
    const result = await postUserLogin(reqData);
    if (result.code === 1) {
      // 로그인이 성공했을 때만 처리
      alert("로그인되었습니다!");
      navigate("/notice");
    } else {
      setErrorMessage(result.message); // 로그인 실패 메시지 출력
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <main>
      <div className="login-wrap">
        <header>식물 일정 관리</header>
        <h1>소제목</h1>
        <div className="loginform-group">
          <form
            onSubmit={e => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              value={loginId}
              className="login-id"
              required
              placeholder="아이디 또는 이메일"
              onChange={event => {
                // console.log(event.target);
                setLoginId(event.target.value);
              }}
            />
            <input
              type="password"
              value={loginPw}
              className="Login-pw"
              required
              placeholder="비밀번호"
              onChange={event => {
                // console.log(event.target);
                setLoginPw(event.target.value);
              }}
            />
            <p className="error-message">{errorMessage}</p>
            <button type="submit" className="login-btn">
              로그인
            </button>
          </form>
          <Link to="/register" className="signup-btn">
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
