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
import PlantResisterList from "./pages/plantResister/PlantResisterList";
import { Link } from "react-router-dom";
import LogOut from "./components/login/LogOut";
import UserInfoProvider from "./context/UserInfoProvider";

function App() {
  // 사용자 로그인 정보
  const [userInfo, setUserInfo] = useState(null);

  // const [isLogin, setIsLogin] = useState(true);
  const { posts, addPost, handleDelete, handleUpdate } = usePosts();
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Wrap>
          <Header userInfo={userInfo}></Header>
          <Main>
            <Routes>
              {/* 공통 레이아웃 적용 */}
              <Route
                path="/"
                element={<Login setUserInfo={setUserInfo} />}
              ></Route>
              <Route path="/notice" element={<Notice posts={posts} />} />
              <Route
                path="/notice/write"
                element={<PostWrite addPost={addPost} />}
              />
              <Route
                path="/notice/post/:writerSeq"
                element={<PostDetail posts={posts} onDelete={handleDelete} />}
              />
              <Route path="/notice/edit/:writerSeq" element={<PostEdit />} />
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
              <Route
                path="/plantResisterList"
                element={<PlantResisterList />}
              ></Route>
              {/* 잘못된 경로 */}
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Main>
          <Footer />
        </Wrap>
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
