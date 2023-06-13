import Button from "../forms/elements/Button";
import Label from "../forms/elements/Label";

const Post = ({
    id,
    title,
    author,
    handleOnClick
}) => {

    return (
        <div className="post-wrapper">
            <Button
                customButtonWrapperClass={"post-view-button-wrapper"}
                customLabelClass="post-view-button"
                label="view"
                oncClick={() => handleOnClick(id)}
                customButtonClass="post-details-view-button"
            />
            <Label customClass="post-id" text={`Id: ${id}`} />
            <Label customClass="post-title" text={`Title: ${title}`} />
            <Label customClass="post-author" text={`Author: ${author}`} />

        </div>
    );
}

export default Post;