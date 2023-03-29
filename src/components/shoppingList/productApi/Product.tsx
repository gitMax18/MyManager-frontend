import React from "react";
import { ProductApi } from "../../../types/shopping";
import "./product.scss";

type Props = {
    product: ProductApi;
};

export default function Product({ product }: Props) {
    return (
        <div className="product">
            <div className="product__name">{product.name}</div>
            <div className="product__quantity">{product.quantity}</div>
        </div>
    );
}
