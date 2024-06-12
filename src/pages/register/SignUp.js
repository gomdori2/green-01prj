import { Link, useLocation } from "react-router-dom";
import "../register/signup.css";
import { useState } from "react";
import { getUserSignUp } from "../../apis/user/userapi";

const SignUp = () => {
  const location = useLocation(); // useLocation 훅 사용
  const { email } = location.state || {}; // 이메일 값 추출
  const [userEmail, setUserEmail] = useState(email || ""); // 이메일 초기값 설정
  const [userId, setUserId] = useState("");
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async event => {
    // 이벤트 기본 동작 방지
    event.preventDefault();

    const reqData = `/api/user/duplicated?str=${userId}&type=1`;
    const result = await getUserSignUp(reqData);
    // 아이디 중복 확인
  };

  return (
    <main>
      <div className="signup-wrap">
        <header>
          <Link to="/register" className="back-btn">
            <span>&lt;</span>
          </Link>
          <h2>회원가입</h2>
          <hr />
        </header>

        <div className="signup">
          <div className="signupform-wrap">
            <form
              onSubmit={event => {
                handleSubmit(event);
              }}
            >
              <label htmlFor="useremail">이메일</label>
              <input
                type="email"
                id="useremail"
                name="email"
                readOnly
                value={userEmail}
              />
              <label htmlFor="userid">아이디</label>
              <div className="id-input-wrap">
                <input
                  type="text"
                  value={userId}
                  className="userid"
                  required
                  placeholder="예) user123"
                  onChange={event => {
                    setUserId(event.target.value);
                  }}
                />
                <input
                  type="button"
                  value="중복확인"
                  className="check-btn"
                  onClick={event => {
                    handleSubmit(event);
                  }}
                />
              </div>

              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="비밀번호를 입력해주세요"
                onChange={event => {
                  setPassword(event.target.value);
                }}
              />
              <label htmlFor="confirm-password">비밀번호 확인</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                placeholder="비밀번호를 한번 더 입력해주세요"
                onChange={event => {
                  setCheckPassword(event.target.value);
                }}
              />
              <p className="pw-error-message">
                {password !== checkPassword && "비밀번호가 일치하지 않습니다."}
              </p>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="고객님의 이름을 입력해주세요"
                onChange={event => {
                  setUserName(event.target.value);
                }}
              />
              <input
                type="submit"
                value="다음페이지"
                className="next-btn"
                id="submitBtn"
                disabled={password !== checkPassword}
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
