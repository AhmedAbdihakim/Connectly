import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";

const MyPosts = ({ posts, setPosts, currentUser }) => {
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
  }, [setPosts]);

  const myPosts = posts.filter((post) => post.userId === currentUser.id);

  const handleDelete = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/posts/${postId}`);
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        } catch (error) {
          console.log("Error deleting post:", error);
          Swal.fire("Error!", "There was an issue deleting the post.", "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your post is safe :)", "error");
      }
    });
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 mb-16">
      <h1 className="text-2xl font-bold mb-4 text-center">My Posts</h1>
      {myPosts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="space-y-4">
          {myPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 dark:text-gray-100 mb-4">
                {post.body}
              </p>
              <div className="flex space-x-4">
                <Link to={`/post/${post.id}`}>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <BiEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <MdDelete />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
