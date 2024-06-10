import { useState, useRef } from "react";
import { dummy } from "../apis/dummy";

const usePosts = () => {
  const [posts, setPosts] = useState(dummy);
  const postIdRef = useRef(26);

  const addPost = newPost => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    postIdRef.current += 1;
  };

  const handleDelete = postId => {
    setPosts(prevPosts => prevPosts.filter(post => post.postId !== postId));
  };

  const handleUpdate = updatedPost => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.postId === updatedPost.postId ? updatedPost : post,
      ),
    );
  };

  return {
    posts,
    addPost,
    handleDelete,
    handleUpdate,
    postIdRef,
  };
};

export default usePosts;
