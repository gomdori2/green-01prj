import styled from "@emotion/styled";
// css 나중에 변경 예정
const NotFoundPage = styled.div`
  width: 65%;
  height: 650px;
  background: url("./www/images/404Page.jpg") no-repeat;
  background-size: contain;
`;

const NotFound = () => {
  return <NotFoundPage></NotFoundPage>;
};

export default NotFound;
