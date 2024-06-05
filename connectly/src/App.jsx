import { Route, Routes, useNavigate } from "react-router-dom";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Post from "./components/Post";
import Profile from "./components/Profile";
import MyPosts from "./components/MyPosts";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import { useState } from "react";
import api from "./api/axios";
import { SignJWT } from "jose"; // Import SignJWT from jose

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function generateRandomLetters(length) {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomString += letters.charAt(randomIndex);
    }
    return randomString;
  }

  const secretKey = generateRandomLetters(32); // Generate a 32-character random letter key
  // console.log(secretKey); // For debugging purposes

  const handleLogin = async () => {
    try {
      const { data } = await api.get("/users");
      const user = data.find((u) => u.username === username);
      if (user) {
        setCurrentUser(user);

        // Define your payload with the username
        const payload = {
          userId: user.id,
          username: user.username,
        };

        // Generate the token with payload
        const encoder = new TextEncoder();
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("2h")
          .sign(encoder.encode(secretKey));

        console.log(token);

        localStorage.setItem("jwtToken", token);

        navigate("/");
        setUsername("");
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <div>
      {currentUser ? (
        <>
          <Navbar handleLogOut={handleLogOut} username={username} />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/Posts/:postId" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myPosts" element={<MyPosts />} />
            <Route path="/newPost" element={<NewPost />} />
          </Routes>
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
