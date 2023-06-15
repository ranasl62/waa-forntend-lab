import { deletePost } from "../../helpers/posts";
import Button from "../forms/elements/Button";
import Label from "../forms/elements/Label";

const PostDetails = ({
    id,
    author,
    title,
    backToPosts
}) => {
    const deleteHandler = () => {
        deletePost(id).then(res => {
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
            <Button customButtonClass="back-button" label={"back"} oncClick={backToPosts}></Button>
            <Label customClass="post-details-author" text={author}  ></Label>
            <Label customClass="post-details-title" text={title}  ></Label>
            <Button customButtonClass="edit-button" label={"edit"}></Button>
            <Button customButtonClass="delete-button" oncClick={deleteHandler} label={"delete"}></Button>
        </div>
    </div>;
}
export default PostDetails;