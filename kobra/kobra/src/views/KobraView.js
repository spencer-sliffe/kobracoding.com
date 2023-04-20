import React, {
    useState,
    useEffect
} from "react";
import {
    useKobraViewModel
} from "../viewModels/useKobraViewModel";
import PostRow from "./PostRow";
import CreateAPostView from "./CreateAPostView";
import "./css/KobraView.css";
import "./css/CreateAPostView.css";

const KobraView = () => {
    const [isPresentingCreatePostView, setIsPresentingCreatePostView] = useState(false);
    const [selectedFeed, setSelectedFeed] = useState("Advertisement");
    const viewModel = useKobraViewModel();
    const {
        posts,
        fetchPosts
    } = viewModel;

    const isPostTypeVisible = (post) => {
        return post.type === selectedFeed;
    };

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const filteredPosts = posts.filter(isPostTypeVisible).sort((a, b) => b.timestamp - a.timestamp);

    return ( <
        div className = "kobra-view" >
        <
        nav className = "feed-selector" > {
            ["Advertisement", "Help", "News", "Market"].map((type) => ( <
                button key = {
                    type
                }
                onClick = {
                    () => {
                        setSelectedFeed(type);
                        setIsPresentingCreatePostView(false);
                    }
                }
                className = {
                    selectedFeed === type ? "selected" : ""
                } >
                {
                    type
                } <
                /button>
            ))
        } <
        button className = "create-post-btn"
        onClick = {
            () => setIsPresentingCreatePostView(true)
        } >
        Create Post <
        /button> <
        /nav>

        <
        div className = "post-container" > {
            filteredPosts.map((post) => ( <
                PostRow key = {
                    post.id
                }
                post = {
                    post
                }
                viewModel = {
                    viewModel
                }
                />
            ))
        } <
        /div>

        {
            isPresentingCreatePostView && ( <
                CreateAPostView isOpen = {
                    isPresentingCreatePostView
                }
                viewModel = {
                    viewModel
                }
                onRequestClose = {
                    () => setIsPresentingCreatePostView(false)
                }
                />
            )
        } <
        /div>
    );

};

export default KobraView;
