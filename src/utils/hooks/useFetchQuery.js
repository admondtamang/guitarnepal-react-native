import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../axios";

const useFetchQuery = (url, options) => {
    const { isLoading, error, data, status } = useQuery("repoData", () => axiosInstance.get(url, { ...options }).then((res) => res.data));

    useEffect(() => {}, [url]);

    return {
        response: data,
        error,
        isLoading,
        status,
    };
};

export default useFetchQuery;
