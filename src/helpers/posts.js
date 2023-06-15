import createHttpClient from "./createHttpClient";

const httpClient = createHttpClient("/posts");


const getPostbyId = (id) => {
    return httpClient.get({ url: `${httpClient.baseUrl}/${id}` });
}

const getPosts = () => {
    return httpClient.get({ url: httpClient.baseUrl });
}

const deletePost = (id) => {
    return httpClient.delete({ url: `${httpClient.baseUrl}/${id}` });
}

const updatePost = (id, post = {}) => {
    return httpClient.put({ url: `${httpClient.baseUrl}/${id}`, data: post });
}
const createPost = (post) => {
    return httpClient.post({ url: `${httpClient.baseUrl}`, data: post });
}

export {
    getPostbyId,
    getPosts,
    deletePost,
    updatePost,
    createPost
};