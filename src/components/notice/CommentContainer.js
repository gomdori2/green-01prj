import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CommentContainer = () => {
  const { writerSeq } = useParams();
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    boardSeq: writerSeq,
    writer: 1,
    content: "",
  });

  useEffect(() => {
    console.log(writerSeq);
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `/api/community/comment?board_seq=${writerSeq}&page=1`,
      );
      console.log(res.data.data.list); // 데이터 구조를 확인
      setComments(res.data.data.list);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const postComments = async () => {
    try {
      const res = await axios.post("/api/community/comment", formData);
      console.log(res);
      setFormData({
        boardSeq: writerSeq,
        writer: 1,
        content: "",
      });
      fetchComments(); // 댓글 등록 후 새로 댓글 목록을 가져옴
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleInputChange = event => {
    setFormData({
      ...formData,
      content: event.target.value,
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    postComments();
  };

  return (
    <div>
      <h2>댓글 영역</h2>

      {comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.cmtText}</p> {/* comment의 cmtText 속성 출력 */}
          <p>{comment.writerName}</p> {/* 작성자 이름 출력 */}
          <p>{comment.inputDt}</p> {/* 작성 날짜 출력 */}
        </div>
      ))}

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="comment">댓글 입력 영역</label>
        <input
          type="text"
          value={formData.content}
          id="comment"
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요"
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default CommentContainer;
