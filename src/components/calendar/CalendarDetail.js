import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TextArea from "../common/TextArea";
import { FaSeedling, FaSun, FaTree, FaWind } from "react-icons/fa6";
import axios from "axios";

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
    width: 14%;
  }
`;
const IconStyle = styled.div`
  margin-left: 13px;
  display: flex;
  gap: 10px;
`;
const CalendarDetail = () => {
  const location = useLocation();
  const { pk } = useParams();
  // location.state가 null일 경우 빈 객체로 대체_ null 났을 때 오류 잡으려고
  const state = location.state || {};
  const { title, text, day } = state;
  const [titleData, setTitilData] = useState(title);
  const [textData, setTextData] = useState(text);
  const [checkedValues, setCheckedValues] = useState([]);

  useEffect(() => {
    const datas = { titleData, textData, checkedValues };
    // post 할 데이터_상세페이지_수정, 삭제

    console.log(datas);
  }, [titleData, textData, checkedValues]);
  const putData = async () => {
    // pk 는 수정때매 필요 / 날짜는 수정 안한다해서 빼놓음.
    console.log(
      await axios.put("/api/put", { pk, titleData, textData, checkedValues }),
    );
  };

  const deleteData = async () => {
    console.log(await axios.delete("/api/delete", { pk }));
  };
  const handleIconClick = value => {
    setCheckedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(item => item !== value)
        : [...prevValues, value],
    );
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
            <label>날짜</label>
            <input id="day" value={day} readOnly />
          </div>
          <div>
            <label>순번</label>
            <input value={pk} readOnly />
          </div>

          <div>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              value={titleData}
              onChange={e => {
                setTitilData(e.target.value);
              }}
            />
          </div>
          <div>
            {/* 가드닝 이미지 왔다갔다 시키기 / 거기에 체크박스 none + label로 아이콘에 checkbox 사용해서 값 넘기기 */}
            <label htmlFor="title">가드닝</label>
            <IconStyle>
              <div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div
                    onClick={() => handleIconClick("1")}
                    style={{
                      background: checkedValues.includes("1")
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
                    onClick={() => handleIconClick("2")}
                    style={{
                      background: checkedValues.includes("2")
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
                    onClick={() => handleIconClick("3")}
                    style={{
                      background: checkedValues.includes("3")
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
                    onClick={() => handleIconClick("4")}
                    style={{
                      background: checkedValues.includes("4")
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
                </div>
              </div>
            </IconStyle>
          </div>
          <div>
            <strong>체크된 값 </strong> {checkedValues.join(", ")}
          </div>
          <div className="text-area-div">
            <label htmlFor="text">특이사항</label>
            <div className="text-area-style">
              <TextArea
                valueDatas={textData}
                setTextData={setTextData}
              ></TextArea>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                putData();
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                deleteData();
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
