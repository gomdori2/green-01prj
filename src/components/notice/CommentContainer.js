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
  const [editIndex, setEditIndex] = useState(-1); // 현재 수정 중인 댓글의 인덱스
  const [editContent, setEditContent] = useState(""); // 수정 중인 댓글 내용

  useEffect(() => {
    console.log(writerSeq);
    fetchComments();
  }, [writerSeq]);

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

  const updateComment = async (commentSeq, writer, content) => {
    try {
      const res = await axios.patch(`/api/community/comment`, null, {
        params: {
          commentSeq: commentSeq,
          writer: 1,
          content: content,
        },
      });
      console.log(res);
      setEditIndex(-1); // 수정 모드 종료
      fetchComments(); // 댓글 수정 후 새로 댓글 목록을 가져옴
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const deleteComment = async commentSeq => {
    try {
      const res = await axios.delete(`/api/community/comment/${commentSeq}`);
      console.log(res);
      fetchComments(); // 댓글 삭제 후 새로 댓글 목록을 가져옴
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleInputChange = event => {
    setFormData({
      ...formData,
      content: event.target.value,
    });
  };

  const handleEditChange = event => {
    setEditContent(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    postComments();
  };

  const handleEditSubmit = (event, commentSeq, writer) => {
    event.preventDefault();
    updateComment(commentSeq, writer, editContent);
  };

  return (
    <div>
      <h3>전체 댓글 {comments.length}개</h3>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment__wrap">
            <div className="comment__info">
              <p className="comment__name">{comment.writerName}</p>
              {editIndex === index ? (
                <form
                  onSubmit={e =>
                    handleEditSubmit(e, comment.commentSeq, comment.writer)
                  }
                >
                  <textarea
                    value={editContent}
                    onChange={handleEditChange}
                  ></textarea>
                  <button type="submit" className="btn">
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditIndex(-1)}
                    className="btn"
                  >
                    취소
                  </button>
                </form>
              ) : (
                <p className="comment__text">{comment.cmtText}</p>
              )}
              <p className="comment__date">{comment.inputDt}</p>
            </div>
            <div className="comment__btns">
              <button
                onClick={() => {
                  setEditIndex(index);
                  setEditContent(comment.cmtText);
                }}
                className="btn"
              >
                수정
              </button>
              <button
                onClick={() => deleteComment(comment.commentSeq)}
                className="btn"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={handleFormSubmit} className="comment__form">
        <textarea
          value={formData.content}
          id="comment"
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요"
        ></textarea>
        <button type="submit" className="comment__add-btn">
          등록
        </button>
      </form>
    </div>
  );
};

export default CommentContainer;
