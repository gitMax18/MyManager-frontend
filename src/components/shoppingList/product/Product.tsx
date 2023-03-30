import React from "react";
import { ProductApi } from "../../../types/shopping";
import "./product.scss";
import useFetch from "../../../hooks/useFetch";

type Props = {
    product: ProductApi;
    onDeleteProduct: (productId: number, shoppingListId: number) => void;
};

export default function Product({ product, onDeleteProduct }: Props) {
    const { fetchApi } = useFetch<ProductApi>("/product/" + product.id, "DELETE");
    function handleDeleteProduct() {
        fetchApi(null, data => {
            onDeleteProduct(data.id, data.shoppingListId);
        });
    }
    return (
        <div className="product">
            <div className="product__name">{product.name}</div>
            <div>
                <div className="product__quantity">{product.quantity}</div>
                <button onClick={handleDeleteProduct}>X</button>
            </div>
        </div>
    );
}
