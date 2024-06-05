import React from "react";
import { Link } from "react-router-dom";

const Feed = ({ posts, users }) => {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500">No posts available.</p>
    );
  }

  // Shuffle the posts array randomly
  const shuffledPosts = posts.sort(() => Math.random() - 0.5);

  return (
    <section className="container mx-auto max-w-xl px-4">
      <div className="flex flex-col gap-4">
        {shuffledPosts.map((post) => {
          // Find the user associated with the post
          const user = users.find((user) => user.id === post.userId);
          // If user is not found, display 'Unknown' as the username
          const username = user ? user.username : "Unknown";

          return (
            <article
              key={post.id}
              className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-4 md:p-6"
            >
              <h2 className="text-xl font-bold mb-2">{username}</h2>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 dark:text-gray-100 mb-4">
                {post.body}
              </p>
              <Link
                to={`/Posts/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Feed;
