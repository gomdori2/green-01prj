import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./css/common/common.css";
import "./css/common/reset.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ts 에서는 데이터 종류를 구별한다.
// as 는 강제로 타입지정
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// js 버전
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <App />
    <ToastContainer autoClose={500}></ToastContainer>
  </>,
);
