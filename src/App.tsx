import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ShoppingLists from "./pages/shoppingLists/ShoppingLists";
import AddShoppingList from "./pages/addShoppingList/AddShoppingList";
import { useState } from "react";
import { ShoppingList } from "./types/shopping";

function App() {
    const [shoppingLists, setShoppingList] = useState<ShoppingList[]>([]);

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
            path: "/shoppingLists/add",
            element: <AddShoppingList updateShopingList={setShoppingList} />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
