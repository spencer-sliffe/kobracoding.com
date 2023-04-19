import React from "react";
import "./css/CommentRow.css";

const CommentRow = ({ comment }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="comment-row">
      <div className="comment-header">
        <span className="commenter">{comment.commenter}</span> {/* Display the user ID for now */}
      </div>
      <div className="comment-text">{comment.text}</div>
      <div className="comment-footer">
        <span className="comment-timestamp">{formatDate(comment.timestamp)}</span>
      </div>
    </div>
  );
};

export default CommentRow;
