import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Modal from "react-modal";
import styled from "@emotion/styled";
import CommentComponent from "../../components/notice/CommentContainer";
import "./PostDetail.scss";

const PostDetail = ({ posts, onDelete }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const post = posts.find(post => post.postId === parseInt(postId, 10));

  const handleDelete = () => {
    onDelete(post.postId);
    navigate("/notice");
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="inner">
      <div className="post">
        <div className="post__header">
          <div className="post__header__left">
            <button
              className="btn"
              onClick={() => navigate(`/notice/edit/${postId}`)}
            >
              수정
            </button>
            <button className="delete btn" onClick={handleDeleteClick}>
              삭제
            </button>
          </div>

          <div className="post__header__right">
            <button
              className="btn"
              onClick={() =>
                navigate(`/notice/post/${parseInt(postId, 10) - 1}`)
              }
            >
              이전글
            </button>
            <button
              className="btn"
              onClick={() =>
                navigate(`/notice/post/${parseInt(postId, 10) + 1}`)
              }
            >
              다음글
            </button>
            <button className="btn" onClick={() => navigate("/notice")}>
              목록
            </button>
          </div>
        </div>
        <div className="post__content">
          <p>디테일페이지</p>
          {post ? (
            <div>
              <content__top>
                <content__top__title>{post.title}</content__top__title>
              </content__top>

              <div className="content__top__info">
                <div className="content__top__info__user">
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div className="content__top__info__profile">
                    <div className="username">작성자: {post.author}</div>
                    <div className="content__top__info__meta">
                      <div className="time">작성일: {post.date}</div>
                      <div className="views">조회수: {post.views}</div>
                      <div className="like">좋아요: {post.likes}</div>
                    </div>
                  </div>
                </div>
                <div className="btn">댓글</div>
              </div>
              <div className="content__center content">{post.content}</div>

              <div className="content__bottom">
                <div className="content__bottom__user-info">
                  <img src="" alt="" />
                  <a href="#" className="user-posts">
                    죠르디님의 게시글 더보기
                  </a>
                </div>
                <div>
                  <a href="#" className="btn1">
                    좋아요 10
                  </a>
                  <span>댓글수 5</span>
                </div>
              </div>
              <StyledModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="삭제 확인"
              >
                <p>정말로 삭제하시겠습니까?</p>
                <div>
                  <button onClick={handleDelete}>삭제</button>
                  <button onClick={handleCloseModal}>취소</button>
                </div>
              </StyledModal>
            </div>
          ) : (
            <p>게시물을 찾을 수 없습니다.</p>
          )}
          <CommentComponent />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

const StyledModal = styled(Modal)`
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
