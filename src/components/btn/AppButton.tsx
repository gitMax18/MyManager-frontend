import React from "react";
import "./appButton.scss";
type Props = {
    type?: "submit" | "button";
    children: React.ReactNode;
    onClick?: () => void;
};

export default function AppButton({ type = "button", children, onClick }: Props) {
    return (
        <button className="appButton" onClick={onClick} type={type}>
            {children}
        </button>
    );
}
