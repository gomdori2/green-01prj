import styled from "@emotion/styled";
import PlantRegisterList from "../../components/plantresister/PlantRegisterList";
import { useEffect, useState } from "react";

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

const PlantResister = () => {
  const todoApi = [
    {
      // pk
      pk: 1,

      // 제목 _ 없음
      title: [1],

      // 텍스트 > 상세페이지에 출력
      text: "내용",

      // 아이콘
      gardning: [1, 2, 3, 4],

      // 날짜
      day: "2024-06-01",

      // 이미지는 공공데이터
      img: "./www/images/404Page.jpg",
    },
    {
      pk: 2,
      title: [1, 2, 3, 4],
      gardning: [1, 3, 4],
      text: "내용8",
      day: "2024-05-31",
      img: "/logo192.png",
    },
    {
      pk: 3,
      title: [1, 2, 3, 4],
      gardning: [1, 2, 3],
      text: "내용7",
      day: "2024-05-31",
      img: "/logo192.png",
    },
    {
      pk: 4,
      title: [1, 2, 3, 4],
      gardning: [2, 3, 4],
      text: "내용6",
      day: "2024-05-31",
      img: "/logo192.png",
    },

    {
      pk: 5,
      title: [3],
      text: "내용3",
      gardning: [1, 4],
      day: "2024-06-04",
      img: "/logo192.png",
    },
    {
      pk: 6,
      title: [4],
      gardning: [1],
      text: "내용4",
      day: "2024-06-29",
      img: "/logo192.png",
    },
  ];
  const [todoApiData, setTodoApiData] = useState(todoApi);

  useEffect(() => {
    setTodoApiData(todoApi);
    console.log(todoApiData);
  }, [todoApi]);

  return (
    <ReactCalendarStyle>
      <TitleDivStyle>관리 기록</TitleDivStyle>
      <ReactCalendarListStyle>
        <CalendarListUlStyle>
          <li>
            <span>이미지</span>
            <span>애칭</span>
            <span>가드닝활동</span>
            <span>날짜</span>
          </li>
        </CalendarListUlStyle>
        {todoApiData?.map(item => {
          <PlantRegisterList key={item.pk} item={item} />;
        })}
        <button onClick={() => {}}>등록</button>
      </ReactCalendarListStyle>
    </ReactCalendarStyle>
  );
};

export default PlantResister;
