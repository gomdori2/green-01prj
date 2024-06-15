import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const CommentComponent = ({ boardSeq }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyInputVisible, setReplyInputVisible] = useState({});
  const [replyContent, setReplyContent] = useState("");

  // 기존 댓글 및 답글 로드
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `/api/community/comments?boardSeq=${boardSeq}`,
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };

    fetchComments();
  }, [boardSeq]);

  // 댓글 입력값 변경 핸들러
  const handleInputChange = e => {
    setComment(e.target.value);
  };

  // 댓글 등록 핸들러
  const handleSubmit = async () => {
    if (comment.trim() !== "") {
      try {
        const response = await axios.post("/api/community/comment", {
          boardSeq: boardSeq,
          writer: 1,
          content: comment,
        });
        if (response.status === 200) {
          setComments([...comments, { text: comment, replies: [] }]);
          setComment("");
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  // 댓글 삭제 핸들러
  const handleDelete = async (index, commentId) => {
    try {
      await axios.delete(`/api/community/comment/${commentId}`);
      const newComments = [...comments];
      newComments.splice(index, 1);
      setComments(newComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // 답글 입력창 표시/숨김 핸들러
  const handleReplyToggle = commentId => {
    setReplyInputVisible({
      ...replyInputVisible,
      [commentId]: !replyInputVisible[commentId],
    });
    setReplyContent("");
  };

  // 답글 입력값 변경 핸들러
  const handleReplyChange = e => {
    setReplyContent(e.target.value);
  };

  // 답글 등록 핸들러
  const handleReplySubmit = async (parentCommentId, commentIndex) => {
    if (replyContent.trim() !== "") {
      try {
        const response = await axios.post("/api/community/comment", {
          boardSeq: boardSeq,
          writer: 1,
          content: replyContent,
        });
        if (response.status === 200) {
          const newComments = comments.map((comment, index) => {
            if (index === commentIndex) {
              return {
                ...comment,
                replies: [...comment.replies, { text: replyContent }],
              };
            }
            return comment;
          });
          setComments(newComments);
          setReplyInputVisible({
            ...replyInputVisible,
            [parentCommentId]: false,
          });
          setReplyContent("");
        }
      } catch (error) {
        console.error("Error submitting reply:", error);
      }
    }
  };

  return (
    <CommentContainer>
      <label htmlFor="comment">댓글</label>
      <CommentInput
        type="text"
        value={comment}
        id="comment"
        onChange={handleInputChange}
        placeholder="댓글을 입력하세요"
      />
      <button onClick={handleSubmit}>등록</button>
      <CommentList>
        {comments.map((comment, index) => (
          <CommentItem key={index}>
            {comment.text}
            <DeleteButton onClick={() => handleDelete(index, comment.id)}>
              삭제
            </DeleteButton>
            <ReplyButton onClick={() => handleReplyToggle(index)}>
              답글
            </ReplyButton>
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
                  <ReplyItem key={replyIndex}>{reply.text}</ReplyItem>
                ))}
              </ReplyList>
            )}
          </CommentItem>
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentComponent;

// 스타일 정의
const CommentContainer = styled.div`
  margin-top: 20px;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
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

const ReplyItem = styled.li`
  margin-top: 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fa;
`;
