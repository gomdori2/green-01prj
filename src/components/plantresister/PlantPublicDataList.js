import styled from "@emotion/styled";
const FixedArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2000px;
  background: rgba(239, 239, 239, 0.5);
  visibility: visible;
  display: none;
`;
const PlantPublicDataListStyle = styled.div`
  position: absolute;
  top: 20%;
  left: 40%;
  display: none;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
  background-color: #fff;
  max-width: 500px;
  height: 600px;
  li {
    display: flex;
    width: 100%;
  }
  a {
    display: block;
  }
`;

const PlantPublicDataList = ({ setIsClicked }) => {
  return (
    <>
      <FixedArea
        id="popupWrap"
        onClick={() => {
          setIsClicked(false);
        }}
      ></FixedArea>
      {/* 팝업 작업해야함 */}
      {/* 데이터 불러오기 */}
      {/* 데이터 클릭 시 앞 컴포넌트에 input에 보내기 */}
      {/* 팝업이랑 구분해놓음 */}
      {/* 체크박스 click 시 직접 등록 / 아니면 식물 불러오기 버튼으로 ... */}
      <PlantPublicDataListStyle id="popupInner">
        <div>공공데이터</div>
        <li>
          <div>
            <label>이미지</label>
            <img src=""></img>
          </div>
          <div>
            <label>식물명</label>
          </div>
        </li>
      </PlantPublicDataListStyle>
    </>
  );
};

export default PlantPublicDataList;
