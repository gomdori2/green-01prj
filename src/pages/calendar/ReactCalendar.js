import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import CalendarList from "../../components/calendar/CalendarList";
// ***************************************** 물주기 아이콘  ********************************************* //
import { GiWateringCan } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { GiPlantWatering } from "react-icons/gi";
// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 환경(일조량) 아이콘  ********************************************* //
import { PiSunFill } from "react-icons/pi";
import { CiSun } from "react-icons/ci";
import { IoIosSunny } from "react-icons/io";
// ***************************************** 환경(일조량) 아이콘  ********************************************* //

// ***************************************** 환기 아이콘  ********************************************* //
import { FaWind } from "react-icons/fa6";
import { LuWind } from "react-icons/lu";
import { BsWind } from "react-icons/bs";
// ***************************************** 환기 아이콘  ********************************************* //

// ***************************************** 형태(가지치기)  아이콘  ********************************************* //
import { RiTreeFill } from "react-icons/ri";
import { BiSolidTreeAlt } from "react-icons/bi";
import { RiPlantFill } from "react-icons/ri";
import { Link } from "react-router-dom";
// ***************************************** 형태(가지치기) 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

// ***************************************** 물주기 아이콘  ********************************************* //

const ReactCalendar = () => {
  const [calendarFilterData, setCalendarFilterData] = useState([]);
  // 날짜 요일 출력
  // 캘린더의 날짜 출력을 US 달력으로 변경하기
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };

  // 특정 날짜 클래스 적용하기
  //   const tileClassName = ({ date }) => {
  //     // 날짜 요일 잡아주기
  //     // 0 > Sun May 26 2024 00:00:00 GMT+0900 (한국 표준시) _ 일요일임.
  //     // console.log(date.getDay());
  //     const day = date.getDay();
  //     let classNames = "";
  //     // 화요일
  //     if (day === 2) {
  //       classNames += "rain";
  //     }
  //     if (day === 4) {
  //       classNames += "thu";
  //     }
  //     return classNames;
  //   };

  // 외부 데이터의 내용을 날짜에 출력하기
  // axios.get("todos") 리턴결과

  const todoApi = [
    {
      pk: 1,
      title: [1],
      text: "내용1",
      day: "2024-06-01",
      img: "/logo192.png",
    },
    {
      pk: 2,
      title: [1, 2, 3, 4],
      text: "내용8",
      day: "2024-05-31",
      img: "/logo192.png",
    },
    {
      pk: 3,
      title: [1, 2, 3, 4],
      text: "내용7",
      day: "2024-05-31",
      img: "/logo192.png",
    },
    {
      pk: 4,
      title: [1, 2, 3, 4],
      text: "내용6",
      day: "2024-05-31",
      img: "/logo192.png",
    },

    {
      pk: 5,
      title: [3],
      text: "내용3",
      day: "2024-06-04",
      img: "/logo192.png",
    },
    {
      pk: 6,
      title: [4],
      text: "내용4",
      day: "2024-06-29",
      img: "/logo192.png",
    },
  ];
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    setAllData(todoApi);
    return () => {};
  }, []);
  // 내용 출력하기
  const tileContent = ({ date }) => {
    // MM : 2자리 월
    // DD : 2자리 일

    const checkDay = moment(date).format("yyyy-MM-DD");
    // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
    const dayResult = allData.find(item => checkDay === item.day);

    //const filteredDay = ;

    const uiIcon = {
      1: <PiSunFill size="20" color="yellow" />,
      2: <GiPlantWatering size="20" color="#fff" />,
      3: <FaWind size="20" color="blue" />,
      4: <RiTreeFill size="20" color="#fff" />,
    };
    if (dayResult) {
      return (
        <div>
          <h2></h2>
          {dayResult.title.map(iconKey => (
            <span key={iconKey}>{uiIcon[iconKey]}</span>
          ))}
        </div>
      );
    }
  };
  // 날짜 css 꾸미기
  const tileClassName = ({ date }) => {
    // MM : 2자리 월
    // DD : 2자리 일

    const checkDay = moment(date).format("yyyy-MM-DD");
    // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
    const dayResult = allData.find(item => checkDay === item.day);
    if (dayResult) {
      return "sun";
    }
  };
  // 일자의 날짜 출력 포맷 변경하기
  // 오늘날짜 리스트에서 보여주기
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));
  const [clickInfo, setClickInfo] = useState(null);
  useEffect(() => {
    // 죄송합니다. 강제로 onClickDay 함수를
    // 실행하면서 날짜를 전달하였습니다.
    console.log();
    onClickDay(moment().format("yyyy-MM-DD"));
  }, []);
  const formatDay = (locale, date) => moment(date).format("D");
  // 날짜 선택 시 처리
  const onClickDay = (value, event) => {
    const checkDay = moment(value).format("yyyy-MM-DD");
    setClickDay(checkDay);
    // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
    const dayResult = allData.find(item => checkDay === item.day);
    if (dayResult) {
      setClickInfo(dayResult);
    } else {
      setClickInfo(null);
    }
  };
  // getOneData
  useEffect(() => {
    const dayFilterData = allData.filter(item => item.day === clickDay);
    console.log(dayFilterData);
    setCalendarFilterData(dayFilterData);
  }, [clickDay]);
  // ************************* 데이터 변경 ********************************* //
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div>
        {clickDay}의 상세정보 : {clickInfo?.title}
      </div>
      <div>
        <Calendar
          calendarType={"gregory"}
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
          tileContent={tileContent}
          formatDay={formatDay}
          onClickDay={onClickDay}
          value={clickDay}
        />
      </div>
      {calendarFilterData?.map((item, index) => (
        <CalendarList key={item.pk} item={item}></CalendarList>
      ))}
    </div>
  );
};

export default ReactCalendar;
