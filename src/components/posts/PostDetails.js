import Button from "../forms/elements/Button";
import Label from "../forms/elements/Label";

const PostDetails = ({
    id,
    author,
    title,
    backToPosts
}) => {

    return <div className="post-details-wrapper">
        <h2 className="post-details-headline">MIU</h2>
        <div className="post-details">
            <Button customButtonClass="back-button" label={"back"} oncClick={backToPosts}></Button>
            <Label customClass="post-details-author" text={author}  ></Label>
            <Label customClass="post-details-title" text={title}  ></Label>
            <Button customButtonClass="edit-button" label={"edit"}></Button>
            <Button customButtonClass="delete-button" label={"delete"}></Button>
        </div>
    </div>;
}
export default PostDetails;