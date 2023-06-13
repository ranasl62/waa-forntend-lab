import Post from "./Post";

import data from "./../../data/data.json";
const Posts = (
    { dashPostViewHandler }
) => {
    const posts = data.posts;
    const postViewHandler = (id) => {
        dashPostViewHandler(id);
    }
    return <div className="posts-wrapper">
        <h1 className="posts-title">Posts</h1>
        <div className="posts">
            {posts.map((post) => <Post {...post} key={post.id} handleOnClick={postViewHandler} />)}
        </div>
    </div>;
}

export default Posts;