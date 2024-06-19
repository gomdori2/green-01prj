import styled from "@emotion/styled";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../axios/plantresister/plantresister";
import { TbPlantOff } from "react-icons/tb";
import { userInfoContext } from "../../context/UserInfoProvider";
// 클래스로 바꿔라 제발
const PlantRegListUlStyle = styled.div`
  display: flex;
  width: 100%;
  li {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 110px;
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
  const { contextUserData } = useContext(userInfoContext);
  useEffect(() => {}, []);
  // useSearchParams로 pk 뺄것.
  return (
    <PlantRegListUlStyle key={plantSeq}>
      <Link
        to={`/plantResisterDetail/${plantSeq}`}
        state={{ plantSeq, userSeq: contextUserData.userSeq }}
        // state 보류
        // 이정보들을 다 넘기는게 아니라...해당 pk 만 받아서 넘길 것.
        // getOntRead > pk 받아서 해당 화면에 뿌리기 state X
      >
        {/* 다듬어야함. */}
        <li>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.plantPic ? (
              <img
                style={{ width: "120px", height: "90px" }}
                src={item.plantPic}
              ></img>
            ) : (
              <TbPlantOff
                size={70}
                style={{ width: "110px", height: "60px !important" }}
              />
            )}
          </span>

          <span>{item.plantNickName}</span>
          <span>{item.plantName}</span>
        </li>
      </Link>
    </PlantRegListUlStyle>
  );
};

export default PlantRegisterList;
