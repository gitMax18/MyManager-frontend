import React, { useEffect, useState } from "react";

type Method = "PUT" | "GET" | "DELETE" | "POST";

const baseUrl = "http://localhost:3000";

export default function useFetch<T>(endPoint: string, method: Method = "GET") {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [validationError, setValidationError] = useState<any>(null);
    const [requestError, setRequestError] = useState<string>("");

    async function fetchApi(body: any = null, onSuccess?: (data: T) => void) {
        setValidationError(null);
        setRequestError("");
        setIsloading(true);
        try {
            const response = await fetch(baseUrl + endPoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : null,
            });
            const data = await response.json();
            if (!response.ok) {
                setValidationError(data);
                return;
            }
            setData(data);
            if (onSuccess) {
                onSuccess(data);
            }
        } catch (error) {
            setRequestError("Request failled, please retry after...");
        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        if (method === "GET") {
            fetchApi();
        }
    }, [endPoint]);

    return { isLoading, data, requestError, validationError, fetchApi };
}
