import React from "react";
import styled from "@emotion/styled";
import Modal from "react-modal";

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 40px 20px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;

  p {
    margin: 10px 0;
  }

  button {
    padding: 8px 15px;
    margin-right: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const CustomModal = ({ isOpen, onRequestClose, newPostId, onCloseModal }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="게시글 작성 완료"
    >
      <h3>게시글 작성 완료</h3>
      <p>어디로 이동하시겠습니까?</p>
      <div>
        <button onClick={() => onCloseModal("/notice")}>게시판 목록</button>
        {newPostId && (
          <button onClick={() => onCloseModal(`/notice/post/${newPostId}`)}>
            게시글 상세
          </button>
        )}
      </div>
    </StyledModal>
  );
};

export default CustomModal;
