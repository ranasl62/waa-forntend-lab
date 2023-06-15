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

export { getPostbyId, getPosts, deletePost };