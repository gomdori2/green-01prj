import styled from "@emotion/styled";
import { PulseLoader } from "react-spinners";

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(
    255,
    255,
    255,
    0.8
  ); /* Optional: Semi-transparent background */
  z-index: 9999;
`;

const LoadingText = styled.div`
  color: #57d7b7;
  font-weight: 700;
  font-size: 15px;
  margin-top: 10px; /* Space between loader and text */
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <PulseLoader color="#36d7b7" />
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;
