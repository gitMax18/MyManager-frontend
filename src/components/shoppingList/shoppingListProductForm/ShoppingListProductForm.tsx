import React, { useRef, useState } from "react";
import { Category, ProductData } from "../../../types/shopping";
import FormField from "../../form/formField/FormField";
import "./shoppingListProductForm.scss";
import FormSelectField from "../../form/formSelectField/formSelectField";
type Props = {
    onAddProduct: (product: ProductData) => void;
    validationError: any;
};

function formatCategoryEnum(): { value: Category; name: string }[] {
    const enumCategory: { value: Category; name: string }[] = [];
    Object.entries(Category).forEach(c => {
        const formatedCategory = { value: c[1], name: c[0] };
        enumCategory.push(formatedCategory);
    });
    return enumCategory;
}

function ShoppingListProductForm({ onAddProduct, validationError }: Props) {
    const [isProductError, setIsProductError] = useState<boolean>(false);

    const productRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);

    function handeAddProduct() {
        if (productRef.current?.value === "" || quantityRef.current?.value === "") {
            setIsProductError(true);
            return;
        }
        setIsProductError(false);
        const newProduct: ProductData = {
            name: productRef.current!.value,
            quantity: +quantityRef.current!.value,
            category: categoryRef.current!.value,
        };

        onAddProduct(newProduct);
        resetProductRow();
    }

    function resetProductRow() {
        if (productRef.current && quantityRef.current) {
            productRef.current.value = "";
            quantityRef.current.value = "1";
            categoryRef.current!.value = Category.Unknow;
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
                <FormSelectField
                    name="category"
                    id="category"
                    label="Category"
                    options={formatCategoryEnum()}
                    ref={categoryRef}
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
