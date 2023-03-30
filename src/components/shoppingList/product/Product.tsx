import { ProductApi } from "../../../types/shopping";
import "./product.scss";
import useFetch from "../../../hooks/useFetch";
import { useRef } from "react";

type Props = {
    product: ProductApi;
    onDeleteProduct: (productId: number, shoppingListId: number) => void;
    onUpdateProduct: (product: ProductApi) => void;
};

export default function Product({ product, onDeleteProduct, onUpdateProduct }: Props) {
    const { fetchApi } = useFetch<ProductApi>("/product/" + product.id, "DELETE");
    const { fetchApi: updateProductFetch } = useFetch<ProductApi>("/product/" + product.id, "PUT");

    const priceRef = useRef<HTMLInputElement>(null);

    function handleDeleteProduct() {
        fetchApi(null, data => {
            onDeleteProduct(data.id, data.shoppingListId);
        });
    }

    function handlePrice() {
        if (!priceRef.current) return;
        console.log(+priceRef.current.value);
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
    return (
        <div className="product">
            <div className="product__name">{product.name}</div>
            <div className="product__details">
                <input
                    ref={priceRef}
                    onBlur={handlePrice}
                    type="number"
                    placeholder="Enter a price"
                    defaultValue={product.price}
                />
                <div className="product__quantity">{product.quantity}</div>
                <button onClick={handleDeleteProduct}>X</button>
            </div>
        </div>
    );
}
