import React, { useState } from "react";
import { Auth } from "firebase/auth";
import CommentRow from "./CommentRow"; // Import the CommentRow component if you have it in your project
import "./CommentView.css";

const CommentView = ({ post, viewModel }) => {
  const [newCommentText, setNewCommentText] = useState("");
  const currentUserId = Auth.currentUser?.uid || "";

  const addComment = () => {
    if (newCommentText.trim() !== "") {
      const newComment = {
        text: newCommentText,
        commenter: currentUserId,
        timestamp: new Date(),
      };
      viewModel.addComment(post, newComment);
      setNewCommentText("");
    }
  };

  return (
    <div className="comment-view">
      <div className="comment-list">
        {post.comments.map((comment, index) => (
          <CommentRow key={index} comment={comment} />
        ))}
      </div>
      <div className="new-comment">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button onClick={addComment}>Post</button>
      </div>
    </div>
  );
};

export default CommentView;
