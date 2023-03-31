import { ProductApi } from "../../../types/shopping";
import "./product.scss";
import useFetch from "../../../hooks/useFetch";
import { useRef, useState } from "react";

type Props = {
    product: ProductApi;
    onDeleteProduct: (productId: number, shoppingListId: number) => void;
    onUpdateProduct: (product: ProductApi) => void;
};

export default function Product({ product, onDeleteProduct, onUpdateProduct }: Props) {
    const [isUpdateProduct, setIsUpdateProduct] = useState(false);
    const { fetchApi } = useFetch<ProductApi>("/product/" + product.id, "DELETE");
    const { fetchApi: updateProductFetch } = useFetch<ProductApi>("/product/" + product.id, "PUT");
    const priceRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);

    function handleDeleteProduct() {
        fetchApi(null, data => {
            onDeleteProduct(data.id, data.shoppingListId);
        });
    }

    function handlePrice() {
        if (!priceRef.current) return;
        if (+priceRef.current.value !== product.price) {
            updateProductFetch(
                {
                    ...product,
                    price: +priceRef.current.value,
                },
                data => {
                    onUpdateProduct(data);
                }
            );
        }
    }

    function handleDoubleClick() {
        setIsUpdateProduct(true);
    }

    function handleUpdateProduct() {
        if (!priceRef.current || !nameRef.current || !quantityRef.current) return;
        updateProductFetch(
            {
                name: nameRef.current.value || product.name,
                price: +priceRef.current.value || product.price,
                quantity: +quantityRef.current.value,
            },
            data => {
                onUpdateProduct(data);
                setIsUpdateProduct(false);
            }
        );
    }

    return (
        <div className="product" onDoubleClick={handleDoubleClick}>
            <div className="product__name">
                {isUpdateProduct ? (
                    <input type="text" ref={nameRef} defaultValue={product.name} />
                ) : (
                    product.name
                )}
            </div>
            <div className="product__details">
                <input
                    ref={priceRef}
                    onBlur={handlePrice}
                    type="number"
                    placeholder="Enter a price"
                    defaultValue={product.price === 0 || !product.price ? "" : product.price}
                />

                <div className="product__quantity">
                    {isUpdateProduct ? (
                        <input type="number" ref={quantityRef} defaultValue={product.quantity} />
                    ) : (
                        product.quantity
                    )}
                </div>
                {isUpdateProduct ? (
                    <button onClick={handleUpdateProduct}>V</button>
                ) : (
                    <button onClick={handleDeleteProduct}>X</button>
                )}
            </div>
        </div>
    );
}
