import React from "react";
import { Link } from "react-router-dom";
import PageNation from "../../components/common/PageNation";

function NoticeBottom({ totalPages, handlePageClick }) {
  return (
    <div className="notice__bottom">
      <div>
        <Link to="/notice/write" className="btn">
          글쓰기
        </Link>
      </div>
      <PageNation
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
      />
    </div>
  );
}

export default NoticeBottom;
