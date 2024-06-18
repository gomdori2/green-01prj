import styled from "@emotion/styled";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TextArea from "../../components/common/TextArea";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  deleteData,
  getOneData,
  patchData,
} from "../../axios/plantresister/plantresister";
import { userInfoContext } from "../../context/UserInfoProvider";
import { TbPlantOff } from "react-icons/tb";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";
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
  const navigate = useNavigate();
  if (!contextUserData) {
    return;
  }
  const data = useLocation();
  const [dataObj, setDataObj] = useState(null);
  const { plantSeq, userSeq } = data.state;
  // 디테일 데이터 db에서 받아온 자료 dataObj
  // 각각 뿌릴때 넣어줘야할거같음.
  const [patchPlantNickName, setPatchPlantNickName] = useState("");
  const [patchEtc, setPatchEtc] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // get 계속 도는거 보기싫어서 해놓음
    if (!patchPlantNickName) {
      getPlantsData(userSeq, plantSeq);
    }
  }, [userSeq]);

  const handleClickPatch = async (
    userSeq,
    plantSeq,
    patchPlantNickName,
    patchEtc,
  ) => {
    setIsLoading(true);
    console.log(userSeq, plantSeq, patchPlantNickName, patchEtc);
    try {
      await patchData(userSeq, plantSeq, patchPlantNickName, patchEtc);
      toast.success("수정되었습니다.");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getPlantsData = async () => {
    setIsLoading(true);
    try {
      const result = await getOneData(userSeq, plantSeq);
      setDataObj(result?.data.data);
      setPatchPlantNickName(result?.data.data.plantNickName);
      setPatchEtc(result?.data.data.etc);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(isClicked);
  }, [isClicked]);
  useEffect(() => {}, [patchPlantNickName, patchEtc]);
  // 따로 변경될 사항이 아니라서 ...
  const handleClickDelete = async () => {
    setIsLoading(true);
    try {
      await deleteData(userSeq, plantSeq);
      toast.success(`${patchPlantNickName}삭제 되었습니다.`);
      navigate("/plantResisterList");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <DetailDivStyle>
      <TitleDivStyle>등록 식물 상세 페이지</TitleDivStyle>
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
              {dataObj?.plantPic ? (
                <img
                  style={{ width: "196px", height: "120px" }}
                  src={dataObj?.plantPic}
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
                <input value={dataObj?.plantName} readOnly />
              </div>
              <div>
                <label>식물애칭</label>
                <input
                  value={patchPlantNickName}
                  onChange={e => {
                    setPatchPlantNickName(e.target.value);
                    console.log(patchPlantNickName);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-area-div">
            <label htmlFor="text">기타사항</label>
            <div className="text-area-style">
              <TextArea
                valueDatas={patchEtc}
                setTextData={setPatchEtc}
                maxLength="100"
              ></TextArea>
            </div>
          </div>
          <div style={{ gap: "10px", justifyContent: "end" }}>
            {/* 제발 좀 객체 따놓고 스트링 붙여서 보내지말자 */}
            <button
              type="button"
              className="btn"
              onClick={() => {
                handleClickPatch(
                  userSeq,
                  plantSeq,
                  patchPlantNickName,
                  patchEtc,
                );
              }}
            >
              수정
            </button>
            <button
              className="btn"
              style={{ background: "red" }}
              onClick={() => {
                handleClickDelete(userSeq, plantSeq);
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
