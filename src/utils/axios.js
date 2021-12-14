import axios from "axios";
import { consumerKey, consumerSecret, baseURL } from "../config/config";
import store from "../redux/configureStore";
import { fetchRefreshToken } from "../redux/user/userSlice";
const axiosInstance = axios.create({
    baseURL,

});

axiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    async function (error) {
        const expectedError = error.response;

        const status = error.response.data.data.status;

        if (expectedError) {
            // orginal request
            const originalRequest = error.response.config;
            if (status === 500) {
                toast.error("Server is not responding, please try again later.");
            }
            // For authorized refresh token
            if (status === 401 || 403) {
                // provide new tokens.
                const res = await store.dispatch(fetchRefreshToken());

                if (res.meta.requestStatus === "fulfilled") {
                    // window.location.reload();

                    const request = {
                        ...originalRequest,
                        headers: {
                            Authorization: "Bearer " + res.payload.token,
                        },
                    };
                    return axios(request);
                }
            }
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
