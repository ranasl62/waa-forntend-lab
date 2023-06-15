import { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts } from "../../helpers/posts";

const Posts = (
    { dashPostViewHandler }
) => {

    const [posts, setPosts] = useState([]);
    const postViewHandler = (id) => {
        dashPostViewHandler(id);
    }
    useEffect(() => {

        getPosts().then(
            res => {
                console.log(res);
                // setPosts(res);
            }
        );

    }, []);
    return <div className="posts-wrapper">
        <h1 className="posts-title">Posts</h1>
        <div className="posts">
            {posts.map((post) => <Post {...post} key={post.id} handleOnClick={postViewHandler} />)}
        </div>
    </div>;
}

export default Posts;