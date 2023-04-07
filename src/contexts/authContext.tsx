import React, { createContext, useContext, useEffect, useState } from "react";
import useRef from "react";
import { AuthApi } from "../types/auth";

type Props = {
    children: React.ReactNode;
};

type ContextType = {
    user: AuthApi | null;
    login: (user: AuthApi) => void;
    logout: () => void;
};

const authContext = createContext<ContextType>({ user: null, login: () => {}, logout: () => {} });

export default function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<AuthApi | null>(null);

    useEffect(() => {
        const stringifiedData = localStorage.getItem("user");
        if (!stringifiedData) return;
        const authData: AuthApi = JSON.parse(stringifiedData);
        setUser(authData);
    }, []);

    function login(user: AuthApi) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    function logout() {
        localStorage.setItem("user", "");
        setUser(null);
    }

    return <authContext.Provider value={{ user, login, logout }}>{children}</authContext.Provider>;
}

export function useAuth() {
    return useContext(authContext);
}
