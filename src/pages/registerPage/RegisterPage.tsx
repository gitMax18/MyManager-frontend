import React, { FormEvent, useRef, useState } from "react";
import FormField from "../../components/form/formField/FormField";
import useUpdateFetch from "../../hooks/useupdateFetch";
import { AuthApi, AuthData, AuthResponse } from "../../types/auth";
import PageLayout from "../../layouts/pageLayout/PageLayout";
import "./registerPage.scss";
import AppButton from "../../components/btn/AppButton";
import { useAuth } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

type Props = {};

export default function RegisterPage({}: Props) {
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const { fetchUpdateApi, validationError } = useUpdateFetch();

    const { user, login } = useAuth();

    if (user) {
        return <Navigate to="/" />;
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!emailRef.current || !passwordRef.current || !confirmPasswordRef.current) return;
        if (confirmPasswordRef.current.value !== passwordRef.current.value) {
            setConfirmPasswordError("password & confirmPassword must be same...");
            return;
        }
        setConfirmPasswordError("");
        const loginData: AuthData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        fetchUpdateApi<AuthData, AuthApi>("/auth/register", "POST", loginData, data => {
            login(data);
        });
    }

    return (
        <PageLayout>
            <div className="registerPage">
                <h1 className="registerPage__title">Register</h1>
                <form className="registerPage__form" onSubmit={event => handleSubmit(event)}>
                    {validationError && <p>{validationError.message}</p>}
                    <FormField type="text" id="email" label="Email" ref={emailRef} />
                    <FormField type="password" id="password" label="Password" ref={passwordRef} />
                    <FormField
                        type="password"
                        id="confirmPassword"
                        label="Confirm password"
                        ref={confirmPasswordRef}
                    />
                    <AppButton type="submit">Register</AppButton>
                </form>
            </div>
        </PageLayout>
    );
}
