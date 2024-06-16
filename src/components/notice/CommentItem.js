// CommentItem.js
import React from "react";
import styled from "@emotion/styled";
import ReplyItem from "./ReplyItem";

const CommentItem = ({
  index,
  comment,
  handleDelete,
  handleReplyToggle,
  replyInputVisible,
  handleReplyChange,
  replyContent,
  handleReplySubmit,
}) => {
  return (
    <CommentItemContainer>
      {comment.text}
      <DeleteButton onClick={() => handleDelete(index, comment.id)}>
        삭제
      </DeleteButton>
      <ReplyButton onClick={() => handleReplyToggle(index)}>답글</ReplyButton>
      {replyInputVisible[index] && (
        <div>
          <ReplyInput
            type="text"
            value={replyContent}
            onChange={handleReplyChange}
            placeholder="답글을 입력하세요"
          />
          <button onClick={() => handleReplySubmit(index, comment.id)}>
            답글 등록
          </button>
        </div>
      )}
      {comment.replies && (
        <ReplyList>
          {comment.replies.map((reply, replyIndex) => (
            <ReplyItem key={replyIndex} reply={reply} />
          ))}
        </ReplyList>
      )}
    </CommentItemContainer>
  );
};

export default CommentItem;

const CommentItemContainer = styled.li`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const ReplyButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const ReplyInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ReplyList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;
