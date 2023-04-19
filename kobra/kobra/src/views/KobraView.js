import React, { useState, useEffect } from "react";
import { useKobraViewModel } from "./useKobraViewModel";
import PostRow from "./PostRow";
import CreatePostModal from "./CreatePostModal";
import "./KobraView.css";

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
      {/* Render the header, post rows, and toolbar here */}
      <CreatePostModal isOpen={isPresentingCreatePostView} viewModel={viewModel} onRequestClose={() => setIsPresentingCreatePostView(false)} />
    </div>
  );
};

export default KobraView;
