import styled from "@emotion/styled";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PlantPublicDataList from "../../components/plantresister/PlantPublicDataList";
import TextArea from "../../components/common/TextArea";
import { getOpenData, postData } from "../../axios/plantresister/plantresister";
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
const PlantResister = () => {
  const { localUserData } = useContext(userInfoContext);
  // 팝업 클릭용
  const [isClicked, setIsClicked] = useState(false);
  // text area 때문에 만들어 놓음
  // plantName 은 따로 안만듬 뒤에서 seq 받아서
  // 그거로 조회해서 내린다함.
  // const [plantsName, setPlantsName] = useState("");
  // 팝업에서 받아야함 넘겨야함.
  const [plantNickName, setPlantNickName] = useState("");
  const [etc, setEtc] = useState("");
  const [odataSeq, setOdataSeq] = useState();
  const [userSeq, setUserSeq] = useState(0);
  const [plantName, setPlantName] = useState();

  // 팝업 데이터 받아와야함
  // 필요없어짐. seq만 넘기면된다함 {} X seq

  useEffect(() => {
    setUserSeq(localUserData.userSeq);
    const datas = { userSeq, odataSeq, etc, plantNickName };
    // post 할 데이터_상세페이지_수정, 삭제
    // 아직 안됨. - 공공데이터

    // postData({ userSeq, plantsName, etc, plantNickName });
    console.log(datas);
  }, [localUserData.userSeq, plantNickName, etc]);
  // 일단 default로 보냄.
  // 해당 되는 컴포넌트 하나 필요
  const getPlantsData = async () => {
    // pk 는 수정때매 필요 / 날짜는 수정 안한다해서 빼놓음.
    await axios.get("/api/getPlants");
  };
  const isClickFunc = () => {
    setIsClicked(true);
  };
  const postHandler = async ({ userSeq, odataSeq, plantNickName, etc }) => {
    await postData({ userSeq, odataSeq, plantNickName, etc });
  };
  useEffect(() => {}, [isClicked]);

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
            <input value={plantName ? plantName : ""} readOnly />
            {isClicked ? (
              <PlantPublicDataList
                // setOdataSeq={setOdataSeq}
                setIsClicked={setIsClicked}
                setOdataSeq={setOdataSeq}
                setPlantName={setPlantName}
              />
            ) : null}
            <button type="button" onClick={() => isClickFunc()}>
              식물불러오기
            </button>
          </div>
          <div className="flex-box-div">
            <label>식물 애칭(별명)</label>
            <input
              value={plantNickName}
              onChange={e => {
                setPlantNickName(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>

          <div className="flex-box-div text-area-div">
            <label htmlFor="text">기타사항</label>
            <div className="text-area-style">
              <TextArea valueDatas={etc} setTextData={setEtc}></TextArea>
            </div>
          </div>
          <div className="flex-box-div">
            <button
              onClick={() => {
                postHandler({ userSeq, odataSeq, plantNickName, etc });
              }}
            >
              등록
            </button>
            <button onClick={() => {}}>뒤로가기</button>
          </div>
        </form>
      </DetailDivInnerStyle>
    </DetailDivStyle>
  );
};

export default PlantResister;
