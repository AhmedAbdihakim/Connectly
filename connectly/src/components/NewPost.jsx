import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";

const NewPost = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);
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

  const handlePost = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Determine the new post ID
          const newPostId =
            posts.length === 0 ? 1 : posts[posts.length - 1].id + 1;

          // Create the new post
          await api.post("/posts", {
            id: newPostId,
            title,
            body,
            userId: currentUser.id, // Use current user's ID
          });

          Swal.fire("Saved!", "", "success");
          // Navigate to another page if needed
          navigate("/"); // Replace with your desired path
        } catch (error) {
          console.log("Error creating post:", error);
          Swal.fire("Error!", "There was an issue creating the post.", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">New post</h1>
      <form onSubmit={handlePost}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium dark:text-gray-100"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="body"
            className="block text-sm font-medium dark:text-gray-100"
          >
            Content:
          </label>
          <textarea
            id="body"
            name="body"
            rows="6"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-black"
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
