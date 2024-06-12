import styled from "@emotion/styled";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// 클래스로 바꿔라 제발
const PlantRegListUlStyle = styled.div`
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
const PlantRegisterList = ({ item }) => {
  const { pk, title, text, day, img, gardning } = item;
  useEffect(() => {
    console.log(item);
  }, []);

  return (
    <PlantRegListUlStyle key={pk}>
      <Link
        to={`/PlantResisterDetail/${pk}`}
        state={{ pk, title, text, day, img, gardning }}
      >
        <li>
          <span></span>
          <span>{text}</span>
          <span>{text}</span>
        </li>
      </Link>
    </PlantRegListUlStyle>
  );
};

export default PlantRegisterList;
