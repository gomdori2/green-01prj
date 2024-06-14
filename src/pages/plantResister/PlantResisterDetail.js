import styled from "@emotion/styled";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TextArea from "../../components/common/TextArea";
import { useLocation, useSearchParams } from "react-router-dom";
import { getOneData } from "../../axios/plantresister/plantresister";
import { userInfoContext } from "../../context/UserInfoProvider";

// 클래스로 바꿔라 제발
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
    width: 30%;
  }
`;
const PlantResisterDetail = () => {
  // text area 때문에 만들어 놓음
  // 이미지 하나 있어야함.
  const { localUserData } = useContext(userInfoContext);
  const [plantNickName, setPlantNickName] = useState("");
  const [plantOpenImg, setPlantOpenImg] = useState("");
  const [textData, setTextData] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  // 팝업 데이터 받아와야함
  const data = useLocation();
  const [publicPlantsData, setPublicPlantsData] = useState({});
  const [plantSeq, setPlantSeq] = useState();
  const [userSeq, setUserSeq] = useState();

  useEffect(() => {
    setPlantSeq(data?.state);
    // pk 만 받아와서 뿌릴 것. _ 공공데이터 관련 사항 때문에 ... 이미지
    // post 할 데이터_상세페이지_수정, 삭제
    // 현재 안만들어둠.
    // setPlantOpenImg(data.state.img);
  }, [plantNickName, textData]);
  useEffect(() => {
    setUserSeq(localUserData?.userSeq);
  }, [localUserData]);
  useEffect(() => {
    const plantData = {
      userSeq,
      plantSeq,
    };
    console.log(plantData);
    getPlantsData(userSeq, plantSeq);
    // console.log("userSeq ", userSeq);
  }, [userSeq]);

  const putData = async () => {
    // pk 는 수정때매 필요 / 날짜는 수정 안한다해서 빼놓음.
    console.log(await axios.post("/api/post", { textData, plantNickName }));
  };
  // 해당 되는 컴포넌트 하나 필요
  const getPlantsData = async () => {
    // ;
    getOneData(userSeq, plantSeq);
    // pk 는 수정때매 필요 / 날짜는 수정 안한다해서 빼놓음.
  };
  useEffect(() => {
    console.log(isClicked);
  }, [isClicked]);

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
            <label>식물명</label>
            <input />
          </div>
          <div>
            <label>식물 애칭(별명)</label>
            <input />
          </div>

          <div className="text-area-div">
            <label htmlFor="text">기타사항</label>
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
                // putData();
              }}
            >
              수정
            </button>
            <button onClick={() => {}}>삭제</button>
          </div>
        </form>
      </DetailDivInnerStyle>
    </DetailDivStyle>
  );
};

export default PlantResisterDetail;
