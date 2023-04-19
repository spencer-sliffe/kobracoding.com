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
    switch (post.type) {
      case "Advertisement":
      return (
        <div className="post-content advertisement">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <AsyncImage src={post.image} />
        <p>{getPosterName()}</p>
        </div>
      );
      case "Help":
      return (
        <div className="post-content help">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <p>{getPosterName()}</p>
        </div>
      );
      case "News":
      return (
        <div className="post-content news">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <AsyncImage src={post.image} />
        <p>{getPosterName()}</p>
        </div>
      );
      case "Market":
      return (
        <div className="post-content market">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <AsyncImage src={post.image} />
        <p>{getPosterName()}</p>
        </div>
      );
      default:
      return <div className="post-content unknown">Unknown Post Type</div>;
    }
  };


  return (
    <div className="post-row">
    {/* Render the post content */}
    {renderPostContent()}

    {/* Render like, dislike, comment, and delete buttons */}
    <div className="actions">
    <button className={`like-btn ${isLiked ? "liked" : ""}`} onClick={handleLike}>
    {isLiked ? "❤️" : "♡"} {likes}
    </button>
    <button className={`dislike-btn ${isDisliked ? "disliked" : ""}`} onClick={handleDislike}>
    {isDisliked ? "👎" : "👍"} {dislikes}
    </button>
    <button className="comment-btn" onClick={() => setShowingComments(!showingComments)}>
    💬 Comment
    </button>
    <button className="delete-btn" onClick={() => setShowingDeleteAlert(true)}>
    🗑️ Delete
    </button>
    </div>

    {/* Render the CommentView component when showingComments is true */}
    {showingComments && <CommentView post={post} />}

    {/* Render the delete alert when showingDeleteAlert is true */}
    {showingDeleteAlert && (
      <div className="delete-alert">
      <p>Are you sure you want to delete this post?</p>
      <button className="delete-confirm-btn" onClick={handleDelete}>
      Delete
      </button>
      <button className="delete-cancel-btn" onClick={() => setShowingDeleteAlert(false)}>
      Cancel
      </button>
      </div>
    )}
    </div>
  );

  export default PostRow;
