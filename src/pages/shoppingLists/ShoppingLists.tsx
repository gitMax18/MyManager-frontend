import MainLayout from "../../layouts/mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { ShoppingListApi } from "../../types/shopping";
import ShoppingListCard from "../../components/shoppingList/shoppingListCard/ShoppingListCard";

type Props = {
    shoppingLists: ShoppingListApi[];
};

export default function ShoppingLists({ shoppingLists }: Props) {
    const navigate = useNavigate();
    console.log(shoppingLists);
    return (
        <MainLayout>
            <h1>Shopping lists</h1>
            <button onClick={() => navigate("/shoppingLists/add")}>Add list</button>
            {shoppingLists.map(list => (
                <ShoppingListCard key={list.id} shoppingList={list} />
            ))}
        </MainLayout>
    );
}
