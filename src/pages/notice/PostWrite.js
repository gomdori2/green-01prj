import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./PostWrite.scss";
import axios from "axios";
import CustomModal from "../../components/common/CustomModal";

Modal.setAppElement("#root");

const PostWrite = () => {
  const [showModal, setShowModal] = useState(false);
  const [newPostId, setNewPostId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    writerSeq: "1",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/community/", formData);
      setNewPostId(response.data.data);
      setShowModal(true);
      setFormData({
        title: "",
        content: "",
        writerSeq: "1",
      });
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = destination => {
    setShowModal(false);
    navigate(destination);
  };

  return (
    <div className="inner">
      <div className="post-add">
        <div className="post-add__top">
          <h2 className="title">글쓰기 페이지</h2>
          <div className="form-group none">
            <label htmlFor="category">카테고리</label>
            <select id="category" name="category">
              <option value="공지사항">공지사항</option>
              <option value="자유게시판">자유게시판</option>
              <option value="질문답변">질문답변</option>
            </select>
          </div>
        </div>
        <form className="form-group" onSubmit={handleSubmit}>
          <label htmlFor="title" className="post-label">
            제목
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            required
          />
          <label htmlFor="content" className="post-label">
            내용
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            required
          />
          <button className="btn add-btn" type="submit" disabled={loading}>
            {loading ? "등록 중..." : "등록"}
          </button>
        </form>
      </div>
      <CustomModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        newPostId={newPostId}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default PostWrite;
