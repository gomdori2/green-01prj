import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { FaSeedling, FaSun, FaTree, FaWind } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { postPlantSch } from "../../axios/calendar/calendar";
import TextArea from "../common/TextArea";
import { userInfoContext } from "../../context/UserInfoProvider";
import CalendarPlantsPop from "./CalendarPlantPop";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import { TbPlantOff } from "react-icons/tb";

const DetailDivStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 2px 2px 2px gray;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid gray;
  padding: 20px;
`;
const DetailDivInnerStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 20px;
    max-width: 600px;
  }

  div {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 60px;
  }
  input {
    padding: 10px;
    height: 30px;
    border: 1px solid gray !important;
    font-size: 14px;
    border-radius: 4px 4px 4px 4px !important;
  }
  .text-area-div {
    display: block;
  }
  .text-area-style {
    margin-top: 15px;
  }
  label {
    font-weight: bold;
    font-size: 20px;
    width: 25%;
  }
  label::after {
    content: "";
  }
  .text-area-div {
    // 임시로 이래둠
    label::after {
      content: "" !important;
    }
  }
`;
const IconStyle = styled.div`
  margin-left: 13px;
  display: flex;
  gap: 10px;
`;
const GardningIconStyle = styled.div`
  display: flex;
  gap: 13px !important;
  margin-left: 25px;
`;
const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-left: 5px;
  padding-bottom: 20px;
