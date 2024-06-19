import styled from "@emotion/styled";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PlantPublicDataList from "../../components/plantresister/PlantPublicDataList";
import TextArea from "../../components/common/TextArea";
import { getOpenData, postData } from "../../axios/plantresister/plantresister";
import { userInfoContext } from "../../context/UserInfoProvider";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";
import { useNavigate } from "react-router-dom";
import { TbPlantOff } from "react-icons/tb";
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
const PlantResister = () => {
  const { contextUserData } = useContext(userInfoContext);
  if (!contextUserData) {
    return;
  }
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
  const [userSeqData, setuserSeqData] = useState(0);
  const [plantName, setPlantName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [plantPic, setPlantPic] = useState();
  const navigate = useNavigate();
  // 팝업 데이터 받아와야함
  // 필요없어짐. seq만 넘기면된다함 {} X seq

  useEffect(() => {
    const datas = {
      userSeq: contextUserData.userSeq,
      odataSeq,
      etc,
      plantNickName,
    };
    // post 할 데이터_상세페이지_수정, 삭제
    // 아직 안됨. - 공공데이터

    // postData({ userSeqData, plantsName, etc, plantNickName });
  }, [plantNickName, etc]);
  // 일단 default로 보냄.
  // 해당 되는 컴포넌트 하나 필요
  const isClickFunc = () => {
    setIsClicked(true);
  };
  const postHandler = async ({
    userSeq: userSeqDataData,
    odataSeq,
    plantNickName,
    etc,
  }) => {
    setIsLoading(true);
    try {
      await postData({
        userSeq: userSeqDataData,
        odataSeq,
        plantNickName,
        etc,
      });
      toast.success("등록 되었습니다.");
      navigate("/plantResisterList");
    } catch (error) {
      toast.error("오류가 발생하였습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {}, [isClicked]);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginLeft: "20px",
      }}
    >
      <TitleDivStyle>식물 등록 페이지</TitleDivStyle>
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <label>식물명</label>
                  <div style={{ marginLeft: "13px", gap: 15 }}>
                    <input
                      value={plantName ? plantName : ""}
                      style={{ width: "120px" }}
                      readOnly
                      placeholder="불러오기로 등록"
                    />
                    {isClicked ? (
                      <PlantPublicDataList
                        // setOdataSeq={setOdataSeq}
                        setIsClicked={setIsClicked}
                        setOdataSeq={setOdataSeq}
                        setPlantName={setPlantName}
                        setPlantPic={setPlantPic}
                      />
                    ) : null}
                    <button
                      type="button"
                      className="btn"
                      style={{ background: "rgb(35, 47, 175)" }}
                      onClick={() => isClickFunc()}
                    >
                      불러오기
                    </button>
                  </div>
                </div>
                <div className="flex-box-div">
                  <label>식물애칭</label>
                  <input
                    value={plantNickName}
                    onChange={e => {
                      setPlantNickName(e.target.value);
                    }}
                    placeholder="식물 애칭을 입력해주세요."
                  />
                </div>
              </div>
            </div>
            <div className="flex-box-div text-area-div">
              <label htmlFor="text">기타사항</label>
              <div className="text-area-style">
                <TextArea
                  valueDatas={etc}
                  setTextData={setEtc}
                  maxLength={100}
                ></TextArea>
              </div>
            </div>
            <div
              className="flex-box-div"
              style={{ display: "flex", justifyContent: "end", gap: 15 }}
            >
              <button
                type="button"
                className="btn"
                style={{ background: "rgb(35, 47, 175)" }}
                onClick={() => {
                  postHandler({
                    userSeq: contextUserData.userSeq,
                    odataSeq,
                    plantNickName,
                    etc,
                  });
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

export default PlantResister;
