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
  const [allPosts, setAllPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("/api/community/list?size=1000");
        setAllPosts(res.data.data.list);
      } catch (error) {
        setError(error);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/community/detail?boardSeq=${writerSeq}`,
        );
        if (res.data) {
          setPost(res.data);
        } else {
          setError(new Error("게시물을 찾을 수 없습니다."));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [writerSeq]);

  const handleDelete = async () => {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const userSeq = storedUser?.userSeq;
      if (!userSeq) {
        alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      await axios.delete(
        `/api/community/?boardSeq=${post.data.boardSeq}&writerSeq=${userSeq}`,
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

  const navigateToNextPost = () => {
    const currentIdx = allPosts.findIndex(
      item => item.boardSeq === parseInt(writerSeq, 10),
    );
    if (currentIdx !== -1 && currentIdx < allPosts.length - 1) {
      navigate(`/notice/post/${allPosts[currentIdx + 1].boardSeq}`);
    } else {
      alert("다음 글을 찾을 수 없습니다.");
    }
  };

  const navigateToPreviousPost = () => {
    const currentIdx = allPosts.findIndex(
      item => item.boardSeq === parseInt(writerSeq, 10),
    );
    if (currentIdx > 0) {
      navigate(`/notice/post/${allPosts[currentIdx - 1].boardSeq}`);
    } else {
      alert("이전 글을 찾을 수 없습니다.");
    }
  };

  const handleLikeClick = async () => {
    console.log("추천 버튼 클릭됨");
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const userSeq = storedUser?.userSeq;
      if (!userSeq) {
        alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      const response = await axios.get(
        `/api/community/like?boardSeq=${post.data.boardSeq}&writer=${userSeq}`,
      );
      console.log("추천 요청 성공:", response.data);

      // 서버 응답에 따라 상태 업데이트
      if (response.data.code === 1) {
        setPost(prevPost => ({
          ...prevPost,
          data: {
            ...prevPost.data,
            fav:
              response.data.data === 1
                ? prevPost.data.fav + 1
                : prevPost.data.fav - 1,
          },
        }));
      } else {
        alert("추천 요청 실패: " + response.data.msg);
      }
    } catch (error) {
      console.log("추천 요청 실패:", error);
    }
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
              disabled={
                allPosts.findIndex(
                  item => item.boardSeq === parseInt(writerSeq, 10),
                ) === 0
              }
            >
              이전글
            </button>
            <button
              className="btn"
              onClick={navigateToNextPost}
              disabled={
                allPosts.findIndex(
                  item => item.boardSeq === parseInt(writerSeq, 10),
                ) ===
                allPosts.length - 1
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
                <button className="btn-hit btn" onClick={handleLikeClick}>
                  추천하기 {post.data.fav}
                </button>
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
          <CommentComponent boardSeq={writerSeq} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
