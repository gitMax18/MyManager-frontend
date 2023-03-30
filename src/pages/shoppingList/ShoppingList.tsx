import React from "react";
import { ShoppingListApi, ProductData, ProductApi } from "../../types/shopping";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Product from "../../components/shoppingList/product/Product";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import ShoppingListProductForm from "../../components/shoppingList/shoppingListProductForm/ShoppingListProductForm";
import useFetch from "../../hooks/useFetch";

type Props = {
    shoppingLists: ShoppingListApi[] | null;
    onAddProduct: (product: ProductApi) => void;
    onDeleteProduct: (productId: number, shoppingListId: number) => void;
    onDeleteShoppingList: (shoppingListId: number) => void;
    onUpdateProduct: (product: ProductApi) => void;
};

function ShoppingList({
    shoppingLists,
    onAddProduct,
    onDeleteProduct,
    onDeleteShoppingList,
    onUpdateProduct,
}: Props) {
    const { id } = useParams();
    if (!id) {
        return <Navigate to="/shoppingLists" replace={true} />;
    }
    const navigate = useNavigate();
    const { fetchApi, validationError } = useFetch<ProductApi>("/product/" + id, "POST");

    const { fetchApi: deleteListFetch, validationError: deleteListValidationError } =
        useFetch<ShoppingListApi>("/shoppingList/" + id, "DELETE");

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

    function handleDeleteShoppingList() {
        deleteListFetch(null, data => {
            onDeleteShoppingList(data.id);
            navigate("/shoppingLists");
        });
    }

    return (
        <MainLayout>
            <h1>{shoppingList.name}</h1>
            <button onClick={handleDeleteShoppingList}>delete shopping list</button>
            <ShoppingListProductForm onAddProduct={addProduct} validationError={validationError} />
            <div>
                {shoppingList.products.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                        onDeleteProduct={onDeleteProduct}
                        onUpdateProduct={onUpdateProduct}
                    />
                ))}
            </div>
        </MainLayout>
    );
}

export default ShoppingList;
