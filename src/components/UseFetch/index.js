import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axios(url, options);
                setResponse(res.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [url]);
    return { response, error, isLoading };
};

export default useFetch;
