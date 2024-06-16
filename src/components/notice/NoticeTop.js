import React from "react";
import { BsViewStacked, BsCardText } from "react-icons/bs";
import "./NoticeTop.scss";

function NoticeTop({
  orderClick,
  itemsPerPage,
  handleItemsPerPageChange,
  orderText,
  bestButtonClick,
  allButtonClick,
}) {
  return (
    <div className="notice__top">
      <div className="flex-gap-4">
        <button className="post-all btn" onClick={allButtonClick}>
          전체글
        </button>
        <button className="post-best btn-normal" onClick={bestButtonClick}>
          추천글
        </button>
        <button className="order-old" onClick={orderClick}>
          {orderText}
        </button>
      </div>
      <div className="notice__top__icon flex-gap-4">
        <button className="view-Type border">
          <BsCardText size={15} />
        </button>
        <button className="view-Type border">
          <BsViewStacked size={15} />
        </button>
        <select
          className="select"
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
