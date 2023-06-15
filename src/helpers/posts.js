import createHttpClient from "./createHttpClient";

const httpClient = createHttpClient("/posts");



const getPostbyId = (id) => {
    return httpClient.get({ url: `${httpClient.baseUrl}/${id}` }).then(res => console.log(res));
}

const getPosts = () => {
    return fetch(httpClient.baseUrl)
}

export { getPostbyId, getPosts }; 