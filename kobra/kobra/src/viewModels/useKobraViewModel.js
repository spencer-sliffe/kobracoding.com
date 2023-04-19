import { useState, useEffect } from "react";
import { FSPostManager } from "./FSPostManager";

export function useKobraViewModel() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const postManager = new FSPostManager();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await postManager.fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // ...
  const addPost = async (post, image, completion) => {
    if (image) {
      try {
        const imageURL = await postManager.uploadImage(image, post.id);
        const newPost = { ...post, imageURL };
        await postManager.addPost(newPost);
        fetchPosts();
        if (completion) {
          completion(null);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        if (completion) {
          completion(error);
        }
      }
    } else {
      try {
        await postManager.addPost(post);
        fetchPosts();
        if (completion) {
          completion(null);
        }
      } catch (error) {
        console.error("Error adding post:", error);
        if (completion) {
          completion(error);
        }
      }
    }
  };

  const updateLikeCount = async (post, likeCount, userId, isAdding) => {
    await postManager.updateLikeCount(post, likeCount, userId, isAdding);
    fetchPosts();
  };

  const updateDislikeCount = async (post, dislikeCount, userId, isAdding) => {
    await postManager.updateDislikeCount(post, dislikeCount, userId, isAdding);
    fetchPosts();
  };

  const updateComments = async (post, comment) => {
    await postManager.updateComments(post, comment);
    fetchPosts();
  };

  const updatePost = async (post) => {
    try {
      await postManager.updatePost(post);
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (post) => {
    try {
      await postManager.deletePost(post);
      if (post.imageURL) {
        try {
          await postManager.deleteImage(post.imageURL);
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const fetchComments = async (post, completion) => {
    try {
      const comments = await postManager.fetchComments(post);
      setComments(comments);
      if (completion) {
        completion(comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return {
    posts,
    comments,
    addPost,
    updateLikeCount,
    updateDislikeCount,
    updateComments,
    updatePost,
    deletePost,
    fetchComments,
  };