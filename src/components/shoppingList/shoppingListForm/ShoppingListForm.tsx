import React, { useRef, FormEvent, useEffect } from "react";
import "./shoppingListForm.scss";
import { useState } from "react";
import { ShoppingListData, ProductData, ShoppingListApi } from "../../../types/shopping";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";
import ShoppingListProductForm from "../shoppingListProductForm/ShoppingListProductForm";
import FormField from "../../form/formField/FormField";
import DisplayProduct from "../productData/DisplayProduct";

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
        console.log("ref", nameRef.current?.value);
        const newShoppingList: ShoppingListData = {
            name: nameRef.current!.value,
            products: products,
        };

        await fetchApi(newShoppingList, data => {
            onAddShoppingList(data);
            navigate("/shoppingLists");
        });
    }

    function handleDeleteProduct(index: number) {
        setProducts(products => {
            return products.filter((product, pIndex) => pIndex !== index);
        });
    }

    return (
        <form className="shoppingListForm" onSubmit={handleSubmit}>
            {isLoading && <p>Chargement...</p>}
            {requestError && <p>{requestError}</p>}
            {isFormError && <p>Veuillez ajouter un nom </p>}
            {validationError?.details?.name && <p>{validationError.details.name}</p>}

            <FormField type="text" label="name" id="name" ref={nameRef} />
            <h2 className="shoppingListForm__subtitle">ADD PRODUCT</h2>
            <ShoppingListProductForm onAddProduct={addProduct} validationError={validationError} />
            {products.length === 0 && (
                <p className="shoppingListForm__emptyMsg">No product added to the list...</p>
            )}
            {products.map((product, index) => {
                return (
                    <div key={uuidv4()}>
                        <DisplayProduct
                            product={product}
                            onClick={() => handleDeleteProduct(index)}
                        />
                    </div>
                );
            })}
            <button className="shoppingListForm__btn">Valider</button>
        </form>
    );
}

export default ShoppingListForm;
