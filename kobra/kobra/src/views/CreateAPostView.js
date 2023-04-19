import React, { useState } from "react";
import { auth } from "../firebase.js"; // Import the Firebase auth object from the firebase.js file
import "./css/CreateAPostView.css";

const CreatePostView = ({ onRequestClose, viewModel }) => {
  const currentUserId = auth.currentUser?.uid || "";
  const [postType, setPostType] = useState("Advertisement");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  // Additional state variables for market posts
  const [marketPostType, setMarketPostType] = useState("hardware");
  const [hardwareCondition, setHardwareCondition] = useState("used");
  const [price, setPrice] = useState(0);

  const handlePost = () => {
    const timestamp = new Date().toISOString();

    let post;
    switch (postType) {
      case "Advertisement":
      post = {
        type: postType,
        title,
        content,
        category,
        timestamp,
        userId: currentUserId,
      };
      break;
      case "Help":
      post = {
        type: postType,
        title,
        content,
        category,
        timestamp,
        userId: currentUserId,
      };
      break;
      case "News":
      post = {
        type: postType,
        title,
        content,
        category,
        timestamp,
        userId: currentUserId,
      };
      break;
      case "Market":
      let marketPost;
      switch (marketPostType) {
        case "hardware":
        marketPost = {
          type: marketPostType,
          title,
          content,
          category,
          condition: hardwareCondition,
          price,
        };
        break;
        case "software":
        marketPost = {
          type: marketPostType,
          title,
          content,
          category,
          price,
        };
        break;
        case "service":
        marketPost = {
          type: marketPostType,
          title,
          content,
          category,
          price,
        };
        break;
        case "other":
        marketPost = {
          type: marketPostType,
          title,
          content,
          category,
          price,
        };
        break;
        default:
        throw new Error("Unknown market post type");
      }
      post = {
        type: postType,
        marketPost,
        timestamp,
        userId: currentUserId,
      };
      break;
      default:
      throw new Error("Unknown post type");
    }

    // Add the created post to the viewModel.posts array
    viewModel.addPost(post);
    onRequestClose();
  };

  const renderMarketPostContent = () => {
  if (postType === "Market") {
    return (
      <div>
        <select value={marketPostType} onChange={(e) => setMarketPostType(e.target.value)}>
          <option value="hardware">Hardware</option>
          <option value="software">Software</option>
          <option value="service">Service</option>
          <option value="other">Other</option>
        </select>

        {marketPostType === "hardware" && (
          <select value={hardwareCondition} onChange={(e) => setHardwareCondition(e.target.value)}>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        )}

        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" />
      </div>
    );
  } else {
    return null;
  }
};

return (
<div className="create-post-view">
  <div className="form">
    <label htmlFor="post-type">Post Type</label>
    <select id="post-type" value={postType} onChange={(e) => setPostType(e.target.value)}>
      <option value="Advertisement">Advertisement</option>
      <option value="Help">Help</option>
      <option value="News">News</option>
      <option value="Market">Market</option>
    </select>

    <label htmlFor="title">Title</label>
    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />

    <label htmlFor="content">Content</label>
    <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />

    {postType !== "Market" && (
      <>
        <label htmlFor="category">Category</label>
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      </>
    )}

    {renderMarketPostContent()}

    <button className="post-button" onClick={handlePost}>
      Post
    </button>
  </div>
  </div>
    );
  };

  export default CreatePostView;
