import styled from "@emotion/styled";
import { FaSeedling, FaSun, FaTree, FaWind } from "react-icons/fa6";
import { TbPlantOff } from "react-icons/tb";
import { Link } from "react-router-dom";
const CalendarListUlStyle = styled.div`
  display: flex;
  width: 100%;
  li {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 60px;
  }
  a {
    width: 100%;
  }
  span {
    display: block;
    width: 100%;

    text-align: center;
  }
`;
const SpanIcon = styled.span`
  display: block;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
  }
`;
const CalendarList = ({ item }) => {
  // 이름은 굳이 필요없음.
  // 조회에 있어서 넣어둠
  const {
    gardenSeq,
    gardening,
    isMorePaging,
    managementDate,
    plantName,
    plantPic,
  } = item;
  let spGardening = gardening?.toString().split("");
  console.log(
    gardenSeq,
    gardening,
    isMorePaging,
    managementDate,
    plantName,
    plantPic,
  );

  const uiIcon = {
    1: (
      <FaSun
        size="30"
        style={{ color: "#fff", background: "#FFD700", borderRadius: "10px" }}
      />
    ),
    2: (
      <FaSeedling
        size="30"
        style={{ color: "#fff", background: "#32CD32", borderRadius: "10px" }}
      />
    ),
    3: (
      <FaWind
        size="30"
        style={{ color: "#fff", background: "#00BFFF", borderRadius: "10px" }}
      />
    ),
    4: (
      <FaTree
        size="30"
        style={{ color: "#fff", background: "#32CD32", borderRadius: "10px" }}
      />
    ),
  };
  return (
    <CalendarListUlStyle key={managementDate}>
      <Link
        to={`/reactCalendar/${item.gardenSeq}`}
        state={{ managementDate, gardenSeq }}
      >
        <li>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {plantPic ? (
              <img
                src={plantPic}
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  width: "50px",
                  height: "50px",
                }}
              ></img>
            ) : (
              <TbPlantOff size={50} />
            )}
          </span>
          <span>{plantName}</span>
          <SpanIcon>
            <div>
              {spGardening?.map(iconKey => (
                <span key={iconKey}>{uiIcon[iconKey]}</span>
              ))}
            </div>
          </SpanIcon>

          <span>{managementDate}</span>
        </li>
      </Link>
    </CalendarListUlStyle>
  );
};

export default CalendarList;
