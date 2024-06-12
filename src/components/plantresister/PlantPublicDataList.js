import styled from "@emotion/styled";
import { useState } from "react";
// 클래스로 바꿔라 제발
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
  padding: 20px;
  position: absolute;
  top: 15%;
  left: 38%;
  display: none;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
  background-color: #fff;
  max-width: 500px;
  height: 600px;
  border-radius: 10px;
  box-shadow: 4px gray;
  @media screen and (max-width: 1024px) {
    transition: left 0.3s;
    left: 23%;
  }
  @media screen and (max-width: 700px) {
    transition: left 0.3s;
    left: 10%;
  }
  label {
    display: block;
    width: 100%;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
  }
  a {
    display: block;
  }
`;

const PlantPublicDataList = ({ setIsClicked }) => {
  // 팝업에서 데이터 빼서 앞에 input에 넘기기
  // 앞에 있는 곳에서 set 만 넘겨서 담아서 올릴 것

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
        <div>식물이름찾기</div>
        <li>
          <div>
            <div className="search-Box-Inner">
              <label style={{ width: "100px" }}>식물명</label>
              <div>
                <input />
                <button>검색</button>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <label>이미지</label>
          </div>
          <div>
            <label>식물명</label>
          </div>
        </li>
        {
          <li>
            <div>
              <img src=""></img>
            </div>
            <div>
              <span>111</span>
            </div>
          </li>
        }
      </PlantPublicDataListStyle>
    </>
  );
};

export default PlantPublicDataList;
