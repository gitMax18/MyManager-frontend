import React from "react";
import "./featureCard.scss";
import { useNavigate } from "react-router-dom";
type Props = {
    name: string;
};

export default function FeatureCard({ name }: Props) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("/shoppingLists")} className="featureCard">
            <h3>{name}</h3>
        </div>
    );
}
