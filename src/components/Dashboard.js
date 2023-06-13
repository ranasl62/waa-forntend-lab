import { useState } from "react";
import Posts from "./posts/Posts";
import PostDetails from "./posts/PostDetails";
import { getPostbyId } from "../helpers/posts";
import Label from "./forms/elements/Label";

const Dashboard = () => {

    const [view, setView] = useState('posts');
    const [post, setPost] = useState(null);
    const postDetailsHandler = (id) => {

        setPost(getPostbyId(id))
        setView("details");
    };

    const backToPosts = () => {
        setPost(null)
        setView("posts");
    }
    return <div className="dashboard-wrapper">
        <header className="header">
            <h1>Dashboard</h1>
        </header>
        {view == "posts" && <Posts dashPostViewHandler={postDetailsHandler} />}
        {view == "details" && <PostDetails {...post} backToPosts={backToPosts} />}
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} rights reserved by MIU Student Group</p>
        </footer>
    </div>;
}

export default Dashboard;