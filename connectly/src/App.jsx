import { Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Post from "./components/Post";
import Profile from "./components/Profile";
import MyPosts from "./components/MyPosts";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState("");
  return (
    <div>
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/Posts/:postId" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myPosts" element={<MyPosts />} />
            <Route path="/newPost" element={<NewPost />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
