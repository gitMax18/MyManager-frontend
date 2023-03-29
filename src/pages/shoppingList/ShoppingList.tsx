import React from "react";
import { ShoppingListApi } from "../../types/shopping";
import { Navigate, useParams } from "react-router-dom";
import Product from "../../components/shoppingList/productApi/Product";
import MainLayout from "../../layouts/mainLayout/MainLayout";

type Props = {
    shoppingLists: ShoppingListApi[];
};

function ShoppingList({ shoppingLists }: Props) {
    const { id } = useParams();
    if (!id) {
        return <Navigate to="/shoppingLists" replace={true} />;
    }

    const shoppingList = shoppingLists.find(list => list.id === +id);

    if (!shoppingList) {
        return (
            <div>
                <p>Aucun élement trouver...</p>
            </div>
        );
    }

    return (
        <MainLayout>
            <h1>{shoppingList.name}</h1>
            <div>
                {shoppingList.products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </MainLayout>
    );
}

export default ShoppingList;
