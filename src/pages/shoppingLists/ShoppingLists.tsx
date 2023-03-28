import React from "react";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { ShoppingList } from "../../types/shopping";

type Props = {
    shoppingLists: ShoppingList[];
};

export default function ShoppingLists({ shoppingLists }: Props) {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <h1>Shopping lists</h1>
            <button onClick={() => navigate("/shoppingLists/add")}>Add list</button>
            {shoppingLists.map(list => {
                return (
                    <>
                        <div key={Date.now()}>{list.name}</div>
                        {list.products.map(product => {
                            return (
                                <div>
                                    {product.product} / {product.quantity}
                                </div>
                            );
                        })}
                    </>
                );
            })}
        </MainLayout>
    );
}
