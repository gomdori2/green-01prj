import React from "react";

const PasswordCheckModal = ({ children, closeModal }) => {
  return (
    <div>
      <div className="modal open">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          {children} {/* 모달 내용을 children으로 받아 렌더링합니다. */}
        </div>
      </div>
    </div>
  );
};

export default PasswordCheckModal;
