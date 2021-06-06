import axios from "axios";

const baseURL = "https://guitarnepal.com.np/";

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ3VpdGFybmVwYWwuY29tLm5wIiwiaWF0IjoxNjIyNjU0Mzk4LCJuYmYiOjE2MjI2NTQzOTgsImV4cCI6MTYyMzI1OTE5OCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.05TUXGMRW-MNwEdndp2U9DS-EHm_Y5YBqVnViTywylc",
    },
});

export default axiosInstance;
