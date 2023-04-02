import { useRef, useState } from "react";
import { ShoppingListApi, ProductData, ProductApi } from "../../types/shopping";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Product from "../../components/shoppingList/product/Product";
import ShoppingListProductForm from "../../components/shoppingList/shoppingListProductForm/ShoppingListProductForm";
import useFetch from "../../hooks/useFetch";
import { useMemo } from "react";
import PageLayout from "../../layouts/pageLayout/PageLayout";
import "./shoppingList.scss";

type Props = {
    shoppingLists: ShoppingListApi[] | null;
    onAddProduct: (product: ProductApi) => void;
    onDeleteProduct: (productId: number, shoppingListId: number) => void;
    onDeleteShoppingList: (shoppingListId: number) => void;
    onUpdateProduct: (product: ProductApi) => void;
    onUpdateShoppingList: (shoppingList: ShoppingListApi) => void;
};

function ShoppingList({
    shoppingLists,
    onAddProduct,
    onDeleteProduct,
    onDeleteShoppingList,
    onUpdateProduct,
    onUpdateShoppingList,
}: Props) {
    const [isUpdateName, setIsUpdateName] = useState(false);
    const [isShowAdd, setIsShowAdd] = useState(false);

    const updateNameRef = useRef<HTMLInputElement>(null);

    const { id } = useParams();
    if (!id) {
        return <Navigate to="/shoppingLists" replace={true} />;
    }
    const navigate = useNavigate();
    // used for create new product
    const { fetchApi, validationError } = useFetch<ProductApi>("/product/" + id, "POST");
    // used to delete shopping list
    const { fetchApi: fetchDeleteList, validationError: deleteListValidationError } =
        useFetch<ShoppingListApi>("/shoppingList/" + id, "DELETE");
    // used for update shoppingList
    const { fetchApi: fetchUpdateShoppingList } = useFetch<ShoppingListApi>(
        "/shoppingList/" + id,
        "PUT"
    );
    const shoppingList = shoppingLists?.find(list => list.id === +id);

    // get the total of all products price
    const total: number = useMemo(() => {
        if (!shoppingList) return 0;
        return shoppingList.products.reduce(
            (acc, curr) => (acc += curr.price === undefined ? 0 : curr.price),
            0
        );
    }, [shoppingList?.products]);

    if (!shoppingList) {
        return (
            <div>
                <p>Aucun élement trouver...</p>
            </div>
        );
    }

    function addProduct(product: ProductData) {
        fetchApi(product, product => {
            onAddProduct(product);
        });
    }

    function handleDeleteShoppingList() {
        fetchDeleteList(null, data => {
            onDeleteShoppingList(data.id);
            navigate("/shoppingLists");
        });
    }

    function handleToggleAdd() {
        setIsShowAdd(prev => !prev);
    }

    function handleDoubleClickName() {
        setIsUpdateName(true);
        setTimeout(() => {
            updateNameRef.current?.focus();
        }, 0);
    }

    function handleBlurUpdateName() {
        if (!updateNameRef.current || updateNameRef.current.value === "") return;
        fetchUpdateShoppingList(
            {
                name: updateNameRef.current.value,
            },
            data => {
                onUpdateShoppingList(data);
            }
        );
        setIsUpdateName(false);
    }

    return (
        <PageLayout>
            <div className="shoppingList">
                <div className="shoppingList__header">
                    <h1 className="shoppingList__title" onDoubleClick={handleDoubleClickName}>
                        {isUpdateName ? (
                            <input
                                ref={updateNameRef}
                                onBlur={handleBlurUpdateName}
                                type="text"
                                defaultValue={shoppingList.name}
                            />
                        ) : (
                            shoppingList.name
                        )}
                    </h1>
                    <div className="shoppingList__btns">
                        <button
                            className="shoppingList__btn shoppingList__btn--add"
                            onClick={handleToggleAdd}
                        >
                            {isShowAdd ? "Hide add product" : "Add product"}
                        </button>
                        <button
                            className="shoppingList__btn shoppingList__btn--delete"
                            onClick={handleDeleteShoppingList}
                        >
                            delete shopping list
                        </button>
                    </div>
                </div>
                {isShowAdd && (
                    <ShoppingListProductForm
                        onAddProduct={addProduct}
                        validationError={validationError}
                    />
                )}

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
                <div className="shoppingList__total">Total : {total}</div>
            </div>
        </PageLayout>
    );
}

export default ShoppingList;
