import styled from "@emotion/styled";

const WrapStyle = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

const Wrap = ({ children }) => {
  return <WrapStyle>{children}</WrapStyle>;
};

export default Wrap;
