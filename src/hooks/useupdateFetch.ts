import React, { useEffect, useState } from "react";

type Method = "PUT" | "GET" | "DELETE" | "POST";

const baseUrl = "http://localhost:3000";

export default function useUpdateFetch() {
    const [isLoading, setIsloading] = useState<boolean>(false);
    // const [data, setData] = useState<T | null>(null);
    const [validationError, setValidationError] = useState<any>(null);
    const [requestError, setRequestError] = useState<string>("");

    async function fetchUpdateApi<Tbody, Tresponse>(
        endpoint: string,
        method: Method,
        body: Partial<Tbody | null> = null,
        onSuccess?: (data: Tresponse) => void
    ) {
        setValidationError(null);
        setRequestError("");
        setIsloading(true);
        try {
            console.log("fetching data...");
            const response = await fetch(baseUrl + endpoint, {
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
            // if on success is ussed we don't set data in the hook
            if (onSuccess) {
                onSuccess(data.data);
                return;
            }
        } catch (error) {
            setRequestError("Request failled, please retry after...");
            console.log(error);
        } finally {
            setIsloading(false);
        }
    }

    return { isLoading, requestError, validationError, fetchUpdateApi };
}
