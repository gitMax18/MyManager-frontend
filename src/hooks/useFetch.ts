import React, { useEffect, useState } from "react";

type Method = "PUT" | "GET" | "DELETE" | "POST";

const baseUrl = "http://localhost:3000";

export default function useFetch<T>(endPoint: string, method: Method = "GET") {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);

    async function fetchApi(body: any = null, onSuccess?: (data: T) => void) {
        setError(null);
        setIsloading(true);
        try {
            const response = await fetch(baseUrl + endPoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : null,
            });
            if (!response.ok) {
                throw new Error("une erreur s'est produite");
            }
            const data = await response.json();
            setData(data);
            if (onSuccess) {
                onSuccess(data);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        if (method === "GET") {
            fetchApi();
        }
    }, [endPoint]);

    return { isLoading, data, error, fetchApi };
}
