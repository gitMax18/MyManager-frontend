import React from "react";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import ShoppingListForm from "../../components/shoppingList/shoppingListForm/ShoppingListForm";
import { ShoppingListData, ShoppingListApi } from "../../types/shopping";

type Props = {
    onAddShoppingList: (shoppingList: ShoppingListApi) => void;
};

export default function AddShoppingList({ onAddShoppingList }: Props) {
    return (
        <MainLayout>
            <h1>Add new shopping list</h1>
            <ShoppingListForm onAddShoppingList={onAddShoppingList} />
        </MainLayout>
    );
}
