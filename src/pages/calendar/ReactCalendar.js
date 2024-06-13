import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
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
import { FaSeedling, FaSun, FaTree, FaWind } from "react-icons/fa6";
import { LuWind } from "react-icons/lu";
import { BsWind } from "react-icons/bs";
// ***************************************** 환기 아이콘  ********************************************* //

// ***************************************** 형태(가지치기)  아이콘  ********************************************* //
import { RiTreeFill } from "react-icons/ri";
import { BiSolidTreeAlt } from "react-icons/bi";
import { RiPlantFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Loading from "../../components/common/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { getMonthCalendar } from "../../axios/calendar/calendar";
// ***************************************** 형태(가지치기) 아이콘  ********************************************* //

const ReactCalendarStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const ReactCalendarListStyle = styled.div`
  border: 1px solid gray;
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
  // 이건 api 만들어지면 해당 데이터 아이디 매칭해야됨
  // 데이터도 가라임
  // todoApi
  const [allData, setAllData] = useState([]);
  // 조회
  const getMonthCalendars = async () => {
    const result = await getMonthCalendar();
    console.log(result);
    return result;
  };
  useEffect(() => {
    getMonthCalendars();
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
    // map으로 객체 1,2,3,4 값에 해당 되는 아이콘 빼기.
    const uiIcon = {
      1: <FaSun size="20" style={{ color: "#fff" }} />,
      2: <FaSeedling size="20" style={{ color: "#fff" }} />,
      3: <FaWind size="20" color="#fff" />,
      4: <FaTree size="20" style={{ color: "#fff" }} />,
    };

    if (dayResult) {
      return (
        <div>
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
      toast.success("조회 되었습니다.");
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
    <ReactCalendarStyle>
      <TitleDivStyle>일정 관리</TitleDivStyle>

      <div>
        {/* 굳이 밑에 리스트형식 및 아이콘으로 표현 해주는데 알려줄 필요가 있나? */}
        {/* <div>
          {clickDay}의 상세정보 : {clickInfo?.title}
        </div> */}
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
      {/* <ToastContainer /> */}
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
        <div>
          <FaSun size="20" style={{ color: "#000" }} />
          <FaSeedling size="20" style={{ color: "#000" }} />
          <FaWind size="20" color="#000" />
          <FaTree size="20" style={{ color: "#000" }} />
        </div>
        {calendarFilterData?.map((item, index) => (
          <CalendarList key={item.pk} item={item}></CalendarList>
        ))}
      </ReactCalendarListStyle>
    </ReactCalendarStyle>
  );
};

export default ReactCalendar;
