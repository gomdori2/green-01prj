import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../axios/plantresister/plantresister";
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
const PlantRegisterList = ({ item, index }) => {
  // 현재 seq 없음
  const { pk } = item;

  useEffect(() => {
    console.log(item);
    
  }, []);

  return (
    <PlantRegListUlStyle key={index}>
      <Link
        to={`/PlantResisterDetail/${index}`}
        // state 보류
        // 이정보들을 다 넘기는게 아니라...해당 pk 만 받아서 넘길 것.
        state={{ pk }}
      >
        <li>
          <span>{item.plantNickName}</span>
          <span>{item.plantPic}</span>
          <span>{item.plantName}</span>
        </li>
      </Link>
    </PlantRegListUlStyle>
  );
};

export default PlantRegisterList;
