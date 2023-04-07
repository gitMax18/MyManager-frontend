import React, { FormEvent, useRef } from "react";
import FormField from "../../components/form/formField/FormField";
import useUpdateFetch from "../../hooks/useUpdateFetch";
import { AuthApi, AuthData, AuthResponse } from "../../types/auth";
import PageLayout from "../../layouts/pageLayout/PageLayout";
import "./loginPage.scss";
import AppButton from "../../components/btn/AppButton";
import { useAuth } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

type Props = {};

export default function LoginPage({}: Props) {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { fetchUpdateApi, validationError } = useUpdateFetch();

    const { user, login } = useAuth();
    if (user) {
        return <Navigate to="/" />;
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!emailRef.current || !passwordRef.current) return;
        const loginData: AuthData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        fetchUpdateApi<AuthData, AuthApi>("/auth/login", "POST", loginData, data => {
            login(data);
        });
    }

    return (
        <PageLayout>
            <div className="loginPage">
                <h1 className="loginPage__title">Login</h1>
                <form className="loginPage__form" onSubmit={event => handleSubmit(event)}>
                    {validationError && <p>{validationError.message}</p>}
                    <FormField type="text" id="email" label="Email" ref={emailRef} />
                    <FormField type="password" id="password" label="Password" ref={passwordRef} />
                    <AppButton type="submit">Login</AppButton>
                </form>
            </div>
        </PageLayout>
    );
}
