import { useEffect, useState } from "react";
import Post from "./Post";
import Button from "../forms/elements/Button";
import posts from "../../helpers/posts";

const Posts = (
    { dashPostViewHandler }
) => {

    const [postData, setPostData] = useState([]);

    const postViewHandler = (id) => {
        dashPostViewHandler(id, "details");
    }
    useEffect(() => {
        posts().getPosts().then(
            res => {
                if (res.data.success == true) {
                    setPostData(res.data.data);
                }
            }
        );

    }, []);
    return <div className="posts-wrapper">
        <div className="wrapper-title">
            <h1 className="posts-title">Posts</h1>
            <Button customButtonClass="post-create-button" label={"Create"} oncClick={() => dashPostViewHandler(null, "create")}></Button>
        </div>
        <div className="posts">
            {postData.map((post) => <Post {...post} key={post.id} handleOnClick={postViewHandler} />)}
        </div>
    </div>;
}

export default Posts;