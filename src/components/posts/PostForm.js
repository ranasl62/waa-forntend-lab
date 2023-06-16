import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '../forms/elements/Button';
import posts from '../../helpers/posts';
import PostContext from '../../context/PostContext';

const PostForm = ({ onSubmit, initialPost, backToPosts }) => {

    const [post, setPost] = useState(initialPost);
    const formRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        // @ts-ignore
        const formValues = Object.fromEntries(formData.entries());
        onSubmit(formValues);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    };


    return (
        <div className='post-form-wrapper'>
            <div className="wrapper-title">
                <h2 className="posts-title" style={{ color: "black" }}>{initialPost?.id == null ? "Create Post" : "Edit Post"}</h2>
                <Button customButtonClass="post-create-button" label={"Back"} oncClick={() => backToPosts(initialPost?.id ? "details" : "posts", initialPost.id)}></Button>
            </div>
            <form className="post-form" ref={formRef} onSubmit={handleSubmit}>
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

const UpdatePostForm = ({ backToPosts }) => {
    const postId = useContext(PostContext);

    const [post, setPost] = useState({ author: null, title: null, id: null });

    const updatePostHandler = (post) => {
        posts().updatePost(postId, post).then(res => {
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
        if (postId) {
            posts().getPostbyId(postId).then(res => {
                if (res.data.success == true) {
                    setPost(res.data.data);
                } else {
                    console.log("Updated failed because: " + res.data.message)
                }
            }).catch(err => {

                console.log("Updated failed")
            });
        }

    }, [postId]);

    if (postId === null || post.author == null || post.title == null) return <></>;
    console.log(post);
    return (
        <div className='update-post-wrapper'>
            <PostForm onSubmit={updatePostHandler} initialPost={{ author: post?.author, title: post?.title, id: postId }} backToPosts={backToPosts} />
        </div>
    );
};

export { CreatePostForm, UpdatePostForm };
