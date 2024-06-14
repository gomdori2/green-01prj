import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PostEdit.scss";

const PostEdit = () => {
  const { writerSeq } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/community/detail?boardSeq=${writerSeq}`,
        );
        const postData = res.data.data;
        if (postData) {
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.contents);
        } else {
          throw new Error("게시물을 찾을 수 없습니다.");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [writerSeq]);

  const handleUpdate = async () => {
    try {
      // 유효성 검사 추가: 제목과 내용이 모두 입력되었는지 확인
      if (!title.trim() || !content.trim()) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      setLoading(true);
      const updatedPost = {
        boardSeq: writerSeq,
        writerSeq: 1, // 수정 필요: 실제 로그인한 사용자의 writerSeq로 변경
        title: title,
        content: content,
      };

      const res = await axios.patch(`/api/community/`, updatedPost);
      console.log("서버 응답:", res.data);
      if (res.data.code === 1) {
        navigate(`/notice/post/${writerSeq}`);
      } else {
        throw new Error("게시물 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("게시물 수정 중 오류가 발생했습니다.");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="inner">
      <div className="post-add">
        <div className="post-add__top">
          <h2 className="title">글 수정 페이지</h2>
          <button className="btn" onClick={handleUpdate}>
            수정
          </button>

          {/* 카테고리 선택을 위한 UI 추가 */}
          <div className="form-group none">
            <label htmlFor="category">카테고리</label>
            <select id="category" name="category">
              <option value="공지사항">공지사항</option>
              <option value="자유게시판">자유게시판</option>
              <option value="질문답변">질문답변</option>
            </select>
          </div>

          <form className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
            <label htmlFor="content">내용</label>
            <textarea
              value={content}
              name="content"
              onChange={e => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
