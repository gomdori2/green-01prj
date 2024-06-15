import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserInfoProvider from "./context/UserInfoProvider";
// ts 에서는 데이터 종류를 구별한다.
// as 는 강제로 타입지정
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Ensure the root element exists in your HTML
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("The root element with id 'root' was not found.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <UserInfoProvider>
    <App />
    <ToastContainer autoClose={500}></ToastContainer>
  </UserInfoProvider>,
);
