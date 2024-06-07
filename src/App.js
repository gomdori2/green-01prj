import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
// Index 라는 이름 충돌로 변경함
import { useState } from "react";
import ReactCalendar from "./pages/calendar/ReactCalendar";
import Login from "./pages/login/Login";
import Notice from "./pages/notice/Notice";
import PlantResister from "./pages/plantResister/PlantResister";
import Register from "./pages/register/Register";
import NotFound from "./pages/NotFound";
import Wrap from "./components/layout/Wrap";
import Main from "./components/layout/Main";
import "./css/calendar.css";
function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <BrowserRouter>
      {/* 공통 레이아웃 적용 */}
      <Wrap>
        <Header>
          {isLogin ? (
            <div>정보수정/로그아웃</div>
          ) : (
            <div>회원가입/회원로그인</div>
          )}
        </Header>
        <Main>
          <Routes>
            {/* 첫페이지 루트 경로 */}
            {/* a > link */}
            {/* 첫페이지 로그인이라고 일단 알고있음 */}
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/notice" element={<Notice></Notice>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/reactCalendar" element={<ReactCalendar />}></Route>
            <Route path="/plantResister" element={<PlantResister />}></Route>
            {/* 잘못된 경로 */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Main>
        <Footer />
      </Wrap>
    </BrowserRouter>
  );
}

export default App;
