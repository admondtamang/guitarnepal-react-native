import axios from "axios";

const baseURL = "https://guitarnepal.com.np/";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ3VpdGFybmVwYWwuY29tLm5wIiwiaWF0IjoxNjIzNjg2NjExLCJuYmYiOjE2MjM2ODY2MTEsImV4cCI6MTYyNDI5MTQxMSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMjUifX19.jT_O-GTwsbtNxRneaElPuLwZOTgztjJ9F1yWDYuhXnQ",
    },
});

export default axiosInstance;
