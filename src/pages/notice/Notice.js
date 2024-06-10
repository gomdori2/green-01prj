import React from "react";
import "./Notice.scss";

const Notice = () => {
  return (
    <>
      <div className="inner">
        <article className="notice">
          <h2>게시판</h2>
          <div className="notice__top">
            <button className="best-post btn">추천글</button>
            <div className="notice__top__icon">
              <a href="#" className="btn">
                글쓰기
              </a>
            </div>
          </div>

          <table className="notice__center">
            <thead>
              <tr>
                <th></th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
                <th>좋아요</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>첫 번째 게시물</td>
                <td>작성자A</td>
                <td>2024-06-07</td>
                <td>100</td>
                <td>10</td>
              </tr>
              <tr>
                <td>2</td>
                <td>두 번째 게시물</td>
                <td>작성자B</td>
                <td>2024-06-06</td>
                <td>150</td>
                <td>20</td>
              </tr>
            </tbody>
          </table>

          <div className="notice__bottom">
            <a href="" className="btn">
              글쓰기
            </a>
          </div>

          <div className="notice__pagination">
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">&raquo;</a>
          </div>

          <div className="search-container">
            <input type="text" placeholder="검색어를 입력하세요" />
            <button type="submit">검색</button>
          </div>
        </article>
      </div>
    </>
  );
};

export default Notice;
