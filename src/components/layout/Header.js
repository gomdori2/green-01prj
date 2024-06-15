import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userInfoContext } from "../../context/UserInfoProvider";
// 정보수정, 로그아웃 아이콘
import { FiLogOut } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";

const Header = ({ userInfo }) => {
  const { localUserData } = useContext(userInfoContext);
  const [userSeq, setUserSeq] = useState();

  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    setUserSeq(localUserData?.userSeq);
  }, [localUserData]);

  useEffect(() => {
    // console.log("userSeq ", userSeq);
  }, [userSeq]);

  // useEffect(() => {
  //   setUserSeq(localUserData.userSeq);
  // }, [localUserData]);
  // useEffect(() => {
  //   console.log(userSeq);
  // }, [userSeq]);

  // 여기에 헤더를 제외하고 싶은 path를 넣으세요
  const excludedPaths = ["/", "/register", "/signup"];
  if (!excludedPaths.includes(location.pathname)) {
    return (
      <HeaderDiv>
        <h1>
          <Link to="/notice">
            <img src="./www/images/plantDiaryLogo.png" alt="logo" />
          </Link>
        </h1>
        <ul className="menu">
          <li>
            <Link className="menu__item" to="/plantResisterList">
              식물등록
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="/reactCalendar">
              식물관리
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="/notice">
              커뮤니티
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            {userSeq ? (
              <div className="user-actions">
                {/* css 다듬어야함. */}
                <Link className="action-item" to={"/userprofile"}>
                  <FaUserPen size={20} />
                </Link>
                /
                <button
                  className="action-item"
                  onClick={() => {
                    sessionStorage.removeItem("user");
                    navigate("/");
                  }}
                >
                  로그아웃
                  <FiLogOut size={18} />
                </button>
              </div>
            ) : null}
          </li>
        </ul>
      </HeaderDiv>
    );
  } else {
    return <></>;
  }
};

export default Header;

const HeaderDiv = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--primary-100);
  h1 {
    width: 100px;
    img {
      width: 100%;
    }
  }
  ul {
    display: flex;
    align-items: center;
    gap: 30px;
    height: 100%;
    font-weight: 700;
    li {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  .menu__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .user-actions {
    display: flex;
    align-items: center;
    gap: 10px; /* 간격 조정 가능 */
  }
  .action-item {
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .action-item button {
    font-weight: inherit;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

