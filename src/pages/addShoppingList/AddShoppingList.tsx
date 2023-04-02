import ShoppingListForm from "../../components/shoppingList/shoppingListForm/ShoppingListForm";
import { ShoppingListApi } from "../../types/shopping";
import PageLayout from "../../layouts/pageLayout/PageLayout";
import "./addShoppingList.scss";

type Props = {
    onAddShoppingList: (shoppingList: ShoppingListApi) => void;
};

export default function AddShoppingList({ onAddShoppingList }: Props) {
    return (
        <PageLayout>
            <div className="addShoppingList">
                <h1 className="addShoppingList__title">Add new shopping list</h1>
                <ShoppingListForm onAddShoppingList={onAddShoppingList} />
            </div>
        </PageLayout>
    );
}
