import ShoppingListForm from "../../components/shoppingList/shoppingListForm/ShoppingListForm";
import { ShoppingListApi } from "../../types/shopping";
import PageLayout from "../../layouts/pageLayout/PageLayout";

type Props = {
    onAddShoppingList: (shoppingList: ShoppingListApi) => void;
};

export default function AddShoppingList({ onAddShoppingList }: Props) {
    return (
        <PageLayout>
            <h1>Add new shopping list</h1>
            <ShoppingListForm onAddShoppingList={onAddShoppingList} />
        </PageLayout>
    );
}
