import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../../css/common/pagination.css";
const PageNation = ({ pageCount, onPageChange, currentPage, displayPage }) => {
  return (
    <ReactPaginate
      // 페이지네이션 왼쪽 화살표
      previousLabel={<FiChevronLeft />}
      // 페이지네이션 오른쪽 화살표
      nextLabel={<FiChevronRight />}
      // 받아온 페이지네이션 전체 갯수
      pageCount={pageCount}
      // page 클릭 시 이벤트
      onPageChange={onPageChange}
      // css 때문에... container css
      containerClassName={"pagination"}
      // 안쪽 12345 css
      pageLinkClassName={"pagination__link"}
      // 12345 중 활성화 된 페이지
      activeLinkClassName={"pagination__link__active"}
      // 한 번에 표시할 페이지 수
      pageRangeDisplayed={displayPage ? displayPage : 5}
      // 좌우 끝에 표시할 페이지 수
      marginPagesDisplayed={0}
      // 여기 ... 이든 뭐든 넣으면
      // < 12345... > 이런식으로 나머지 나와요
      breakLabel=""
      forcePage={currentPage} // 현재 페이지를 강제로 설정
    />
  );
};

export default PageNation;
