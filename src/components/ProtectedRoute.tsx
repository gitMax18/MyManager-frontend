import React from "react";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactElement;
};

export default function ProtectedRoute({ children }: Props) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={"/auth/login"} replace />;
    }
    return children;
}
