import { useNavigate } from "react-router-dom";

function NoticeMain({ getData }) {
  const navigate = useNavigate();

  const handleRowClick = boardSeq => {
    navigate(`/notice/post/${boardSeq}`);
  };

  return (
    <table className="notice__center">
      <thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>글쓴이</th>
          <th>날짜</th>
          <th>조회</th>
          <th>추천</th>
        </tr>
      </thead>
      <tbody>
        {getData.map(post => (
          <tr key={post.boardSeq} onClick={() => handleRowClick(post.boardSeq)}>
            <td>{post.boardSeq}</td>
            <td>{post.title}</td>
            <td>{post.writerName}</td>
            <td>{post.inputDt}</td>
            <td>{post.hit}</td>
            <td>{post.fav}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default NoticeMain;
