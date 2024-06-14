import { useEffect, useState } from "react";
import {
  getUserId,
  getUserNickName,
  postUserSignUp,
} from "../../apis/user/userapi";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../register/signup.scss";

const SignUp = () => {
  // 사용자가 아이디 중복확인을 했는지 체크 변수
  const [isCheckId, setIsCheckId] = useState(false);
  const location = useLocation(); // useLocation 훅 사용
  const { email, token } = location.state || {}; // 이메일 값 추출
  const [userEmail, setUserEmail] = useState(email || ""); // 이메일 초기값 설정
  const [userId, setUserId] = useState("");
  const [idCheckMessage, setIdCheckMessage] = useState(false);
  const [userIdDisabled, setUserIdDisabled] = useState(false);
  const [userPwd, setUserPwd] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token:", token);
  }, [token]);

  // 아이디 중복 검사 함수
  const handleCheckId = async e => {
    // 아이디 형식 유효성 검사
    const userIdPattern = /^[a-zA-Z0-9]{4,20}$/;
    if (!userIdPattern.test(userId)) {
      alert("아이디는 영어 및 숫자만, 4~20자 사이어야 합니다.");
      return;
    }

    // 백엔드로 전달할 아이디
    const reqData = `/api/user/duplicated?str=${userId}&type=1`;
    const result = await getUserId(reqData);

    // 아이디 중복 확인 결과에 따라 처리
    if (result.data.code === 1) {
      alert("사용 가능한 아이디입니다.");
      // 중복검사 완료로 설정
      setIsCheckId(true);
      setIdCheckMessage(true);
      // 아이디가 사용 가능한 경우 아이디 입력 필드를 비활성화
      setUserIdDisabled(true);
    } else {
      alert("이미 사용 중인 아이디입니다.");
      // 중복검사 완료 안한 것으로 다시 셋팅
      setIsCheckId(false);
      setUserIdDisabled(false);
    }
  };

  //  회원가입시 처리할 함수
  const handleSubmit = async event => {
    // 이벤트 기본 동작 방지
    event.preventDefault();

    // 아이디 중복 확인
    // if (isCheckId === false) {
    if (!isCheckId) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    // 비밀번호 형식 유효성 검사
    const passwordPattern =
      // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/;

    if (!passwordPattern.test(userPwd)) {
      alert(
        "비밀번호는 영어 및 숫자, 특수문자를 포함하며 8~20자 사이이어야 하며 영어와 숫자가 최소 1개씩 들어가야합니다.",
      );
      return;
    }
    if (userPwd !== checkPassword) {
      alert("비밀번호가 서로 다릅니다. 다시 확인해주세요.");
      return;
    }

    // 닉네임 입력 검사
    handleCheckNickName();
  };

  // 닉네임 중복 검사 함수
  const handleCheckNickName = async () => {
    // 닉네임 형식 유효성 검사
    const NickNamePattern = /^[a-zA-Z가-힣]{2,10}$/;
    if (!NickNamePattern.test(nickName)) {
      alert("닉네임은 2~10자 이내, 영어 및 한글, 숫자만 가능합니다.");
      return;
    }

    // 백엔드에 전달할 닉네임
    const reqData = `/api/user/duplicated?str=${nickName}&type=2`;
    const result = await getUserNickName(reqData);
    if (result.data.code === 1) {
      signupResultFunc();
    } else {
      alert(result.data.msg);
    }
  };
  const signupResultFunc = async () => {
    // 백엔드로 전달하는 회원가입 정보
    const signUpReqData = {
      id: userId,
      pw: userPwd,
      pwCheck: checkPassword,
      name: nickName,
      token: token,
    };

    // 회원가입 정보
    const signUpResult = await postUserSignUp(signUpReqData);
    console.log(signUpResult);

    if (signUpResult.data.code === 1) {
      alert("회원가입이 완료되었습니다! 로그인 창에서 로그인 후 이용해주세요");
      navigate("/");
    } else {
      alert("회원가입에 실패했습니다. 다시 확인해주세요.");
    }
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
                  disabled={userIdDisabled}
                />
                <input
                  type="button"
                  value="중복확인"
                  className="check-btn"
                  onClick={event => {
                    handleCheckId(event);
                  }}
                />
              </div>

              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={userPwd}
                name="password"
                required
                placeholder="비밀번호를 입력해주세요"
                onChange={event => {
                  setUserPwd(event.target.value);
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
                {userPwd !== checkPassword && "비밀번호가 일치하지 않습니다."}
              </p>
              <label htmlFor="nickname" className="nickname-txt">
                닉네임을 설정해주세요
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickName}
                required
                placeholder="닉네임을 설정해주세요"
                onChange={event => {
                  setNickName(event.target.value);
                }}
              />

              <input
                type="submit"
                value="가입완료"
                className="send-btn"
                id="submitBtn"
                // disabled={userPwd !== checkPassword}
                onClick={() => {}}
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
