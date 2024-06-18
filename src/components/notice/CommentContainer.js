import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./CommentContainer.scss";
import "../../css/common/pagination.css";
import PageNation from "../common/PageNation";

const CommentContainer = () => {
  const { writerSeq } = useParams();
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [formData, setFormData] = useState({
    boardSeq: writerSeq,
    writer: "",
    content: "",
  });
  const [editIndex, setEditIndex] = useState(-1); // 현재 수정 중인 댓글의 인덱스
  const [editContent, setEditContent] = useState(""); // 수정 중인 댓글 내용
  const [cmtTotal, setCmtTotal] = useState(0);
  const [cmtEl, setCmtEl] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const userSeq = storedUser?.userSeq;
    if (!userSeq) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }
    setFormData(prevFormData => ({ ...prevFormData, writer: userSeq }));
    fetchComments(currentPage);
  }, [writerSeq, currentPage]);

  const fetchComments = async page => {
    try {
      const res = await axios.get(
        `/api/community/comment?board_seq=${writerSeq}&page=${page + 1}`,
      );
      setComments(res.data.data.list);
      // 갯수 추가
      setCmtTotal(res.data.data.totalPage);
      setCmtEl(res.data.data.totalElements);

      setTotalPages(res.data.data.totalPages); // 전체 페이지 수 설정
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const postComment = async () => {
    try {
      if (!formData.writer) {
        alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      await axios.post("/api/community/comment", formData);
      setFormData(prevFormData => ({
        ...prevFormData,
        content: "",
      }));
      fetchComments(currentPage);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const updateComment = async (commentSeq, content) => {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const userSeq = storedUser?.userSeq;
      if (!userSeq) {
        alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      await axios.patch(`/api/community/comment`, null, {
        params: {
          commentSeq: commentSeq,
          writer: userSeq,
          content: content,
        },
      });
      setEditIndex(-1);
      fetchComments(currentPage);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const deleteComment = async commentSeq => {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const userSeq = storedUser?.userSeq;
      if (!userSeq) {
        alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      await axios.delete(`/api/community/comment`, {
        params: {
          commentSeq: commentSeq,
          writer: userSeq,
        },
      });
      fetchComments(currentPage);
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
    postComment();
  };

  const handleEditSubmit = (event, commentSeq) => {
    event.preventDefault();
    updateComment(commentSeq, editContent);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  console.log(comments.length);

  return (
    <div>
      <h3>전체 댓글 {cmtEl}개</h3>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment__wrap">
            <div className="comment__info">
              <p className="comment__name">{comment.writerName}</p>
              {editIndex === index ? (
                <form onSubmit={e => handleEditSubmit(e, comment.cmtSeq)}>
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
                onClick={() => deleteComment(comment.cmtSeq)}
                className="btn"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}

      {cmtEl < 15 ? (
        <></>
      ) : (
        <PageNation
          pageCount={cmtTotal}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}

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
