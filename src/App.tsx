import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ShoppingLists from "./pages/shoppingLists/ShoppingLists";
import AddShoppingList from "./pages/addShoppingList/AddShoppingList";
import { ShoppingListApi } from "./types/shopping";
import ShoppingList from "./pages/shoppingList/ShoppingList";
import useFetch from "./hooks/useFetch";

function App() {
    const { data: shoppingLists, setData: setShoppingLists } = useFetch<ShoppingListApi[]>(
        "/shoppingList",
        []
    );

    function addShoppingList(shoppingList: ShoppingListApi) {
        setShoppingLists(prev => {
            return [...prev, shoppingList];
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
            element: <ShoppingList shoppingLists={shoppingLists} />,
        },
        {
            path: "/shoppingLists/add",
            element: <AddShoppingList onAddShoppingList={addShoppingList} />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