`;
const CalendarResister = () => {
  const location = useLocation();
  // 앞에서 받으면 편한거 같긴한데 일단 선언해서사용
  // location.state가 null일 경우 빈 객체로 대체_ null 났을 때 오류 잡으려고
  // const state = location.state || {};
  // const { title, text, day } = state;
  // const [titleData, setTitilData] = useState();
  // const [textData, setTextData] = useState();
  const { contextUserData } = useContext(userInfoContext);
  const [checkedValues, setCheckedValues] = useState([]);
  const [content, setContent] = useState("");
  const [plantName, setPlantName] = useState();
  const [plantSeq, setPlantSeq] = useState(null);
  const [isClicked, setIsClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const navigate = useNavigate();
  const clickDay = location.state;

  const handleIconClick = value => {
    // value가 쉼표로 구분된 문자열인 경우 배열로 변환
    const clickedValue = parseInt(value);
    setCheckedValues(prevValues => {
      // 이미 체크된 값인지 확인
      const isChecked = prevValues?.includes(clickedValue);

      if (isChecked) {
        // 이미 체크된 값이면 제거
        return prevValues?.filter(item => item !== clickedValue);
      } else {
        // 체크되지 않은 값이면 추가
        return [...prevValues, clickedValue];
      }
    });
  };
  // ****************등록 : 등록페이지가 있어야하면 뺄것.**************
  const postPlantSchCalendar = async (
    plantSeq,
    modContent,
    gardning,
    contents,
  ) => {
    setIsLoading(true);
    try {
      // 배열을 스트링으로 넘겨줘야해서 일단 문자열로 변환
      gardning = gardning.join("");
      const result = await postPlantSch(
        plantSeq,
        modContent,
        gardning,
        contents,
      );
      toast.success("일정정보가 등록 되었습니다.");
      navigate("/reactCalendar");
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const isClickFunc = () => {
    setIsClicked(true);
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  // ****************삭제**************
  return (
    <div>
      <TitleDivStyle>식물 일정 등록</TitleDivStyle>
      <DetailDivStyle>
        <DetailDivInnerStyle>
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            {/* 날짜 / 순번은 고정 값이라 변경 예정 */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* 날짜 / 순번은 고정 값이라 변경 예정 */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {imgUrl ? (
                  <img
                    style={{ width: "196px", height: "120px" }}
                    src={imgUrl}
                  ></img>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <TbPlantOff size={120} />
                    <div
                      style={{
                        display: "block",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      식물 이미지가 없습니다.
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <label style={{ marginRight: "11px" }}>관리날짜</label>
                  <div style={{ gap: 5 }}>
                    <input
                      id="day"
                      value={clickDay}
                      style={{ width: "100px" }}
                      readOnly
                    />
                    {isClicked ? (
                      <CalendarPlantsPop
                        // setOdataSeq={setOdataSeq}
                        setIsClicked={setIsClicked}
                        setPlantSeq={setPlantSeq}
                        setPlantName={setPlantName}
                        userSeq={contextUserData.userSeq}
                        setImgUrl={setImgUrl}
                      />
                    ) : null}
                    <button
                      className="btn"
                      style={{
                        marginLeft: "20px",
                        background: "rgb(35, 47, 175)",
                      }}
                      type="button"
                      onClick={() => isClickFunc()}
                    >
                      불러오기
                    </button>
                  </div>
                </div>
                <div>
                  <label>식물애칭</label>
                  <input id="day" value={plantName} readOnly />
                </div>

                {/* <div>
            <label htmlFor="title"></label>
            <input
              id="title"
              value={titleData}
              onChange={e => {
                setTitilData(e.target.value);
              }}
            />
          </div> */}
                <div>
                  {/* 가드닝 이미지 왔다갔다 시키기 / 거기에 체크박스 none + label로 아이콘에 checkbox 사용해서 값 넘기기 */}
                  <label htmlFor="title">가드닝</label>
                  <IconStyle>
                    <div>
                      <GardningIconStyle>
                        <div
                          onClick={() => handleIconClick(1)}
                          style={{
                            background: checkedValues?.includes(1)
                              ? "#FFD700"
                              : "#F5DEB3",
                            borderRadius: "10px",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <FaSun style={{ color: "#fff" }} />
                        </div>
                        <div
                          onClick={() => handleIconClick(2)}
                          style={{
                            background: checkedValues?.includes(2)
                              ? "#32CD32"
                              : "#98FB98",
                            borderRadius: "10px",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <FaSeedling style={{ color: "#fff" }} />
                        </div>
                        <div
                          onClick={() => handleIconClick(3)}
                          style={{
                            background: checkedValues?.includes(3)
                              ? "#00BFFF"
                              : "#87CEEB",
                            borderRadius: "10px",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <FaWind style={{ color: "#fff" }} />
                        </div>
                        <div
                          onClick={() => handleIconClick(4)}
                          style={{
                            background: checkedValues?.includes(4)
                              ? "#32CD32"
                              : "#98FB98",
                            borderRadius: "10px",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <FaTree style={{ color: "#fff" }} />
                        </div>
                      </GardningIconStyle>
                    </div>
                  </IconStyle>
                </div>
              </div>
            </div>
            {/* <div>
            <strong>체크된 값 </strong> {checkedValues?.join(", ")}
          </div> */}
            <div className="text-area-div">
              <label htmlFor="text">기타사항</label>
              <div className="text-area-style">
                <TextArea
                  valueDatas={content}
                  setTextData={setContent}
                  maxLength={100}
                ></TextArea>
              </div>
            </div>
            <div style={{ justifyContent: "end" }}>
              <button
                className="btn"
                style={{ background: "rgb(35, 47, 175)" }}
                onClick={() => {
                  postPlantSchCalendar(
                    plantSeq,
                    clickDay,
                    checkedValues,
                    content,
                  );
                  // 등록 페이지가 있을 시 빼고 얘기해보고 필요없다 하면
                  // 그냥 무조건 등록 / 수정
                  // const plantSeq = 11;
                  // const gardning = "1,2,3,4";
                  // const contents = "asdfasdfasdfasfsadfsda";
                  // postPlantSchCalendar(plantSeq, modContent, gardning, contents);
                }}
              >
                등록
              </button>
            </div>
          </form>
        </DetailDivInnerStyle>
      </DetailDivStyle>
    </div>
  );
};

export default CalendarResister;
