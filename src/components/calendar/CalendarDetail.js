import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TextArea from "../common/TextArea";
import { FaSeedling, FaSun, FaTree, FaWind } from "react-icons/fa6";
import {
  calendarPatchData,
  deletePlantSch,
  postPlantSch,
} from "../../axios/calendar/calendar";
import { userInfoContext } from "../../context/UserInfoProvider";

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
const CalendarDetail = () => {
  const location = useLocation();
  // 앞에서 받으면 편한거 같긴한데 일단 선언해서사용
  const { contextUserData } = useContext(userInfoContext);
  const [userSeq, setUserSeq] = useState(null);
  const { plantManagementSeq } = useParams(1);
  // location.state가 null일 경우 빈 객체로 대체_ null 났을 때 오류 잡으려고
  // const state = location.state || {};
  // const { title, text, day } = state;
  // const [titleData, setTitilData] = useState();
  // const [textData, setTextData] = useState();
  const [checkedValues, setCheckedValues] = useState([]);
  const [modContent, setModContent] = useState(1, 2, 3, 4);
  useEffect(() => {
    setUserSeq(contextUserData.userSeq);

    console.log(userSeq);
    return () => {};
  }, []);

  useEffect(() => {
    console.log(userSeq);
    return () => {};
  }, [userSeq]);

  const item = {
    managementDate: "2024-02-20",
    plantPic: "ss",
    plantName: "asdasd",
    gardning: "1,2,3",
    content: "테스트 내용",
  };
  const { managementDate, plantPic, plantName, gardning, content } = item;
  useEffect(() => {
    // 받아온 gardning 데이터 1,2,3,4 넣어주자
    // 이외에 데이터는 그냥 쓰믄됨
    const gardeningArray = item.gardning.split(",").map(num => parseInt(num));
    console.log(gardeningArray);
    setCheckedValues(gardeningArray);
    console.log(checkedValues);
    //setCheckedValues(arrayGardning);
    //const datas = { titleData, textData, checkedValues };
    // post 할 데이터_상세페이지_수정, 삭제
    // console.log(datas);
  }, []);

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
  const uiIcon = {
    1: <FaSun size="20" style={{ color: "#fff" }} />,
    2: <FaSeedling size="20" style={{ color: "#fff" }} />,
    3: <FaWind size="20" color="#fff" />,
    4: <FaTree size="20" style={{ color: "#fff" }} />,
  };
  // ****************수정**************
  const handlePatchData = (
    plantSeq,
    plantManagementSeq,
    checkedValues,
    modContent,
  ) => {
    // 넘길때 , 떼고 숫자로 넘김
    const checkeArray = checkedValues.join("");
    const parseCheckeArray = parseInt(checkeArray);
    calendarPatchData(
      plantSeq,
      plantManagementSeq,
      parseCheckeArray,
      modContent,
    );
  };
  // ****************등록 : 등록페이지가 있어야하면 뺄것.**************
  const postPlantSchCalendar = async (
    plantSeq,
    modContent,
    gardning,
    contents,
  ) => {
    const result = await postPlantSch(plantSeq, modContent, gardning, contents);
    return result;
  };
  // ****************삭제**************
  const deleteData = async () => {
    // 일단 값을 넣어서 보냄\
    // plantManagementSeq 확인 해볼 것
    await deletePlantSch(userSeq, plantManagementSeq);
  };
  return (
    <DetailDivStyle>
      <DetailDivInnerStyle>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          {/* 날짜 / 순번은 고정 값이라 변경 예정 */}
          <div>
            <label>관리날짜</label>
            <input id="day" value={managementDate} readOnly />
          </div>
          <div>
            <label>등록식물</label>
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
          <div>
            <strong>체크된 값 </strong> {checkedValues?.join(", ")}
          </div>
          <div className="text-area-div">
            <label htmlFor="text">기타사항</label>
            <div className="text-area-style">
              <TextArea
                valueDatas={modContent}
                setTextData={setModContent}
                maxLength={100}
              ></TextArea>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                const plantManagementSeq = 1;
                const plantSeq = 10;
                handlePatchData(
                  plantSeq,
                  plantManagementSeq,
                  checkedValues,
                  modContent,
                );
                // 등록 페이지가 있을 시 빼고 얘기해보고 필요없다 하면
                // 그냥 무조건 등록 / 수정
                // const plantSeq = 11;
                // const gardning = "1,2,3,4";
                // const contents = "asdfasdfasdfasfsadfsda";
                // postPlantSchCalendar(plantSeq, modContent, gardning, contents);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                deleteData(userSeq, plantManagementSeq);
              }}
            >
              삭제
            </button>
          </div>
        </form>
      </DetailDivInnerStyle>
    </DetailDivStyle>
  );
};

export default CalendarDetail;
