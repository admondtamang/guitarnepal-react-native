import axios from "axios";

const baseURL = "https://guitarnepal.com.np/";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ3VpdGFybmVwYWwuY29tLm5wIiwiaWF0IjoxNjIzNjg4MzYyLCJuYmYiOjE2MjM2ODgzNjIsImV4cCI6MTYyNDI5MzE2MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.z-5uMeqLwgXGa6_SdutY13zATebHEGsUxdVH5R2Y0Og",
    },
});

export default axiosInstance;
