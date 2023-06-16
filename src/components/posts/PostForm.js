import React, { useEffect, useState } from 'react';
import Button from '../forms/elements/Button';
import posts from '../../helpers/posts';

const PostForm = ({ onSubmit, initialPost, backToPosts, id = null }) => {
    const [post, setPost] = useState(initialPost);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(post);
        setPost(initialPost);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    return (
        <div className='post-form-wrapper'>
            <div className="wrapper-title">
                <h2 className="posts-title" style={{ color: "black" }}>{id == null ? "Create Post" : "Edit Post"}</h2>
                <Button customButtonClass="post-create-button" label={"Back"} oncClick={() => backToPosts(id ? "details" : "posts", id)}></Button>
            </div>
            <form className="post-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="author" className="form-label">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        className="form-input"
                        value={post.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-input"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div >
    );
};

const CreatePostForm = ({ backToPosts }) => {
    const createPostHandler = (post) => {
        posts().createPost({ userId: 1, post }).then(res => {
            if (res.data.success == true) {
                console.log("Updated Successfully");
                backToPosts();
            } else {
                console.log("Updated failed because: " + res.data.message)
            }
        }).catch(err => {

            console.log("Updated failed")
        });
    };

    return (
        <div className='create-post-wrapper'>
            <PostForm onSubmit={createPostHandler} initialPost={{ author: '', title: '' }} backToPosts={backToPosts} />
        </div>
    );
};

const UpdatePostForm = ({ id, backToPosts }) => {


    const [post, setPost] = useState({});
    const updatePostHandler = (post) => {
        posts().updatePost(id, post).then(res => {
            if (res.data.success == true) {
                console.log("Updated Successfully");
                backToPosts();
            } else {
                console.log("Updated failed because: " + res.data.message)
            }
        }).catch(err => {

            console.log("Updated failed")
        });
    };
    useEffect(() => {
        posts().getPostbyId(id).then(res => {
            if (res.data.success == true) {
                setPost(res.data.data);
            } else {
                console.log("Updated failed because: " + res.data.message)
            }
        }).catch(err => {

            console.log("Updated failed")
        });
    }, []);

    if (id === null) return <></>;

    const initialPost = { author: 'John Doe', title: 'Sample Title' };

    return (
        <div className='update-post-wrapper'>
            <PostForm onSubmit={updatePostHandler} initialPost={initialPost} backToPosts={backToPosts} id={id} />
        </div>
    );
};

export { CreatePostForm, UpdatePostForm };
