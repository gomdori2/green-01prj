import Modal from "react-modal";
import styled from "@emotion/styled";

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="삭제 확인"
    >
      <p>정말로 삭제하시겠습니까?</p>
      <div>
        <button onClick={onConfirm}>삭제</button>
        <button onClick={onRequestClose}>취소</button>
      </div>
    </StyledModal>
  );
};

export default ConfirmModal;

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
    margin: 0;
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
