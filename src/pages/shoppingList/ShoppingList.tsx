import React from "react";
import { ShoppingListApi, ProductData, ProductApi } from "../../types/shopping";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Product from "../../components/shoppingList/product/Product";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import ShoppingListProductForm from "../../components/shoppingList/shoppingListProductForm/ShoppingListProductForm";
import useFetch from "../../hooks/useFetch";
import { useMemo } from "react";

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

    const total = useMemo(() => {
        let total = 0;
        if (!shoppingList) return total;
        if (!shoppingList.products) return total;
        shoppingList.products.forEach(product => {
            if (product.price) {
                total += product.price;
            }
        });
        return total;
    }, [shoppingList?.products]);

    if (!shoppingList) {
        return (
            <div>
                <p>Aucun élement trouver...</p>
            </div>
        );
    }

    // const total: number = useMemo(() => {
    //     return shoppingList.products.reduce(
    //         (acc, curr) => (acc += curr.price === undefined ? 0 : curr.price),
    //         0
    //     );
    // }, [shoppingList.products]);

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
            <div>Total : {total}</div>
        </MainLayout>
    );
}

export default ShoppingList;
