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
  const { plantSeq } = item;

  useEffect(() => {
    console.log(item);
  }, []);
  // useSearchParams로 pk 뺄것.
  return (
    <PlantRegListUlStyle key={plantSeq}>
      <Link
        to={`/PlantResisterDetail/${plantSeq}`}
        state={plantSeq}
        // state 보류
        // 이정보들을 다 넘기는게 아니라...해당 pk 만 받아서 넘길 것.
        // getOntRead > pk 받아서 해당 화면에 뿌리기 state X
      >
        {/* 다듬어야함. */}
        <li>
          <div>{plantSeq}</div>
          <img src={item.plantPic}></img>
          <span>{item.plantNickName}</span>
          <span>{item.plantName}</span>
        </li>
      </Link>
    </PlantRegListUlStyle>
  );
};

export default PlantRegisterList;
