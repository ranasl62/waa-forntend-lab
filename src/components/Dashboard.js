import { useState } from "react";
import Posts from "./posts/Posts";
import PostDetails from "./posts/PostDetails";
import posts from "../helpers/posts";
import { CreatePostForm, UpdatePostForm } from "./posts/PostForm";

const Dashboard = () => {

    const [view, setView] = useState('posts');
    const [post, setPost] = useState(null);
    const postDetailsHandler = (id, view = "details") => {
        if (id != null) {
            posts().getPostbyId(id).then(
                res => {
                    if (res.data.success == true) {
                        setPost(res.data.data);
                    }
                }
            );
        }
        setView(view);
    };

    const backToPosts = (view = "posts", id) => {
        postDetailsHandler(id, view);
    }
    return <div className="dashboard-wrapper">
        <header className="header">
            <h1>Dashboard</h1>
        </header>
        {view == "posts" && <Posts dashPostViewHandler={postDetailsHandler} />}
        {view == "details" && <PostDetails {...post} backToPosts={backToPosts} />}
        {view == "create" && <CreatePostForm backToPosts={backToPosts} />}
        {view == "edit" && <UpdatePostForm backToPosts={backToPosts} id={post.id} />}
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} rights reserved by MIU Student Group</p>
        </footer>
    </div>;
}

export default Dashboard;