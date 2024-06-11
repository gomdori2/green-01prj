import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PostEdit.scss";

const PostEdit = ({ posts, onUpdate }) => {
  console.log("posts", posts);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const postToEdit = posts.find(post => post.postId === parseInt(postId, 10));

    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    } else {
      alert("게시물을 찾을 수 없습니다.");
      navigate("/");
    }
  }, [postId, posts]);

  const handleUpdate = () => {
    const postToEdit = posts.find(post => post.postId === parseInt(postId, 10));

    if (!postToEdit) {
      alert("게시물을 찾을 수 없습니다.");
      return;
    }

    const updatedPost = {
      ...postToEdit, // 기존 게시글 정보 복사
      title: title, // 수정된 제목
      content: content, // 수정된 내용
      date: new Date().toLocaleDateString(), // 수정된 날짜
    };

    onUpdate(updatedPost);
    navigate(`/notice/post/${postId}`);
  };

  return (
    <div className="inner">
      <div className="post-add">
        <div className="post-add__top">
          <h2>글쓰기</h2>
          <button className="btn" onClick={handleUpdate}>
            수정
          </button>

          {/* 구현 보류 */}
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
