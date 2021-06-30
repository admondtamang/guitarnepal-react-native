import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../axios";

const useFetchQuery = (queryName, url, options) => {
    const { isLoading, error, data, status } = useQuery(queryName, () => axiosInstance.get(url, { ...options }).then((res) => res.data));

    useEffect(() => {}, [url, status]);

    return {
        response: data,
        error,
        isLoading,
        status,
    };
};

export default useFetchQuery;
