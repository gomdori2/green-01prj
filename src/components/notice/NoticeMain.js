import React from "react";
import NoticeContents from "../../components/notice/NoticeContents";

function NoticeMain({ getData }) {
  return (
    <>
      <NoticeContents getData={getData} />
    </>
  );
}

export default NoticeMain;
