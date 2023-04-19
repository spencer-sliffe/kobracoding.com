import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    doc,
    setDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadString, // Changed from putString to uploadString
    getDownloadURL
} from 'firebase/storage';



class FSPostManager {
    constructor() {
        this.db = getFirestore();
        this.storage = getStorage();
        this.postsCollection = 'Posts';
    }

    async fetchPosts() {
        const postsRef = collection(this.db, this.postsCollection);
        const postSnapshot = await getDocs(postsRef);
        const posts = postSnapshot.docs.map((doc) => this.createPostFrom(doc.data()));
        return posts;
    }

    async uploadImage(imageDataUrl, postId) {
        const storageRef = ref(this.storage, `post_images/${postId}.jpg`);
        await uploadString(storageRef, imageDataUrl, 'data_url'); // Changed from putString to uploadString
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
    }


    createPostFrom(data) {
        const id = data.id || '';
        const likes = data.likes || 0;
        const timestamp = data.timestamp?.toDate() || new Date();
        const postTypeString = data.postType || '';
        const postType = {};
        const likingUsers = data.likingUsers || [];
        const dislikingUsers = data.dislikingUsers || [];
        const comments = data.comments || [];
        const dislikes = data.dislikes || 0;

        switch (postTypeString) {
            case 'advertisement':
                postType.type = 'advertisement';
                postType.poster = data.poster || '';
                postType.title = data.title || '';
                postType.content = data.content || '';
                postType.category = data.category || '';
                break;
            case 'help':
                postType.type = 'help';
                postType.poster = data.poster || '';
                postType.question = data.question || '';
                postType.details = data.details || '';
                postType.category = data.category || '';
                break;
            case 'news':
                postType.type = 'news';
                postType.poster = data.poster || '';
                postType.headline = data.headline || '';
                postType.article = data.article || '';
                postType.category = data.category || '';
                break;
            case 'market':
                const vendor = data.vendor || '';
                const marketPostTypeString = data.marketPostType || '';
                const price = data.price || 0;
                const category = data.category || '';
                const marketPostType = {};

                switch (marketPostTypeString) {
                    case 'hardware':
                        marketPostType.type = 'hardware';
                        marketPostType.name = data.name || '';
                        marketPostType.condition = data.condition || 'used';
                        marketPostType.description = data.description || '';
                        break;
                    case 'software':
                        marketPostType.type = 'software';
                        marketPostType.name = data.name || '';
                        marketPostType.description = data.description || '';
                        break;
                    case 'service':
                        marketPostType.type = 'service';
                        marketPostType.name = data.name || '';
                        marketPostType.description = data.description || '';
                        break;
                    case 'other':
                        marketPostType.type = 'other';
                        marketPostType.title = data.title || '';
                        marketPostType.description = data.description || '';
                        break;
                    default:
                        throw new Error('Unknown market post type');
                }

                postType.type = 'market';
                postType.vendor = vendor;
                postType.marketPostType = marketPostType;
                postType.price = price;
                postType.category = category;
                break;
            default:
                throw new Error('Unknown post type');
        }

        return {
            id,
            type: postType,
            likes,
            timestamp,
            imageURL: data.imageURL || null,
            likingUsers,
            dislikingUsers,
            comments,
            dislikes,
        };
    }


