import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Post from "./components/Post";
import Profile from "./components/Profile";
import MyPosts from "./components/MyPosts";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import Footer from "./components/Footer";
import api from "./api/axios";
import { SignJWT } from "jose"; // Import SignJWT from jose

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get("/comments");
        setComments(response.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  function generateRandomLetters(length) {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomString += letters.charAt(randomIndex);
    }
    return randomString;
  }

  const secretKey = generateRandomLetters(32);

  const handleLogin = async () => {
    try {
      const { data } = await api.get("/users");
      const user = data.find((u) => u.username === username);
      if (user) {
        setCurrentUser(user);

        const payload = {
          userId: user.id,
          username: user.username,
        };

        const encoder = new TextEncoder();
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("2h")
          .sign(encoder.encode(secretKey));

        console.log(token);

        localStorage.setItem("jwtToken", token);

        navigate("/");
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div>
      {currentUser ? (
        <>
          <Navbar handleLogOut={handleLogOut} username={currentUser.username} />
          <Routes>
            <Route path="/" element={<Feed posts={posts} users={users} />} />
            <Route
              path="/Posts/:postId"
              element={
                <Post
                  comments={comments}
                  setComments={setComments}
                  newComment={newComment}
                  setNewComment={setNewComment}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/myPosts"
              element={
                <MyPosts
                  posts={posts}
                  currentUser={currentUser}
                  setPosts={setPosts}
                />
              }
            />
            <Route
              path="/newPost"
              element={<NewPost currentUser={currentUser} />}
            />
            <Route path="/post/:id" element={<EditPost />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Login
          username={username}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
