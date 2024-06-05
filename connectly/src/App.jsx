import { Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Post from "./components/Post";
import Profile from "./components/Profile";
import MyPosts from "./components/MyPosts";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Posts/:postId" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/newPost" element={<NewPost />} />
      </Routes>
    </div>
  );
};

export default App;
