import styled from "@emotion/styled";
import Modal from "react-modal";

const ProfileModifyModal = ({ isOpen, onRequestClose }) => {
  return (
    <ProfileModifySuccessModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <p>수정이 완료되었습니다!</p>
      <button onClick={onRequestClose}>확인</button>
    </ProfileModifySuccessModal>
  );
};

const ProfileModifySuccessModal = styled(Modal)`
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
    font-weight: 500;
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

export default ProfileModifyModal;
