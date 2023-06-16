import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const createHttpClient = () => {

    const httpClient = axios.create();

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    httpClient.interceptors.request.use(
        (config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    httpClient.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (
                error?.response?.status === 401 &&
                !originalRequest._retry &&
                refreshToken
            ) {
                originalRequest._retry = true;

                try {
                    const { data } = await axios.post('/refresh-token', {
                        refreshToken: refreshToken,
                    });

                    const newAccessToken = data.accessToken;

                    localStorage.setItem('accessToken', newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return httpClient(originalRequest);
                } catch (error) {
                    // Handle refresh token error
                    console.log('Refresh token error:', error);
                    // Redirect to login page or handle logout
                }
            }

            return Promise.reject(error);
        }
    );

    const setTokens = (newAccessToken, newRefreshToken) => {
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
    };

    const clearTokens = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };
    const getURLWithQueryParam = ({ baseUrl = BASE_URL, json }) => {
        const params = new URLSearchParams();

        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                params.append(key, json[key]);
            }
        }

        return `${baseUrl}?${params.toString()}`;
    }

    const get = ({ url, query = {}, config = {} }) => {
        return httpClient.get(getURLWithQueryParam({ baseUrl: url, json: query }), config);
    };

    const post = ({ url = BASE_URL, data = {}, config = {} }) => {
        return httpClient.post(url, data, config);
    };

    const put = ({ url = BASE_URL, data = {}, config = {} }) => {
        return httpClient.put(url, data, config);
    };

    const patch = ({ url = BASE_URL, data = {}, config = {} }) => {
        return httpClient.patch(url, data, config);
    };

    const deleteReq = ({ url = BASE_URL, config = {} }) => {
        return httpClient.delete(url, config);
    };

    return {
        setTokens,
        clearTokens,
        get,
        post,
        put,
        patch,
        delete: deleteReq,
        baseUrl: BASE_URL,
    };
};

export default createHttpClient;
