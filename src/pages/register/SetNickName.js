import { Link } from "react-router-dom";
import "../register/setnickname.css";

const SetNickName = () => {
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
            <form>
              <label htmlFor="nickname" className="nickname-txt">
                닉네임을 설정해주세요
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                required
                placeholder="닉네임을 설정해주세요"
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
