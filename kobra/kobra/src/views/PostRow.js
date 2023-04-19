import React, { useState } from "react";
import "./PostRow.css";
import { Auth } from "firebase/auth";
import AsyncImage from "./AsyncImage"; // Import the AsyncImage component if you have it in your project
import CommentView from "./CommentView"; // Import the CommentView component if you have it in your project

const PostRow = ({ post, viewModel }) => {
  const currentUserId = Auth.currentUser?.uid || "";
  const [isLiked, setIsLiked] = useState(post.likingUsers.includes(currentUserId));
  const [likes, setLikes] = useState(post.likes);
  const [isDisliked, setIsDisliked] = useState(post.dislikingUsers.includes(currentUserId));
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [showingComments, setShowingComments] = useState(false);
  const [showingDeleteAlert, setShowingDeleteAlert] = useState(false);

  const getPosterName = () => {
    switch (post.type) {
      case "Advertisement":
        return `Advertisement by ${post.poster}`;
      case "Help":
        return `Help Request by ${post.poster}`;
      case "News":
        return `Article by ${post.poster}`;
      case "Market":
        return `Product by ${post.vendor}`;
      default:
        return "";
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikes(likes + 1);
      viewModel.updateLikeCount(post, likes + 1, currentUserId, true);
    } else {
      setLikes(likes - 1);
      viewModel.updateLikeCount(post, likes - 1, currentUserId, false);
    }
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (!isDisliked) {
      setDislikes(dislikes + 1);
      viewModel.updateDislikeCount(post, dislikes + 1, currentUserId, true);
    } else {
      setDislikes(dislikes - 1);
      viewModel.updateDislikeCount(post, dislikes - 1, currentUserId, false);
    }
  };

  const handleDelete = () => {
    setShowingDeleteAlert(false);
    viewModel.deletePost(post);
  };

  // Render post content based on its type
  const renderPostContent = () => {
    // Add the necessary JSX structure and styles for different post types
  };

  return (
    <div className="post-row">
      {/* Render the post content */}
      {renderPostContent()}

      {/* Render like, dislike, comment, and delete buttons */}
      {/* Add the necessary JSX structure and styles for the buttons */}

      {/* Render the CommentView component when showingComments is true */}
      {showingComments && <CommentView post={post} />}

      {/* Render the delete alert when showingDeleteAlert is true */}
      {showingDeleteAlert && (
        <div>
          {/* Add the necessary JSX structure and styles for the delete alert */}
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setShowingDeleteAlert(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PostRow;
