import React from "react";
import { Category, ProductApi } from "../../../types/shopping";
import Product from "../product/Product";
import "./sortProductsByCategory.scss";

type Props = {
    products: ProductApi[];
    onUpdateProduct: (product: ProductApi) => void;
    onDeleteProduct: (productId: number, shoppingListId: number) => void;
};

export default function SortProductsByCategory({
    products,
    onDeleteProduct,
    onUpdateProduct,
}: Props) {
    return (
        <div className="sortProductsByCategory">
            {Object.entries(Category).map((category, index) => {
                return (
                    <div key={index}>
                        <h4 className="sortProductsByCategory__category">{category[0]}</h4>
                        <hr />
                        {products
                            .filter(product => product.category === category[1])
                            .map((product, index) => {
                                return (
                                    <Product
                                        key={index}
                                        product={product}
                                        onDeleteProduct={onDeleteProduct}
                                        onUpdateProduct={onUpdateProduct}
                                    />
                                );
                            })}
                    </div>
                );
            })}
        </div>
    );
}
