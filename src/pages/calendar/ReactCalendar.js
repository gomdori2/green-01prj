import moment from "moment";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import CalendarList from "../../components/calendar/CalendarList";
import { FaSeedling, FaSun, FaTree, FaWind } from "react-icons/fa6";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDayReadSch, getMonthCalendar } from "../../axios/calendar/calendar";
import Loading from "../../components/common/Loading";
import { userInfoContext } from "../../context/UserInfoProvider";

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
  const { contextUserData } = useContext(userInfoContext);
  const [userSeq, setUserSeq] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // 날짜 요일 출력
  // 캘린더의 날짜 출력을 US 달력으로 변경하기
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    return weekName[idx];
  };
  useEffect(() => {
    setUserSeq(contextUserData.userSeq);
    console.log(userSeq);
    return () => {};
  }, []);

  useEffect(() => {
    getMonthCalendars();
  }, []);

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

  const getDayData = async (userSeq, getClickDay, page) => {
    const result = await getDayReadSch(userSeq, getClickDay, page);
    console.log(result);
    setAllData(result?.data.data.list);
    console.log(allData);
  };

  // 내용 출력하기
  // 캘린더 날짜 숫자만큼 실행 됨
  const tileContent = ({ date }) => {
    // MM : 2자리 월
    // DD : 2자리 일
    const checkDay = moment(date).format("yyyy-MM-DD");
    // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
    const dayResult = allData?.find(
      item => checkDay === item.managementDate.toString(),
    );
    //const filteredDay = ;
    // map으로 객체 1,2,3,4 값에 해당 되는 아이콘 빼기.
    const uiIcon = {
      1: <FaSun size="20" style={{ color: "#fff" }} />,
      2: <FaSeedling size="20" style={{ color: "#fff" }} />,
      3: <FaWind size="20" color="#fff" />,
      4: <FaTree size="20" style={{ color: "#fff" }} />,
    };
    // console.log(dayResult);
    if (!dayResult) {
      return (
        <div>
          {dayResult?.title.map(iconKey => (
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
    const dayResult = allData?.find(item => checkDay === item.day);
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
    console.log(allData);
    onClickDay(moment().format("yyyy-MM-DD"));
  }, []);
  const formatDay = (locale, date) => moment(date).format("D");
  // 날짜 선택 시 처리
  const onClickDay = async (value, event) => {
    setIsLoading(true);
    try {
      const checkDay = moment(value).format("yyyy-MM-DD");
      setClickDay(checkDay);
      await getDayData(contextUserData.userSeq, checkDay, page);
      // 아래 구문은 api 데이터의 날짜와 현재 체크 날짜를 비교한다.
      // const dayResult = allData?.find(
      //   item => checkDay.toString() === item.managementDate,
      // );
      if (allData) {
        toast.success("조회 되었습니다.");
      } else {
        setAllData(null);
      }
    } catch (error) {
      toast.warning("오류가 발생하였습니다. 해당 연락처로 연락 부탁드립니다.");
    } finally {
      setIsLoading(false);
    }
  };
  // getOneData
  // useEffect(() => {
  // console.log("wwwww", allData.managementDate, clickDay);
  // const dayFilterData = allData?.filter(
  //   item => item.managementDate.toString() === clickDay.toString(),
  // );
  // console.log("asdasdadasd", dayFilterData);
  // setCalendarFilterData(dayFilterData);
  // }, []);
  // ************************* 데이터 변경 ********************************* //
  if (isLoading) {
    return <Loading></Loading>;
  }
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
        {/* plantSeq 받아서 pk로 받아넣기 */}
        {allData && allData.length > 0 ? (
          allData?.map((item, index) => (
            <CalendarList key={item.gardenSeq} item={item}></CalendarList>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              fontWeight: "bold",
              margin: "0 auto",
              height: "70px",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid gray",
              width: "100%",
            }}
          >
            등록 된 식물이 없습니다.
          </div>
        )}
        <div style={{ textAlign: "end", marginRight: "10px" }}>
          <button
            type="button"
            onClick={() => {
              navigate("/calendarResister", { state: clickDay });
            }}
          >
            등록
          </button>
        </div>
      </ReactCalendarListStyle>
    </ReactCalendarStyle>
  );
};

export default ReactCalendar;
