import React from "react";
import Product from "../product/Product";
import { ProductData } from "../../../types/shopping";
import "./displayProduct.scss";

type Props = {
    product: ProductData;
    onClick: () => void;
};

export default function ({ product, onClick }: Props) {
    return (
        <div className="displayProduct">
            <div className="displayProduct__infos">
                {product.name} / {product.quantity}
            </div>
            <button onClick={onClick}>X</button>
        </div>
    );
}
