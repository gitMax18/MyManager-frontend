import React, { useRef, useState } from "react";
import { ProductData } from "../../../types/shopping";
import FormField from "../../form/FormField";
import "./shoppingListProductForm.scss";
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
        <div className="shoppingListProductForm">
            {isProductError && <p>Veuillez entrer des valeurs</p>}
            {validationError?.details?.products && <p>{validationError.details.products}</p>}
            <div className="shoppingListProductForm__fields">
                <FormField id="name" ref={productRef} label="Product" type="text" />
                <FormField
                    id="quantity"
                    ref={quantityRef}
                    label="Quantity"
                    type="number"
                    defaultValue={1}
                />
            </div>

            <button
                className="shoppingListProductForm__btn"
                onClick={handeAddProduct}
                type="button"
            >
                add
            </button>
        </div>
    );
}

export default ShoppingListProductForm;
