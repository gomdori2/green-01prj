import styled from "@emotion/styled";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TextArea from "../../components/common/TextArea";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  deleteData,
  getOneData,
  patchData,
} from "../../axios/plantresister/plantresister";
import { userInfoContext } from "../../context/UserInfoProvider";
import { TbPlantOff } from "react-icons/tb";
// 클래스로 바꿔라 제발
const DetailDivStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;

  padding: 20px;
`;
const DetailDivInnerStyle = styled.div`
  border: 1px solid gray;
  padding: 30px;
  box-shadow: 2px 2px 2px gray;
  border-radius: 4px 4px 4px 4px;
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
  .divBoxStyle {
    display: flex;
    flex-direction: column;
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
    width: 30%;
  }
  label::after {
    content: "";
  }
`;
const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-left: 5px;
`;
const PlantResisterDetail = () => {
  // text area 때문에 만들어 놓음
  // 이미지 하나 있어야함.
  const { contextUserData } = useContext(userInfoContext);
  if (!contextUserData) {
    return;
  }

  const [plantNickName, setPlantNickName] = useState("");
  const [plantOpenImg, setPlantOpenImg] = useState("");
  const [etc, setEtc] = useState("");
  const [plantName, setPlantName] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  // 팝업 데이터 받아와야함
  const data = useLocation();
  const [publicPlantsData, setPublicPlantsData] = useState({});
  const [plantSeq, setPlantSeq] = useState(0);
  const [userSeq, setUserSeq] = useState();
  const [plantPic, setPlantPic] = useState(null);
  useEffect(() => {
    // setPlantSeq(data?.state);
    setPlantSeq(1);
    // pk 만 받아와서 뿌릴 것. _ 공공데이터 관련 사항 때문에 ... 이미지
    // post 할 데이터_상세페이지_수정, 삭제
    // 현재 안만들어둠.
    // setPlantOpenImg(data.state.img);
  }, [plantNickName, etc]);
  useEffect(() => {
    setUserSeq(contextUserData?.userSeq);
  }, [contextUserData]);
  useEffect(() => {
    const plantData = {
      userSeq,
      plantSeq,
    };
    // axios는 됨
    if (userSeq && plantSeq) {
      getPlantsData(userSeq, plantSeq);
    }
    // console.log("userSeq ", userSeq);
  }, [userSeq]);

  const handleClickPatch = async (userSeq, plantSeq, plantNickName, etc) => {
    // pk 는 수정때매 필요 / 날짜는 수정 안한다해서 빼놓음.
    patchData({ userSeq, plantSeq, plantNickName, etc });
  };
  const getPlantsData = async () => {
    getOneData(userSeq, plantSeq);
  };
  useEffect(() => {
    console.log(isClicked);
  }, [isClicked]);
  // 따로 변경될 사항이 아니라서 ...
  const handleClickDelete = () => {
    console.log(userSeq, plantSeq);
    deleteData(userSeq, plantSeq);
  };

  return (
    <DetailDivStyle>
      <TitleDivStyle>등록 식물 리스트</TitleDivStyle>
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
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {plantPic ? (
                <img
                  style={{ width: "196px", height: "120px" }}
                  src={plantPic}
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
            <div className="divBoxStyle">
              <div>
                <label>식물명</label>
                <input value={plantName} readOnly />
              </div>
              <div>
                <label>식물애칭</label>
                <input
                  value={plantNickName}
                  onChange={e => {
                    setPlantNickName(e.target.value);

                    console.log(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-area-div">
            <label htmlFor="text">기타사항</label>
            <div className="text-area-style">
              <TextArea
                valueDatas={etc}
                setTextData={setEtc}
                maxLength="100"
              ></TextArea>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                handleClickPatch(userSeq, plantSeq, plantNickName, etc);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                handleClickDelete();
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

export default PlantResisterDetail;
