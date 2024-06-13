import styled from "@emotion/styled";
import { PulseLoader } from "react-spinners";
const LoadingStyle = styled.div``;
const LoadingText = styled.div`
  position: fixed;
  color: #57d7b7;
  left: 55%;
  top: 53%;
  font-weight: 700;
  font-size: 15px;
  z-index: 9999;
`;

// padding 되는곳에 넣기.
const Loading = () => {
  return (
    <>
      <PulseLoader style={{ position: "fixed", top: "50%" }} color="#36d7b7" />
      <LoadingText>loading...</LoadingText>
    </>
  );
};

export default Loading;
