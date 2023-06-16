import { useContext, useEffect, useState } from "react";
import posts from "../../helpers/posts";
import Button from "../forms/elements/Button";
import Label from "../forms/elements/Label";
import PostContext from "../../context/PostContext";

const PostDetails = ({
    backToPosts
}) => {
    const postId = useContext(PostContext);
    const [post, setPost] = useState(null);
    useEffect(() => {
        if (postId) {
            posts().getPostbyId(postId).then(res => {
                if (res.data.success == true) {
                    setPost(res.data.data);
                } else {
                    console.log("Post get failed because: " + res.data.message)
                }
            }).catch(err => {

                console.log("Post get failed")
            });
        }
    }, [postId]);
    if (postId == null || post == null) return;

    const deleteHandler = () => {
        posts().deletePost(postId).then(res => {
            if (res.data.success == true) {
                console.log("Delete Successfully");
                backToPosts();
            } else {
                console.log("Delete failed because: " + res.data.message)
            }
        }).catch(err => {

            console.log("Delete failed")
        });
    }
    return <div className="post-details-wrapper">
        <h2 className="post-details-headline">MIU</h2>
        <div className="post-details">
            <Button customButtonClass="back-button" label={"back"} oncClick={() => backToPosts("posts", postId)}></Button>
            <Label customClass="post-details-author" text={post.author}  ></Label>
            <Label customClass="post-details-title" text={post.title}  ></Label>
            <Button customButtonClass="edit-button" label={"edit"} oncClick={() => backToPosts("edit", postId)}></Button>
            <Button customButtonClass="delete-button" oncClick={deleteHandler} label={"delete"}></Button>
        </div>
    </div>;
}
export default PostDetails;