import React, { useRef, useState } from "react";
import { ProductData } from "../../../types/shopping";

type Props = {
    onAddProduct: (product: ProductData) => void;
    validationError: any;
};

function ShoppingListProductForm({ onAddProduct, validationError }: Props) {
    const [isProductError, setIsProductError] = useState<boolean>(false);

    const productRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);

    function handeAddProduct() {
        if (productRef.current?.value === "" || quantityRef.current?.value === "") {
            setIsProductError(true);
            return;
        }
        setIsProductError(false);
        const newProduct: ProductData = {
            name: productRef.current!.value as string,
            quantity: +quantityRef.current!.value as number,
        };

        onAddProduct(newProduct);
        resetProductRow();
    }

    function resetProductRow() {
        if (productRef.current && quantityRef.current) {
            productRef.current.value = "";
            quantityRef.current.value = "1";
        }
    }

    return (
        <div>
            {isProductError && <p>Veuillez entrer des valeurs</p>}
            {validationError?.details?.products && <p>{validationError.details.products}</p>}
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

            <button onClick={handeAddProduct} type="button">
                add
            </button>
        </div>
    );
}

export default ShoppingListProductForm;
