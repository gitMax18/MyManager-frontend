import MainLayout from "../../layouts/mainLayout/MainLayout";
import { useNavigate } from "react-router-dom";
import { ShoppingListApi } from "../../types/shopping";
import ShoppingListCard from "../../components/shoppingList/shoppingListCard/ShoppingListCard";
import PageLayout from "../../layouts/pageLayout/PageLayout";
import "./shoppingLists.scss";
type Props = {
    shoppingLists: ShoppingListApi[] | null;
};

export default function ShoppingLists({ shoppingLists }: Props) {
    const navigate = useNavigate();
    console.log(shoppingLists);
    return (
        <PageLayout>
            <div className="shoppingLists">
                <div className="shoppingLists__header">
                    <h1 className="shoppingLists__title">Shopping lists</h1>
                    <button
                        className="shoppingLists__btn"
                        onClick={() => navigate("/shoppingLists/add")}
                    >
                        Add list
                    </button>
                </div>
                <div className="shoppingLists__lists">
                    {shoppingLists?.map(list => (
                        <ShoppingListCard key={list.id} shoppingList={list} />
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}
