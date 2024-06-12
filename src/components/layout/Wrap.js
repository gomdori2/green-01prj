import styled from "@emotion/styled";

const WrapStyle = styled.div`
  max-width: 768px;
  margin: 0 auto;
  .dd {
    width: 100%;
  }
`;

const Wrap = ({ children }) => {
  return (
    <WrapStyle>
      <div className="dd">{children}</div>
    </WrapStyle>
  );
};

export default Wrap;
