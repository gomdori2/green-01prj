import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { TbPlantOff } from "react-icons/tb";
import { getData } from "../../axios/plantresister/plantresister";
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
const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-left: 5px;
`;
const CalendarPlantsPop = ({
  setIsClicked,
  setPlantName,
  setPlantSeq,
  setImgUrl,
  userSeq,
}) => {
  // 팝업에서 데이터 빼서 앞에 input에 넘기기
  // 앞에 있는 곳에서 set 만 넘겨서 담아서 올릴 것

  // 검색
  const [searchKeyword, setSearchKeyword] = useState("");
  const [plantListData, setPlantListData] = useState([]);
  // 페이징 때문에....
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [onPageChange, setOnPageChange] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // setOdataSeq > click 했을 때 seq 담아야함
  const getPlantDataRead = async (userSeq, page) => {
    console.log(userSeq, page);
    setIsLoading(true);
    try {
      const result = await getData(userSeq, page);
      setPlantListData(result.data.data.list);
      setPageCount(result.data.data.totalPage);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(searchKeyword);
    getPlantDataRead(userSeq, page);
  }, [page]);
  // handlePageChange 페이지 네이션 클릭 시 마다 이벤트
  const handlePageChange = data => {
    setPage(data.selected + 1); // 페이지 번호를 1부터 시작하도록 조정
    setCurrentPage(data.selected);
  };

  // 페이징이랑 뭔가 안맞음
  // if (isLoading) {
  //   return (
  //     <PlantPublicDataListStyle id="popupInner">
  //       <Loading></Loading>
  //     </PlantPublicDataListStyle>
  //   );
  // }

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
        <TitleDivStyle>등록식물찾기</TitleDivStyle>
        <li>
          <div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: 0,
                  marginRight: "10px",
                }}
              >
                {/* <label style={{ width: "100px" }}>식물명</label>
                <button
                  type="button"
                  style={{ marginLeft: "15px" }}
                  onClick={() => {
                    getPlantDataRead({ searchKeyword, size, page });
                  }}
                  className="post-all btn"
                >
                  검색
                </button> */}
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
        {plantListData.map(item => (
          <li
            key={item.plantPilbkNo}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (confirm("선택하시겠습니까?")) {
                setPlantSeq(item.plantSeq);
                setPlantName(item.plantNickName);
                setImgUrl(item.plantPic);
                setIsClicked(false);
              }
            }}
          >
            <div className="imgBox">
              {item.plantPic ? (
                <img className="imgStyle" src={item.plantPic}></img>
              ) : (
                // 수정해야함.
                <TbPlantOff
                  size={40}
                  style={{ width: "110px", height: "60px !important" }}
                />
              )}
            </div>
            <div>
              <span className="spanStyle">{item.plantNickName}</span>
            </div>
          </li>
        ))}
        {/* 페이지 네이션 
          pageCount : 총페이지 갯수
          onPageChange : page 클릭 할 때 마다 이벤트 
          currentPage : 클릭한 값의 전 값.
        */}
        {pageCount && pageCount > 0 ? (
          <PageNation
            pageCount={pageCount} // 총 페이지 수 예시
            onPageChange={handlePageChange}
            currentPage={currentPage}
            forcePage={1}
          />
        ) : (
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              width: "100%",
              fontSize: "20px",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            데이터가 없습니다.
          </div>
        )}
      </PlantPublicDataListStyle>
    </>
  );
};

export default CalendarPlantsPop;
