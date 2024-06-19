import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  if (location.pathname !== "/") {
    return (
      <footer className="footer">
        <div>모바일 기준 footer개념이 없음</div>
        <div>반응형 기준으로 잡으면 푸터 있다가 없애야 될듯함</div>
      </footer>
    );
  } else {
    return <></>;
  }
};

export default Footer;
