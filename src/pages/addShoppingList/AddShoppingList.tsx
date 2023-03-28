import React from "react";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import ShoppingListForm from "../../components/shoppingList/shoppingListForm/ShoppingListForm";
import { ShoppingList } from "../../types/shopping";

type Props = {
    updateShopingList: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
};

export default function AddShoppingList({ updateShopingList }: Props) {
    return (
        <MainLayout>
            <h1>Add new shopping list</h1>
            <ShoppingListForm updateShopingList={updateShopingList} />
        </MainLayout>
    );
}
