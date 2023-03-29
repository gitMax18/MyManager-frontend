import React from "react";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { ShoppingListApi } from "../../types/shopping";

type Props = {
    shoppingLists: ShoppingListApi[];
};

export default function ShoppingLists({ shoppingLists }: Props) {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <h1>Shopping lists</h1>
            <button onClick={() => navigate("/shoppingLists/add")}>Add list</button>
            {shoppingLists.map(list => {
                return (
                    <div key={list.id}>
                        <div>{list.name}</div>
                        {list.products?.map(product => {
                            return (
                                <div key={"product" + product.id}>
                                    {product.product} / {product.quantity}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </MainLayout>
    );
}
