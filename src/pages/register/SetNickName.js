import { Link } from "react-router-dom";
import "../register/setnickname.css";
import { useEffect, useState } from "react";
import { getUserNickName } from "../../apis/user/userapi";

const SetNickName = () => {
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  const nickNameSubmit = async event => {
    event.preventDefault();

    // 닉네임형식 유효성 검사

    // 백엔드에 전달할 닉네임
    const reqData = `/api/user/duplicated?str=${nickName}&type=2`;
    const result = await getUserNickName(reqData);

    if (result.data.code === 1) {
      alert("회원가입이 완료되었습니다! 로그인 창에서 로그인 후 이용해주세요");
    } else {
      alert("중복된 닉네임입니다. 다른 닉네임을 기재해주세요.");
    }
  };
  return (
    <main>
      <div className="set-nickname-wrap">
        <header>
          <Link to={"/signup"} className="back-btn">
            <span>&lt;</span>
          </Link>
          <h2>회원가입</h2>
          <hr />
        </header>

        <div className="signup-nickname">
          <div className="signup-nickname-wrap">
            <form
              onSubmit={event => {
                nickNameSubmit(event);
              }}
            >
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

              <div className="terms">
                <p>약관 동의</p>

                <div className="checkbox-container">
                  <div className="checkbox-inner">
                    <input type="checkbox" id="agree-all" name="agree-all" />
                    <label htmlFor="agree-all">
                      <strong>모두 동의</strong>
                    </label>
                  </div>
                </div>
                <div className="agree-all-line"></div>

                <div className="checkbox-container">
                  <div className="checkbox-inner">
                    <input type="checkbox" id="agree-1" name="agree-1" />
                    <label htmlFor="agree-1">(필수) 플랜트 이용약관</label>
                  </div>
                </div>

                <div className="checkbox-container">
                  <div className="checkbox-inner">
                    <input type="checkbox" id="agree-2" name="agree-2" />
                    <label htmlFor="agree-2">(필수) 개인정보 처리방침</label>
                  </div>
                </div>
              </div>
              <input type="submit" value="가입완료" className="send-btn" />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SetNickName;
