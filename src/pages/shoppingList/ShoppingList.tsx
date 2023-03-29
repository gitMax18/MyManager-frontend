import React from "react";
import { ShoppingListApi, ProductData, ProductApi } from "../../types/shopping";
import { Navigate, useParams } from "react-router-dom";
import Product from "../../components/shoppingList/product/Product";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import ShoppingListProductForm from "../../components/shoppingList/shoppingListProductForm/ShoppingListProductForm";
import useFetch from "../../hooks/useFetch";

type Props = {
    shoppingLists: ShoppingListApi[] | null;
    onAddProduct: (product: ProductApi) => void;
};

function ShoppingList({ shoppingLists, onAddProduct }: Props) {
    const { id } = useParams();
    if (!id) {
        return <Navigate to="/shoppingLists" replace={true} />;
    }
    const { fetchApi } = useFetch<ProductApi>("/product/" + id, "POST");

    const shoppingList = shoppingLists?.find(list => list.id === +id);

    if (!shoppingList) {
        return (
            <div>
                <p>Aucun élement trouver...</p>
            </div>
        );
    }

    function addProduct(product: ProductData) {
        fetchApi(product, product => {
            onAddProduct(product);
        });
    }

    return (
        <MainLayout>
            <h1>{shoppingList.name}</h1>
            <ShoppingListProductForm onAddProduct={addProduct} validationError={null} />
            <div>
                {shoppingList.products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </MainLayout>
    );
}

export default ShoppingList;
