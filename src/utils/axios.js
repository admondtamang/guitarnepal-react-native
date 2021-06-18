import axios from "axios";
import store from "../redux/configureStore";
const baseURL = "https://guitarnepal.com.np/";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ3VpdGFybmVwYWwuY29tLm5wIiwiaWF0IjoxNjIzNjg4MzYyLCJuYmYiOjE2MjM2ODgzNjIsImV4cCI6MTYyNDI5MzE2MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.z-5uMeqLwgXGa6_SdutY13zATebHEGsUxdVH5R2Y0Og",
    },
});

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         if (store.user.data && Object.keys(store.user.data).length !== 0) {
//             let token = store.user.data.token;

//             // let token = getAuthorizationToken();
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//                 config.headers["Access-Control-Allow-Origin"] = "*";
//                 config.headers["Content-Type"] = "application/json";
//             }

//             return config;
//         }
//     },
//     (error) => {
//         alert("interceptor request has error");
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
