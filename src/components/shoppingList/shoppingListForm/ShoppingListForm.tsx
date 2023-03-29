import React, { useRef, FormEvent } from "react";
import "./shoppingListForm.scss";
import { useState } from "react";
import {
    ShoppingListData,
    ProductData,
    ShoppingListApi,
    ShoppingListResponse,
} from "../../../types/shopping";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
type Props = {
    updateShopingList: React.Dispatch<React.SetStateAction<ShoppingListApi[]>>;
};

function ShoppingListForm({ updateShopingList }: Props) {
    const [products, setProducts] = useState<ProductData[]>([]);

    const [isProductError, setIsProductError] = useState<boolean>(false);
    const [isFormError, setIsFormError] = useState<boolean>(false);

    const productRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const { isLoading, error, data, fetchApi } = useFetch<ShoppingListResponse>(
        "/shoppingList",
        "POST"
    );

    const navigate = useNavigate();

    function handleAddProduct() {
        if (productRef.current?.value === "" || quantityRef.current?.value === "") {
            setIsProductError(true);
            return;
        }
        setIsProductError(false);
        const newProduct: ProductData = {
            product: productRef.current!.value as string,
            quantity: +quantityRef.current!.value as number,
        };
        setProducts(prev => {
            return [...prev, newProduct];
        });
        resetProductRow();
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (nameRef.current?.value === "") {
            setIsFormError(true);
            return;
        }
        setIsFormError(false);
        const newShoppingList: ShoppingListData = {
            name: nameRef.current!.value,
            products,
        };

        await fetchApi(newShoppingList, data => {
            updateShopingList(prev => {
                return [...prev, { ...data.data.newShoppingList }];
            });
            navigate("/shoppingLists");
        });
    }

    function resetProductRow() {
        if (productRef.current && quantityRef.current) {
            productRef.current.value = "";
            quantityRef.current.value = "1";
        }
    }

    return (
        <form className="shoppingListForm" onSubmit={handleSubmit}>
            {isFormError && <p>Veuillez ajouter un nom </p>}
            <div className="shoppingListForm__fields">
                <label className="shoppingListForm__label" htmlFor="name">
                    Name
                </label>
                <input
                    ref={nameRef}
                    className="shoppingListForm__input"
                    type="text"
                    id="name"
                    name="name"
                />
            </div>
            <h2>add new +</h2>
            {isProductError && <p>Veuillez entrer des valeurs</p>}
            <div className="shoppingListForm__addProduct">
                <div className="shoppingListForm__fields">
                    <label className="shoppingListForm__label" htmlFor="product">
                        Product
                    </label>
                    <input
                        className="shoppingListForm__input"
                        type="text"
                        id="product"
                        name="name"
                        ref={productRef}
                    />
                </div>
                <div className="shoppingListForm__fields">
                    <label className="shoppingListForm__label" htmlFor="product">
                        Quantity
                    </label>
                    <input
                        className="shoppingListForm__input"
                        type="number"
                        id="quantity"
                        name="quantity"
                        ref={quantityRef}
                        defaultValue={1}
                    />
                </div>
            </div>
            <button onClick={handleAddProduct} type="button">
                add
            </button>
            {products.map(product => {
                return (
                    <div key={product.product}>
                        {product.product} / {product.quantity}
                    </div>
                );
            })}
            <button>Valider</button>
        </form>
    );
}

export default ShoppingListForm;
