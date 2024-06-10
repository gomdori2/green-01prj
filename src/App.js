import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
// Index 라는 이름 충돌로 변경함
import { useState } from "react";
import CalendarDetail from "./components/calendar/CalendarDetail";
import Main from "./components/layout/Main";
import Wrap from "./components/layout/Wrap";
import "./css/calendar.css";
import NotFound from "./pages/NotFound";
import ReactCalendar from "./pages/calendar/ReactCalendar";
import Login from "./pages/login/Login";
import Notice from "./pages/notice/Notice";
import PlantResister from "./pages/plantResister/PlantResister";
import Register from "./pages/register/Register";
import PostWrite from "./pages/notice/PostWrite";
import PostDetail from "./pages/notice/PostDetail";
import PostEdit from "./pages/notice/PostEdit";
import SignUp from "./pages/register/SignUp";
import SetNickName from "./pages/register/SetNickName";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  // const [posts, setPosts] = useState(dummy); // 게시글 데이터 상태
  // const postIdRef = useRef(27); // useRef를 App 컴포넌트에서 관리

  // const addPost = newPost => {
  //   setPosts([newPost, ...posts]); // 새로운 게시글 추가
  //   postIdRef.current += 1; // postId 업데이트
  // };

  // const handleDelete = postId => {
  //   const updatedPosts = posts.filter(post => post.postId !== postId);
  //   setPosts(updatedPosts);
  // };

  // const handleUpdate = updatedPost => {
  //   const updatedPosts = posts.map(post =>
  //     post.postId === updatedPost.postId ? updatedPost : post,
  //   );
  //   setPosts(updatedPosts); // 수정된 게시글 목록으로 상태 업데이트
  // };
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
            <Route path="/notice" element={<Notice />} />
            <Route path="/notice/write" element={<PostWrite />} />
            <Route path="/notice/post/:id" element={<PostDetail />} />
            <Route path="/notice/edit/:id" element={<PostEdit />} />
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/set-nickname" element={<SetNickName/>}></Route>
            <Route path="/reactCalendar" element={<ReactCalendar />}></Route>
            <Route
              path="/reactCalendar/:pk"
              element={<CalendarDetail />}
            ></Route>
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
