import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentComponent from "../../components/notice/CommentContainer";
import "./PostDetail.scss";
import axios from "axios";
import ConfirmModal from "../../components/common/ConfirmModal";

const PostDetail = () => {
  const { writerSeq } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousPostExists, setPreviousPostExists] = useState(false);
  const [nextPostExists, setNextPostExists] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/community/detail?boardSeq=${writerSeq}`,
        );
        setPost(res.data);
        setPreviousPostExists(parseInt(writerSeq, 10) > 1);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [writerSeq]);

  useEffect(() => {
    const checkNextPost = async () => {
      let currentWriterSeq = parseInt(writerSeq, 10);
      let nextWriterSeq = currentWriterSeq + 1;
      let maxAttempts = 5;

      while (maxAttempts > 0) {
        try {
          const res = await axios.get(
            `/api/community/detail?boardSeq=${nextWriterSeq}`,
          );
          if (res.data && res.data.data) {
            setNextPostExists(true);
            return;
          } else {
            nextWriterSeq++;
          }
        } catch (error) {
          console.log(error);
          nextWriterSeq++;
        } finally {
          maxAttempts--;
        }
      }

      setNextPostExists(false);
      alert("다음 글을 찾을 수 없습니다.");
    };

    if (post && post.data) {
      checkNextPost();
    }
  }, [writerSeq, post]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/community/?boardSeq=${post.data.boardSeq}&writerSeq=1`,
      );
      navigate("/notice");
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigateToNextPost = async () => {
    let currentWriterSeq = parseInt(writerSeq, 10);
    let nextWriterSeq = currentWriterSeq + 1;
    let maxAttempts = 5;

    while (maxAttempts > 0) {
      try {
        const res = await axios.get(
          `/api/community/detail?boardSeq=${nextWriterSeq}`,
        );
        if (res.data && res.data.data) {
          navigate(`/notice/post/${nextWriterSeq}`);
          return;
        } else {
          nextWriterSeq++;
        }
      } catch (error) {
        console.log(error);
        nextWriterSeq++;
      } finally {
        maxAttempts--;
      }
    }

    console.log("다음 글을 찾을 수 없습니다.");
  };

  const navigateToPreviousPost = async () => {
    let currentWriterSeq = parseInt(writerSeq, 10);
    let previousWriterSeq = currentWriterSeq - 1;
    let maxAttempts = 5;

    while (maxAttempts > 0) {
      try {
        const res = await axios.get(
          `/api/community/detail?boardSeq=${previousWriterSeq}`,
        );
        if (res.data && res.data.data) {
          navigate(`/notice/post/${previousWriterSeq}`);
          return;
        } else {
          previousWriterSeq--;
        }
      } catch (error) {
        console.log(error);
        previousWriterSeq--;
      } finally {
        maxAttempts--;
      }
    }

    alert("이전 글을 찾을 수 없습니다.");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="inner">
      <div className="post">
        <h2 className="title">상세페이지</h2>
        <div className="post__header">
          <div className="post__header__left">
            <button
              className="btn"
              onClick={() => navigate(`/notice/edit/${writerSeq}`)}
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
              onClick={navigateToPreviousPost}
              disabled={!previousPostExists}
            >
              이전글
            </button>
            <button
              className="btn"
              onClick={navigateToNextPost}
              disabled={!nextPostExists}
            >
              다음글
            </button>
            <button className="btn" onClick={() => navigate("/notice")}>
              목록
            </button>
          </div>
        </div>
        <div className="post__content">
          {post ? (
            <div>
              <div className="content__top">
                <h2 className="title">{post.data.title}</h2>
              </div>

              <div className="content__top__info">
                <div className="content__top__info__user">
                  <div>{/* <img src="" alt="" /> */}</div>
                  <div className="content__top__info__profile">
                    <div className="username">
                      글쓴이: {post.data.writerName}
                    </div>
                    <div className="content__top__info__meta">
                      <div className="time">작성일: {post.data.inputDt}</div>
                      <div className="views">조회수: {post.data.hit}</div>
                      <div className="like">추천수: {post.data.fav}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content__center content">
                {post.data.contents}
              </div>

              <div className="content__bottom">
                <div>
                  <span>추천수: {post.data.hit}</span>
                  <span>댓글수: </span>
                </div>
              </div>
              <ConfirmModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onConfirm={handleDelete}
              />
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
