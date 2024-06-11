import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // react-modal 라이브러리 사용
import "./PostWrite.scss";

Modal.setAppElement("#root"); // 모달 앱 엘리먼트 설정

const PostWrite = ({ addPost, postIdRef }) => {
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const newPost = {
      postId: postIdRef.current, // props로 받은 postIdRef 사용
      title,
      content,
      author: "작성자", // 작성자 정보 추가 (필요에 따라 수정)
      date: new Date().toLocaleDateString(), // 현재 날짜
      views: 0,
      likes: 0,
    };
    addPost(newPost); // App 컴포넌트의 addPost 함수 호출
    // 모달 열기
    setShowModal(true);
  };

  const handleCloseModal = destination => {
    setShowModal(false);
    navigate(destination); // 선택한 페이지로 이동
  };

  return (
    <div className="inner">
      <div className="post-add">
        <div className="post-add__top">
          <h2 className="title">글쓰기 페이지</h2>
          {/* 구현 보류 */}
          <div className="form-group none">
            <label htmlFor="category">카테고리</label>
            <select id="category" name="category">
              <option value="공지사항">공지사항</option>
              <option value="자유게시판">자유게시판</option>
              <option value="질문답변">질문답변</option>
            </select>
          </div>
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
          <button className="btn add-btn" onClick={handleSubmit}>
            등록
          </button>
        </form>
      </div>
      {/* 모달 */}
      <StyledModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="게시글 작성 완료"
      >
        <h3>게시글 작성 완료</h3>
        <p>어디로 이동하시겠습니까?</p>
        <div>
          <button onClick={() => handleCloseModal("/notice")}>
            게시판 목록
          </button>
          <button
            onClick={() =>
              handleCloseModal(`/notice/post/${postIdRef.current - 1}`)
            }
          >
            게시글 상세
          </button>
        </div>
      </StyledModal>
    </div>
  );
};
export default PostWrite;

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
