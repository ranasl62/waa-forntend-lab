
import data from "./../data/data.json";
const getPostbyId = (id) => {
    return data?.posts?.find(p => p.id == id);
}

const getPosts = (id) => {
    return id ? data?.posts?.find(p => p.id == id) : null;
}

export { getPostbyId, getPosts };