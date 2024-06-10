import styled from "@emotion/styled";

const TextSliceSpanStyle = styled.span`
  display: inline-block;
  width: ${props => props.width || "auto"};
`;
// 해당 span width
// 해당 내용 text
const TextSliceSpan = ({ text, width }) => {
  // 최대 문자 길이 설정
  const maxLength = 30;

  // 텍스트가 최대 길이를 초과하는 경우, 잘라내고 '...' 추가
  const shortenedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return <TextSliceSpanStyle width={width}>{shortenedText}</TextSliceSpanStyle>;
};

export default TextSliceSpan;
