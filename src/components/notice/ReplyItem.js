// ReplyItem.js
import React from "react";
import styled from "@emotion/styled";

const ReplyItem = ({ reply }) => {
  return <ReplyItemContainer>{reply.text}</ReplyItemContainer>;
};

export default ReplyItem;

const ReplyItemContainer = styled.li`
  margin-top: 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fa;
`;
