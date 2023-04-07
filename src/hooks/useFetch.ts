import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";

type Method = "PUT" | "GET" | "DELETE" | "POST";

const baseUrl = "http://localhost:3000";

export default function UseFetch<T>(endPoint: string, method: Method = "GET") {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [validationError, setValidationError] = useState<any>(null);
    const [requestError, setRequestError] = useState<string>("");

    const { user } = useAuth();

    async function fetchApi(body: Partial<T | null> = null, onSuccess?: (data: T) => void) {
        setValidationError(null);
        setRequestError("");
        setIsloading(true);
        try {
            console.log("fetching data...");
            const response = await fetch(baseUrl + endPoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: body ? JSON.stringify(body) : null,
            });
            const data = await response.json();
            if (!response.ok) {
                setValidationError(data);
                return;
            }
            // if on success is ussed we don't set data in the hook
            if (onSuccess) {
                onSuccess(data.data);
                return;
            }
            setData(data.data);
        } catch (error) {
            setRequestError("Request failled, please retry after...");
            console.log(error);
        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        if (method === "GET") {
            fetchApi();
        }
    }, [endPoint, user]);

    return { isLoading, data, setData, requestError, validationError, fetchApi };
}
