import { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts } from "../../helpers/posts";
import Button from "../forms/elements/Button";

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
                if (res.data.success == true) {
                    setPosts(res.data.data);
                }
            }
        );

    }, []);
    return <div className="posts-wrapper">
        <div className="wrapper-title">
            <h1 className="posts-title">Posts</h1>
            <Button customButtonClass="post-create-button" label={"Create"}></Button>
        </div>
        <div className="posts">
            {posts.map((post) => <Post {...post} key={post.id} handleOnClick={postViewHandler} />)}
        </div>
    </div>;
}

export default Posts;