import createHttpClient from "./createHttpClient";

const posts = () => {

    const httpClient = createHttpClient();

    const BASE_URL = process.env.REACT_APP_API_URL + "/posts";
    const getPostbyId = (id) => {
        return httpClient.get({ url: `${BASE_URL}/${id}` });
    }

    const getPosts = () => {
        console.log("Rana", BASE_URL);

        return httpClient.get({ url: BASE_URL });
    }

    const deletePost = (id) => {
        return httpClient.delete({ url: `${BASE_URL}/${id}` });
    }

    const updatePost = (id, post = {}) => {
        return httpClient.put({ url: `${BASE_URL}/${id}`, data: post });
    }
    const createPost = (post) => {
        return httpClient.post({ url: `${BASE_URL}`, data: post });
    }

    return {
        getPostbyId,
        getPosts,
        deletePost,
        updatePost,
        createPost
    };
}

export default posts;