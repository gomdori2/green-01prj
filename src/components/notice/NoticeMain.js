import { useNavigate } from "react-router-dom";
import "./NoticeMain.scss";

function NoticeMain({ getData }) {
  const navigate = useNavigate();

  const handleRowClick = boardSeq => {
    navigate(`/notice/post/${boardSeq}`);
  };

  // 날짜 형식 변환 함수
  const formatDate = dateStr => {
    const [year, month, day] = dateStr.split("-");
    return `${year.slice(2)}.${month}.${day}`;
  };

  return (
    <table className="notice__center">
      <thead>
        <tr>
          <th>번호</th>
          <th className="text-left">제목</th>
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
            <td className="text-left">{post.title}</td>
            <td>{post.writerName}</td>
            <td>{formatDate(post.inputDt)}</td> {/* 변환된 날짜 사용 */}
            <td>{post.hit}</td>
            <td>{post.fav}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default NoticeMain;
