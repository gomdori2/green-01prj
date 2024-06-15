import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CommentContainer.scss";

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

  console.log("comments", comments.length);

  return (
    <div>
      <h3>댓글</h3>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment__wrap">
            <div className="comment__info">
              <p className="comment__name">{comment.writerName}</p>
              {/* 작성자 이름 출력 */}
              <p className="comment__text">{comment.cmtText}</p>
              {/* comment의 cmtText 속성 출력 */}
              <p className="comment__date">{comment.inputDt}</p>
              {/* 작성 날짜 출력 */}
            </div>
            <div className="comment__btns">
              <button className="btn">수정</button>
              <button className="btn">삭제</button>
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={handleFormSubmit} className="comment__form">
        <input
          type="text"
          value={formData.content}
          id="comment"
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요"
        />
        <button type="submit" className="btn">
          등록
        </button>
      </form>
    </div>
  );
};

export default CommentContainer;
