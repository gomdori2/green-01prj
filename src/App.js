import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { useState } from "react";
import CalendarDetail from "./components/calendar/CalendarDetail";
import Main from "./components/layout/Main";
import usePosts from "./hooks/usePosts"; // Custom hook import
import NotFound from "./pages/NotFound";
import ReactCalendar from "./pages/calendar/ReactCalendar";
import Login from "./pages/login/Login";
import Notice from "./pages/notice/Notice";
import PostDetail from "./pages/notice/PostDetail";
import PostEdit from "./pages/notice/PostEdit";
import PostWrite from "./pages/notice/PostWrite";
import PlantResister from "./pages/plantResister/PlantResister";
import PlantResisterDetail from "./pages/plantResister/PlantResisterDetail";
import Register from "./pages/register/Register";
import SetNickName from "./pages/register/SetNickName";
import SignUp from "./pages/register/SignUp";
import Wrap from "./components/layout/Wrap";

import "./css/common/reset.css";
import "./css/common/common.css";
import "./css/calendar.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const { posts, addPost, handleDelete, handleUpdate, postIdRef } = usePosts();
  return (
    <BrowserRouter>
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
            {/* 공통 레이아웃 적용 */}
            <Route path="/" element={<Login />}></Route>
            <Route path="/notice" element={<Notice posts={posts} />} />
            <Route
              path="/notice/write"
              element={<PostWrite addPost={addPost} postIdRef={postIdRef} />}
            />
            <Route
              path="/notice/post/:postId"
              element={<PostDetail posts={posts} onDelete={handleDelete} />}
            />
            <Route
              path="/notice/edit/:postId"
              element={<PostEdit posts={posts} onUpdate={handleUpdate} />}
            />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/set-nickname" element={<SetNickName />}></Route>

            <Route path="/reactCalendar" element={<ReactCalendar />}></Route>
            <Route
              path="/reactCalendar/:pk"
              element={<CalendarDetail />}
            ></Route>
            <Route path="/plantResister" element={<PlantResister />}></Route>
            <Route
              path="/plantResisterDetail/:pk"
              element={<PlantResisterDetail />}
            ></Route>

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
