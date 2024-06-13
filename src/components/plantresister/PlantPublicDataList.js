import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getOpenData } from "../../axios/plantresister/plantresister";
import PageNation from "../common/PageNation";
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

const PlantPublicDataList = ({ setIsClicked, setPlantSeq }) => {
  // 팝업에서 데이터 빼서 앞에 input에 넘기기
  // 앞에 있는 곳에서 set 만 넘겨서 담아서 올릴 것

  // 검색
  const [searchKeyword, setSearchKeyword] = useState("");

  // 페이징 때문에....
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [onPageChange, setOnPageChange] = useState();
  const [currentPage, setCurrentPage] = useState();
  // setPlantSeq > click 했을 때 seq 담아야함
  const clickData = () => {
    // setPlantSeq > click 했을 때 seq 담아야함
    // 이름 x seq만 넘겨달라함.
    setPlantSeq("seq");
  };
  const publicClick = async ({ searchKeyword, size, page }) => {
    try {
      const result = await getOpenData({ searchKeyword, size, page });
      console.log(result);
      setPageCount(result.data.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  // handlePageChange 페이지 네이션 클릭 시 마다 이벤트
  const handlePageChange = data => {
    publicClick({
      searchKeyword: searchKeyword,
      size: 10,
      page: data.selected,
    });
    setCurrentPage(data.selected);
    setPage(data.selected + 1); // 페이지 번호를 1부터 시작하도록 조정
  };

  useEffect(() => {}, [searchKeyword, currentPage]);

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
                <input
                  onChange={e => {
                    setSearchKeyword(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    publicClick({ searchKeyword, size, page });
                  }}
                >
                  검색
                </button>
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
        {/* 페이지 네이션 
          pageCount : 총페이지 갯수
          onPageChange : page 클릭 할 때 마다 이벤트 
          currentPage : 클릭한 값의 전 값.
        */}
        {pageCount > 0 && (
          <PageNation
            pageCount={pageCount} // 총 페이지 수 예시
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
      </PlantPublicDataListStyle>
    </>
  );
};

export default PlantPublicDataList;
