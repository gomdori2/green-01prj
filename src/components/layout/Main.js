import styled from "@emotion/styled";

const MainStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const Main = ({ children }) => {
  return <MainStyle>{children}</MainStyle>;
};

export default Main;
