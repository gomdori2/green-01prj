import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
// ***************************************** 물주기 아이콘  ********************************************* //
import { GiWateringCan } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { GiPlantWatering } from "react-icons/gi";
// ***************************************** 환경 아이콘  ********************************************* //
import { PiSunFill } from "react-icons/pi";
import { CiSun } from "react-icons/ci";
// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

const ReactCalendar = () => {
  const [calendarData, setCalendarData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // ************************* 데이터 ********************************* //
  // 그냥 옛날에 서버 파둔거 활용 get
  const getDateList = async () => {
    // 일단 events로 함.
    const data = { title: "ㅁㄴㅇㄹ" };
    setCalendarData(data);

    // try {
    //   const response = await axios.get("");
    //   if (response.status === 200) {
    //     setCalendarData(response.data);
    //   }
    //   return response;
    // } catch (error) {
    //   console.log(error);
    // }
  };
  // 일단 events로 함
  //   useEffect(() => {
  //     getDateList();
  //   }, []);

  useEffect(() => {
    const handleClick = () => {
      console.log(calendarData);
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [calendarData]);
  // ************************* 데이터 ********************************* //

  // ************************* 데이터 변경 ********************************* //
  // 객체 리터럴에 메서드로 한번에 하려 했는데
  // 따로 정의하는게 좋다라고 gpt 쪽에서 알려줘서 수정
  // 얘(events)를 axios로 데이터 받아서 써야할듯싶음.
  // date 양식이 2024-05-30 이런식으로 넣으니까 안됬었음.
  // 아이콘이 들어가야 될듯 싶은데...
  const asd = `img.jpg`;
  const events = [
    { date: new Date(2024, 5, 30), text: "ss" },
    { date: new Date(2024, 5, 15), text: "내용2" },
  ];
  // 텍스트 변경
  function changeAllTexts(newText) {
    events.forEach(event => {
      event.text = newText;
    });
  }

  // axios로 받아온 값 forEach로 텍스트 변경
  // 일단 연습용이라 a() 이런 식으로 해둠.
  function a() {
    // 계속 못돌게 막아놓음.
    if (!calendarData) return;
    calendarData.forEach(data => {
      console.log(data);
      changeAllTexts(data?.title);
    });
  }
  a();
  // 데이터 넣는 양식 인거 같은데 조금 알아봐야함
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      // 날짜 / 월 / 년도을 events와 date의 날짜와 비교하기 위한 거 같음
      const event = events.find(
        event =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear(),
      );
      const ac = moment(event).format("YYYY,MM,DD");
      console.log(ac === "2024,06,03");
      // 어차피 각각의 아이콘이 여러개 들어가야함.
      return ac === "2024,06,03" ? (
        <>
          <GiPlantWatering color="blue" />
          <PiSunFill color="yellow" />
          <GiPlantWatering color="blue" />
        </>
      ) : null;
    }
  };
  const handleDateClick = date => {
    setSelectedDate(date);
    console.log("Clicked date:", date);
    console.log(selectedDate);
    const dates = new Date("Sat Jun 01 2024 19:21:27 GMT+0900");
    const formattedDate = moment(dates).format("YYYY,MM,DD");
    console.log(formattedDate);
  };
  // ************************* 데이터 변경 ********************************* //
  return (
    <div>
      <Calendar
        value={selectedDate}
        tileContent={tileContent}
        onClickDay={handleDateClick}
      />
    </div>
  );
};

export default ReactCalendar;
