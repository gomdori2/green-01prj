import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalendarDetail from "./components/calendar/CalendarDetail";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Wrap from "./components/layout/Wrap";
import UserInfoProvider from "./context/UserInfoProvider";
import "./css/calendar.css";
import NotFound from "./pages/NotFound";
import ReactCalendar from "./pages/calendar/ReactCalendar";
import Login from "./pages/login/Login";
import UserProfile from "./pages/userprofile/UserProfile";
import Notice from "./pages/notice/Notice";
import PostDetail from "./pages/notice/PostDetail";
import PostEdit from "./pages/notice/PostEdit";
import PostWrite from "./pages/notice/PostWrite";
import PlantResister from "./pages/plantResister/PlantResister";
import PlantResisterDetail from "./pages/plantResister/PlantResisterDetail";
import PlantResisterList from "./pages/plantResister/PlantResisterList";
import Register from "./pages/register/Register";
import SignUp from "./pages/register/SignUp";
import CalendarResister from "./components/calendar/CalendarResister";

function App() {
  // 사용자 로그인 정보
  const [userInfo, setUserInfo] = useState(null);

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
              <Route path="/notice" element={<Notice />} />
              <Route path="/notice/page/:page" element={<Notice />} />
              <Route path="/notice/write" element={<PostWrite />} />
              <Route path="/notice/post/:writerSeq" element={<PostDetail />} />
              <Route path="/notice/edit/:writerSeq" element={<PostEdit />} />
              <Route path="/register" element={<Register />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/userprofile" element={<UserProfile />}></Route>
              <Route path="/reactCalendar" element={<ReactCalendar />}></Route>
              <Route
                path="/calendarResister"
                element={<CalendarResister />}
              ></Route>
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
