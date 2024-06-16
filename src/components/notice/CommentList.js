// CommentList.js
import React from "react";
import styled from "@emotion/styled";
import CommentItem from "./CommentItem";

const CommentList = ({
  comments,
  handleDelete,
  handleReplyToggle,
  replyInputVisible,
  handleReplyChange,
  replyContent,
  handleReplySubmit,
}) => {
  return (
    <CommentListContainer>
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          index={index}
          comment={comment}
          handleDelete={handleDelete}
          handleReplyToggle={handleReplyToggle}
          replyInputVisible={replyInputVisible}
          handleReplyChange={handleReplyChange}
          replyContent={replyContent}
          handleReplySubmit={handleReplySubmit}
        />
      ))}
    </CommentListContainer>
  );
};

export default CommentList;

const CommentListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;