    async addPost(post) {
        try {
            const data = this.convertPostToData(post);
            await collection(this.db, 'posts').add(data);
            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error
            };
        }
    }

    convertPostToData(post) {
        let data = {
            id: post.id,
            likes: post.likes,
            timestamp: post.timestamp,
            likingUsers: post.likingUsers,
            dislikes: post.dislikes,
            dislikingUsers: post.dislikingUsers,
            comments: post.comments,
        };

        let postTypeString;
        let marketPostTypeString;

        switch (post.type) {
            case 'advertisement':
                postTypeString = 'advertisement';
                data.poster = post.poster;
                data.title = post.title;
                data.content = post.content;
                data.category = post.category;
                break;
            case 'help':
                postTypeString = 'help';
                data.poster = post.poster;
                data.question = post.question;
                data.details = post.details;
                data.category = post.category;
                break;
            case 'news':
                postTypeString = 'news';
                data.poster = post.poster;
                data.headline = post.headline;
                data.article = post.article;
                data.category = post.category;
                break;
            case 'market':
                postTypeString = 'market';
                data.vendor = post.vendor;
                data.price = post.price;
                data.category = post.category;

                switch (post.marketPostType) {
                    case 'hardware':
                        marketPostTypeString = 'hardware';
                        data.name = post.name;
                        data.condition = post.condition;
                        data.description = post.description;
                        break;
                    case 'software':
                        marketPostTypeString = 'software';
                        data.name = post.name;
                        data.description = post.description;
                        break;
                    case 'service':
                        marketPostTypeString = 'service';
                        data.name = post.name;
                        data.description = post.description;
                        break;
                    case 'other':
                        marketPostTypeString = 'other';
                        data.title = post.title;
                        data.description = post.description;
                        break;
                }
                if (marketPostTypeString) {
                    data.marketPostType = marketPostTypeString;
                }
                break;
        }

        data.postType = postTypeString;

        if (post.imageURL) {
            data.imageURL = post.imageURL;
        }

        return data;
    }

    async fetchComments(post) {
        const postId = post.id;
        const postRef = this.db.collection(this.postsCollection).doc(postId);
        const commentsRef = postRef.collection('comments');
        const commentsSnapshot = await commentsRef.get();

        const comments = commentsSnapshot.docs.map(doc => {
            const commentData = doc.data();
            return {
                id: commentData.id,
                text: commentData.text,
                commenter: commentData.commenter,
                timestamp: commentData.timestamp.toDate(),
            };
        });

        return comments;
    }


    async updatePost(post) {
        const postRef = doc(this.db, this.postsCollection, post.id);
        const postData = this.convertPostToData(post);
        await setDoc(postRef, postData);
    }

    addPostWithImage(post, image, completion) {
        this.addPost(post, (result) => {
            if (result.success) {
                this.uploadImage(image, post.id, (uploadResult) => {
                    if (uploadResult.success) {
                        this.updateImageURLForPost(post, uploadResult.imageURL, completion);
                    } else {
                        completion({
                            success: false,
                            error: uploadResult.error
                        });
                    }
                });
            } else {
                completion({
                    success: false,
                    error: result.error
                });
            }
        });
    }

    updateImageURLForPost(post, imageURL, completion) {
        const id = post.id;
        const postRef = this.db.collection(this.postsCollection).doc(id);

        postRef.update({
            imageURL: imageURL
        }).then(() => {
            completion({
                success: true
            });
        }).catch((error) => {
            completion({
                success: false,
                error: error
            });
        });
    }

    deleteImage(imageURL, completion) {
        const storageRef = ref(this.storage, imageURL);

        storageRef.delete().then(() => {
            completion({
                success: true
            });
        }).catch((error) => {
            completion({
                success: false,
                error: error
            });
        });
    }


    updateLikeCount(post, likeCount, userId, isAdding) {
        const postId = post.id;
        const queryRef = query(this.db, collection(this.db, this.postsCollection), where("id", "==", postId));

        getDocs(queryRef).then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.error("No document found with matching post id");
                return;
            }

            const document = querySnapshot.docs[0];
            const updateData = {
                likes: likeCount,
                likingUsers: isAdding ?
                    arrayUnion(userId) : arrayRemove(userId)
            };

            document.ref.update(updateData).then(() => {
                console.log("Like count updated successfully");
            }).catch((error) => {
                console.error("Error updating like count:", error);
            });
        }).catch((error) => {
            console.error("Error updating like count:", error);
        });
    }

    deletePost(post, completion) {
        const postRef = doc(this.db, this.postsCollection, post.id);

        postRef.delete().then(() => {
            if (completion) {
                completion(true);
            }
        }).catch((error) => {
            console.error("Error deleting post:", error);
            if (completion) {
                completion(false);
            }
        });
    }

    updateComments(post, comment) {
        const postId = post.id;
        const queryRef = query(this.db, collection(this.db, this.postsCollection), where("id", "==", postId));

        getDocs(queryRef).then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.error("No document found with matching post id");
                return;
            }

            const document = querySnapshot.docs[0];
            const updateData = {
                comments: arrayUnion(comment)
            };

            document.ref.update(updateData).then(() => {
                console.log("Comment added successfully");
            }).catch((error) => {
                console.error("Error adding comment:", error);
            });
        }).catch((error) => {
            console.error("Error adding comment:", error);
        });
    }

    updateDislikeCount(post, dislikeCount, userId, isAdding) {
        const postId = post.id;
        const queryRef = query(this.db, collection(this.db, this.postsCollection), where("id", "==", postId));

        getDocs(queryRef).then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.error("No document found with matching post id");
                return;
            }

            const document = querySnapshot.docs[0];
            const updateData = {
                dislikes: dislikeCount,
                dislikingUsers: isAdding ?
                    arrayUnion(userId) : arrayRemove(userId)
            };

            document.ref.update(updateData).then(() => {
                console.log("Dislike count updated successfully");
            }).catch((error) => {
                console.error("Error updating dislike count:", error);
            });
        }).catch((error) => {
            console.error("Error updating dislike count:", error);
        });
    }
}

export default FSPostManager;
