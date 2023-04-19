import React, { useState, useEffect } from "react";
import { useKobraViewModel } from "../viewModels/useKobraViewModel";
import PostRow from "./PostRow";
import { CreateAPostView } from "./CreateAPostView";
import "./css/KobraView.css";

const KobraView = () => {
  const [isPresentingCreatePostView, setIsPresentingCreatePostView] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState("Advertisement");
  const viewModel = useKobraViewModel();
  const { posts, fetchPosts } = viewModel;

  const isPostTypeVisible = (post) => {
    return post.type === selectedFeed;
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter(isPostTypeVisible).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="kobra-view">
      <header className="kobra-header">
        <h1>Kobra</h1>
        <button onClick={() => setIsPresentingCreatePostView(true)}>Create Post</button>
      </header>

      <nav className="feed-selector">
        {["Advertisement", "Help", "News", "Market"].map((type) => (
          <button key={type} onClick={() => setSelectedFeed(type)} className={selectedFeed === type ? "selected" : ""}>
            {type}
          </button>
        ))}
      </nav>

      <div className="post-container">
        {filteredPosts.map((post) => (
          <PostRow key={post.id} post={post} viewModel={viewModel} />
        ))}
      </div>

      <CreatePostModal
        isOpen={isPresentingCreatePostView}
        viewModel={viewModel}
        onRequestClose={() => setIsPresentingCreatePostView(false)}
      />
    </div>
  );
};

export default KobraView;
