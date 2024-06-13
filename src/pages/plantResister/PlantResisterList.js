import styled from "@emotion/styled";
import PlantRegisterList from "../../components/plantresister/PlantRegisterList";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../axios/plantresister/plantresister";
import PageNation from "../../components/common/PageNation";
import { toast } from "react-toastify";
import Loading from "../../components/common/Loading";
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
  const [todoApiData, setTodoApiData] = useState(["todoApi"]);
  const [list, setList] = useState([]);
  const [userSeq, setUserSeq] = useState(3);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const getDataList = async ({ userSeq, page }) => {
    // setIsLoading(true);

    const result = await getData({ userSeq, page });
    const stauts = result.status.toString().charAt(0);
    if (stauts === "2") {
      setList(result?.data.data.list);
      setPageCount(result?.data.data.totalPage);
      console.log(result);
    }
    setIsLoading(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    getDataList({ userSeq, page });
  }, [page]);
  // handlePageChange 페이지 네이션 클릭 시 마다 이벤트
  const handlePageChange = data => {
    setPage(data.selected + 1);
    // getDataList({ userSeq: userSeq, size: size, page: page });
  };

  // if (isLoading) {
  //   return <Loading></Loading>;
  // }
  return (
    <ReactCalendarStyle>
      <TitleDivStyle></TitleDivStyle>
      <ReactCalendarListStyle>
        <CalendarListUlStyle>
          <li>
            <span>이미지</span>
            <span>애칭</span>
            <span>기타사항</span>
          </li>
        </CalendarListUlStyle>
        {/* 인덱스로 받는거 pk로 바꿔야함. */}
        {list?.map((item, index) =>
          item ? (
            <PlantRegisterList key={item.pk} index={index} item={item} />
          ) : null,
        )}

        <button
          onClick={() => {
            navigate(`/PlantResister`);
          }}
        >
          등록
        </button>
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
