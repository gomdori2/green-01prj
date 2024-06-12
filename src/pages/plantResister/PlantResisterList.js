import styled from "@emotion/styled";
import PlantRegisterList from "../../components/plantresister/PlantRegisterList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [seq, setSeq] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    setTodoApiData(["todoApi"]);
    console.log(todoApiData);
  }, []);

  return (
    <ReactCalendarStyle>
      <TitleDivStyle>
        등록 식물 리스트_ 기타사항늘리고 / 이미지 줄이기 height 높이기
      </TitleDivStyle>
      <ReactCalendarListStyle>
        <CalendarListUlStyle>
          <li>
            <span>이미지</span>
            <span>애칭</span>
            <span>기타사항</span>
          </li>
        </CalendarListUlStyle>
        {todoApiData?.map(item =>
          item ? <PlantRegisterList key={item.pk} item={item} /> : null,
        )}
        <button
          onClick={() => {
            navigate(`/PlantResister`);
          }}
        >
          등록
        </button>
      </ReactCalendarListStyle>
    </ReactCalendarStyle>
  );
};

export default PlantResisterList;
