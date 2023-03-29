import React, { useRef, FormEvent, useEffect } from "react";
import "./shoppingListForm.scss";
import { useState } from "react";
import { ShoppingListData, ProductData, ShoppingListApi } from "../../../types/shopping";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";
import ShoppingListProductForm from "../shoppingListProductForm/ShoppingListProductForm";
type Props = {
    onAddShoppingList: (shoppingList: ShoppingListApi) => void;
};

function ShoppingListForm({ onAddShoppingList }: Props) {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [isFormError, setIsFormError] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { isLoading, validationError, requestError, data, fetchApi } = useFetch<ShoppingListApi>(
        "/shoppingList",
        null,
        "POST"
    );

    function addProduct(newProduct: ProductData) {
        setProducts(prev => {
            return [...prev, newProduct];
        });
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
            products: products,
        };

        await fetchApi(newShoppingList, data => {
            onAddShoppingList(data);
            navigate("/shoppingLists");
        });
    }

    return (
        <form className="shoppingListForm" onSubmit={handleSubmit}>
            {isLoading && <p>Chargement...</p>}
            {requestError && <p>{requestError}</p>}
            {isFormError && <p>Veuillez ajouter un nom </p>}
            {validationError?.details?.name && <p>{validationError.details.name}</p>}
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
            <ShoppingListProductForm onAddProduct={addProduct} validationError={validationError} />
            {products.map(product => {
                return (
                    <div key={uuidv4()}>
                        {product.name} / {product.quantity}
                    </div>
                );
            })}
            <button>Valider</button>
        </form>
    );
}

export default ShoppingListForm;
