import axios from "axios";

const baseURL = "https://guitarnepal.com.np/";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ3VpdGFybmVwYWwuY29tLm5wIiwiaWF0IjoxNjIzMzQxNjM3LCJuYmYiOjE2MjMzNDE2MzcsImV4cCI6MTYyMzk0NjQzNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.jpbOpccE_WO1x6FDp4SbknXcIRp44qIdfZsxyvpiM6s",
    },
});

export default axiosInstance;
