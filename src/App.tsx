import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ShoppingLists from "./pages/shoppingLists/ShoppingLists";
import AddShoppingList from "./pages/addShoppingList/AddShoppingList";
import { ShoppingListApi, ProductApi } from "./types/shopping";
import ShoppingList from "./pages/shoppingList/ShoppingList";
import useFetch from "./hooks/useFetch";

function App() {
    const { data: shoppingLists, setData: setShoppingLists } =
        useFetch<ShoppingListApi[]>("/shoppingList");

    function addShoppingList(shoppingList: ShoppingListApi) {
        setShoppingLists(prev => {
            if (prev !== null) {
                return [...prev, shoppingList];
            }
            return [shoppingList];
        });
    }

    function deleteShoppingList(shoppingListId: number) {
        setShoppingLists(prev => {
            if (!prev) return null;
            const newShoppingList = prev.filter(list => {
                return list.id !== shoppingListId;
            });
            return newShoppingList;
        });
    }

    function addProductToShoppingList(product: ProductApi) {
        setShoppingLists(prev => {
            if (!prev) return null;
            const shoppingList = prev.find(list => list.id === product.shoppingListId);
            if (!shoppingList) return prev;
            shoppingList.products.push(product);
            shoppingList.products = [...shoppingList?.products];
            return [...prev, { ...shoppingList }];
        });
    }

    function deleteProductToShoppingList(productId: number, shoppingListId: number) {
        setShoppingLists(prev => {
            if (!prev) return null;
            const shoppingList = prev.find(list => list.id === shoppingListId);
            if (!shoppingList) return prev;
            shoppingList.products = shoppingList.products.filter(product => {
                return product.id !== productId;
            });
            return [...prev, { ...shoppingList }];
        });
    }

    function updateProductToShoppingList(product: ProductApi) {
        setShoppingLists(prev => {
            if (!prev) return null;
            const shoppingList = prev.find(list => list.id === product.shoppingListId);
            if (!shoppingList) return prev;
            const index = shoppingList.products.findIndex(p => p.id === product.id);
            if (index === -1) return prev;
            shoppingList.products.splice(index, 1, product);
            shoppingList.products = [...shoppingList.products];
            return [...prev, { ...shoppingList }];
        });
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: "/shoppingLists",
            element: <ShoppingLists shoppingLists={shoppingLists} />,
        },
        {
            path: "/shoppingLists/:id",
            element: (
                <ShoppingList
                    onDeleteShoppingList={deleteShoppingList}
                    onAddProduct={addProductToShoppingList}
                    onDeleteProduct={deleteProductToShoppingList}
                    onUpdateProduct={updateProductToShoppingList}
                    shoppingLists={shoppingLists}
                />
            ),
        },
        {
            path: "/shoppingLists/add",
            element: <AddShoppingList onAddShoppingList={addShoppingList} />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
