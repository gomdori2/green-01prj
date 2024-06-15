import { Link } from "react-router-dom";

function NoticeBottom() {
  return (
    <div className="notice__bottom">
      <div>
        <Link to="/notice/write" className="btn">
          글쓰기
        </Link>
      </div>
    </div>
  );
}

export default NoticeBottom;
