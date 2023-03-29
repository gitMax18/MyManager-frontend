import React from "react";
import { ShoppingListApi } from "../../../types/shopping";
import "./shoppingListCard.scss";
import formatDate from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
type Props = {
    shoppingList: ShoppingListApi;
};

function ShoppingListCard({ shoppingList }: Props) {
    const navigate = useNavigate();
    return (
        <div
            className="shoppingListCard"
            onClick={() => navigate("/shoppingLists/" + shoppingList.id)}
        >
            <h3 className="shoppingListCard__name">{shoppingList.name}</h3>
            {/* <p className="shoppingListCard__count">
                Nombre de produits : <strong>{shoppingList.shoppingRows.length}</strong>
            </p> */}
            <p>
                Créer le <strong>{formatDate(shoppingList.createdAt)}</strong>
            </p>
        </div>
    );
}

export default ShoppingListCard;
