import styled from "@emotion/styled";
import { PulseLoader } from "react-spinners";
const LoadingStyle = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
`;
const LoadingText = styled.div`
  color: #57d7b7;
  font-weight: 700;
  font-size: 15px;
`;

// padding 되는곳에 넣기.
const Loading = () => {
  return (
    <LoadingStyle>
      {/* loading 위치 잡기 */}
      <PulseLoader color="#36d7b7" />
      <LoadingText>Loading...</LoadingText>
    </LoadingStyle>
  );
};

export default Loading;
