import React, { useState, useEffect } from 'react';
import Post from "../post/post";
import "./posts.css";
import { makeRequest } from "../../axios";

const Posts = ({ user_id }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await makeRequest.get("/posts?user_id=" + user_id);
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [user_id]);

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "Loading"
        : posts.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
