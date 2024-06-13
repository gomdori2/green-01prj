import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getOpenData } from "../../axios/plantresister/plantresister";
import PageNation from "../common/PageNation";
import Loading from "../common/Loading";
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
  padding: 5px;
  position: absolute;
  top: 3%;
  left: 38%;
  display: none;
  flex-direction: column;
  margin: 0 auto;
  gap: 10px !important;
  background-color: #fff;
  max-width: 600px;
  height: 900px;
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
  label::after {
    content: "";
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
  .btn {
    padding: 8px 12px;
    background-color: #4caf50;
    color: white;
    border-radius: 4px;
    align-self: center;
  }
  .imgBox {
    padding-left: 93px;
  }
  .imgStyle {
    width: 110px;
    height: 60px !important;
  }
  .fontStyle {
  }
  .spanStyle {
    font-weight: 700;
    font-size: 16px;
    display: block;
    width: 100%;
    padding-right: 30px;
  }
  .search-Box-Inner {
    display: flex;
    justify-content: end;
    gap: 0;
    padding-right: 10px;
  }
`;

const PlantPublicDataList = ({ setIsClicked, setOdataSeq, setPlantName }) => {
  // 팝업에서 데이터 빼서 앞에 input에 넘기기
  // 앞에 있는 곳에서 set 만 넘겨서 담아서 올릴 것

  // 검색
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openListData, setOpenListData] = useState([]);
  // 페이징 때문에....
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [onPageChange, setOnPageChange] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // setOdataSeq > click 했을 때 seq 담아야함
  const publicClick = async ({ searchKeyword, size, page }) => {
    setIsLoading(true);
    try {
      const result = await getOpenData({ searchKeyword, size, page });
      setOpenListData(result.data.data.list);
      setPageCount(result.data.data.totalPage);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    publicClick({
      searchKeyword: searchKeyword,
      page: page,
    });
  }, [searchKeyword, page]);
  // handlePageChange 페이지 네이션 클릭 시 마다 이벤트
  const handlePageChange = data => {
    setPage(data.selected + 1); // 페이지 번호를 1부터 시작하도록 조정
    setCurrentPage(data.selected);
  };
  // 페이징이랑 뭔가 안맞음
  if (isLoading) {
    return (
      <PlantPublicDataListStyle id="popupInner">
        <Loading></Loading>
      </PlantPublicDataListStyle>
    );
  }
  return (
    <>
      <FixedArea
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
            <div>
              <div className="">
                <label style={{ width: "100px" }}>식물명</label>
                <input
                  onChange={e => {
                    setSearchKeyword(e.target.value);
                    // if (e.target.key === 27) {
                    // }
                  }}
                />
                <button
                  style={{ marginLeft: "15px" }}
                  onClick={() => {
                    publicClick({ searchKeyword, size, page });
                  }}
                  className="post-all btn"
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
        {openListData.map(item => (
          <li
            key={item.plantPilbkNo}
            onClick={() => {
              if (confirm("선택하시겠습니까?")) {
                setOdataSeq(item.plantPilbkNo);
                setPlantName(item.plantGnrlNm);
                setIsClicked(false);
              }
            }}
          >
            <div className="imgBox">
              <img className="imgStyle" src={item.imgUrl}></img>
            </div>
            <div>
              <span className="spanStyle">{item.plantGnrlNm}</span>
            </div>
          </li>
        ))}
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
