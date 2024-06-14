import styled from "@emotion/styled";
import { useState } from "react";

const TextAreaStyle = styled.div`
  display: flex;
  flex-direction: column;
  // 상위 컴포넌트에서 내려오는거 덮어쓰려고 해놓음.
  gap: 0 !important;
  justify-content: first baseline;
  align-items: normal;
  textarea {
    resize: none;
    width: 100%;
    border: 1px solid gray !important;
    border-radius: 4px 4px 4px 4px !important;
    padding: 10px;
    line-height: 30px;
  }
  span {
    display: block !important;
    width: 100%;
    text-align: end;
  }
  strong {
    font-weight: bold;
    color: red;
  }
`;
// valueDatas : 상위 컴포넌트에서 넘긴 데이터 매개변수
// setTextData : 상위 컴포넌트에 넘겨야 할 데이터(넘긴다기보단 상위에 있는 이라 보면 될듯) textData 담아두기
const TextArea = ({ valueDatas, setTextData, maxLength }) => {
  // value.length = 글자 수
  const [valueLength, setValueLength] = useState(valueDatas?.length);
  return (
    <>
      <div>
        <TextAreaStyle>
          <textarea
            id="text"
            value={valueDatas}
            rows={6}
            maxLength={maxLength}
            onChange={e => {
              setValueLength(e.target.value.length);
              setTextData(e.target.value);
            }}
          />
          <span>
            <strong>*</strong>글자수 {valueLength}/{maxLength}
          </span>
        </TextAreaStyle>
      </div>
    </>
  );
};

export default TextArea;
