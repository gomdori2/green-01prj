import React from "react";
import { BsViewStacked, BsCardText } from "react-icons/bs";
import "./NoticeTop.scss";

function NoticeTop({
  orderClick,
  itemsPerPage,
  handleItemsPerPageChange,
  orderText,
}) {
  // orderText 추가
  return (
    <div className="notice__top">
      <div className="flex-gap-4">
        <button className="post-all btn">전체글</button>
        <button className="post-best btn-normal">추천글</button>
        <button className="order-old" onClick={orderClick}>
          {orderText}
        </button>
      </div>
      <div className="notice__top__icon">
        <button className="view-Type">
          <BsCardText size={15} />
        </button>
        <button className="view-Type">
          <BsViewStacked size={15} />
        </button>
        <select
          name="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5개씩</option>
          <option value="10">10개씩</option>
          <option value="15">15개씩</option>
          <option value="20">20개씩</option>
          <option value="30">30개씩</option>
          <option value="40">40개씩</option>
          <option value="50">50개씩</option>
        </select>
      </div>
    </div>
  );
}

export default NoticeTop;
