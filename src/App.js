import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
// Index 라는 이름 충돌로 변경함
import { useState } from "react";
import Home from "./pages/Index";
import ReactCalendar from "./pages/calendar/ReactCalendar";

function App() {
  const arr = [
    { name: "삼성전자", link: "http://" },
    { name: "LG전자", link: "http://" },
    { name: "그린컴퓨터", link: "http://" },
  ];
  const [isLogin, setIsLogin] = useState(true);
  return (
    <BrowserRouter>
      {/* 공통 레이아웃 적용 */}
      <Header>
        {isLogin ? (
          <div>정보수정/로그아웃</div>
        ) : (
          <div>회원가입/회원로그인</div>
        )}
      </Header>
      <Routes>
        {/* 첫페이지 루트 경로 */}
        {/* a > link */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/reactCalendar" element={<ReactCalendar />}></Route>

        {/* 잘못된 경로 */}
        <Route path="*" element={<h1>잘못된 경로입니다.</h1>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
