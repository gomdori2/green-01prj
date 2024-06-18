import styled from "@emotion/styled";
import PlantRegisterList from "../../components/plantresister/PlantRegisterList";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../axios/plantresister/plantresister";
import PageNation from "../../components/common/PageNation";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";
import { userInfoContext } from "../../context/UserInfoProvider";
// 클래스로 바꿔라 제발
const ReactCalendarStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;
const ReactCalendarListStyle = styled.div`
  border: 1px solid gray;
  width: 100%;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  ul {
    display: flex;
    width: 100%;
    align-items: center;
    //justify-content: space-around;
  }
  span {
    display: block;
    width: 100%;
  }
  li {
    padding-left: 10px;
    height: 30px;
    width: 100%;
    border-bottom: 1px solid gray;
    display: flex;
    font-size: 18px !important;
    font-weight: 700;
    color: black;
  }
`;
const TitleDivStyle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-left: 5px;
`;
const CalendarListUlStyle = styled.div`
  display: flex;
  text-align: center;
  a {
    display: block;
  }
`;

const PlantResisterList = () => {
  const { contextUserData } = useContext(userInfoContext);
  const [userSeq, setUserSeq] = useState(null);
  const [todoApiData, setTodoApiData] = useState(["todoApi"]);
  const [list, setList] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    setUserSeq(contextUserData?.userSeq);
  }, [contextUserData]);

  useEffect(() => {}, [userSeq]);

  const getDataList = async (userSeq, page) => {
    setIsLoading(true);
    try {
      const result = await getData(userSeq, page);
      console.log(result);
      const stauts = result.status.toString().charAt(0);
      setList(result?.data.data.list);
      setPageCount(result?.data.data.totalPage);
      console.log(result);
      toast.success("조회 되었습니다.");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    getDataList(userSeq, page);
    // if (userSeq) {
    // }
  }, [userSeq, page]);
  // handlePageChange 페이지 네이션 클릭 시 마다 이벤트
  const handlePageChange = data => {
    setPage(data.selected + 1);
    // getDataList({ userSeq: userSeq, size: size, page: page });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <ReactCalendarStyle>
      <TitleDivStyle>등록 식물 리스트</TitleDivStyle>
      <ReactCalendarListStyle>
        <CalendarListUlStyle>
          <li>
            <span>이미지</span>
            <span>애칭</span>
            <span>기타사항</span>
          </li>
        </CalendarListUlStyle>
        {/* 인덱스로 받는거 pk로 바꿔야함. */}
        {list && list.length > 0 ? (
          list?.map(item => (
            <PlantRegisterList key={item.plantSeq} item={item} />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              fontWeight: "bold",
              margin: "0 auto",
              height: "100px",
              borderBottom: "1px solid gray",
            }}
          >
            등록 된 데이터가 없습니다.
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            style={{
              background: "rgb(35, 47, 175)",
            }}
            className="btn"
            onClick={() => {
              navigate(`/PlantResister`);
            }}
          >
            등록
          </button>
        </div>
      </ReactCalendarListStyle>
      {pageCount > 0 && (
        <PageNation
          pageCount={pageCount} // 총 페이지 수 예시
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </ReactCalendarStyle>
  );
};

export default PlantResisterList;
