import { useEffect, useState } from "react";
import "../login/login.css";
import { postUserLogin } from "../../apis/user/userapi";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUserInfo }) => {
  // const [loginId, setLoginId] = useState("jowonyoung1");
  // const [loginPw, setLoginPw] = useState("asdf@1234");
  const [loginId, setLoginId] = useState("jowonyoung2");
  const [loginPw, setLoginPw] = useState("asdf@1234");
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
    console.log(result.data);

    if (result.data.code === 1) {
      // 로그인 성공시 sessionStorage에  사용자정보 저장
      // sessionStorage.setItem(key, value)
      const userInfo = {
        userId: result.data.data.userId,
        userName: result.data.data.userName,
        userSeq: result.data.data.userSeq,
      };
      setUserInfo(userInfo);
      // console.log("userInfo : ", userInfo);
      sessionStorage.setItem("user", JSON.stringify(userInfo));
      // JSON.stringify(response.data)는 JavaScript 객체를
      // JSON 문자열로 변환하는 함수
      // ('{"userSeq":4,"userId":userId,"userName":userName,"loginType":"email"}');
      alert("로그인되었습니다!");
      navigate("/notice");
    } else {
      setErrorMessage("아이디와 비밀번호를 다시 확인해주세요."); // 로그인 실패 메시지 출력
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <main>
      <div className="login-wrap">
        <header>식물 일정 관리</header>
        <h1>로그인</h1>
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
