import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await api.get(`/posts/${postId}`);
        setPost(postResponse.data);
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsResponse = await api.get(`/posts/${postId}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const usersResponse = await api.get("/users");
        setUsers(usersResponse.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchPost();
    fetchComments();
    fetchUsers();
  }, [postId]);

  const findUsernameByUserId = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "Unknown User";
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 mb-8">
      <article className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-700 dark:text-gray-100 mb-4">{post.body}</p>
        <p className="text-gray-600 dark:text-gray-400">
          Posted by: {findUsernameByUserId(post.userId)}
        </p>
        <hr />
        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mb-4">
                  <strong>{comment.email}:</strong>
                  <br />
                  {comment.body}
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>
    </div>
  );
};

export default Post;
