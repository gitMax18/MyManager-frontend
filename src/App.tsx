import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ShoppingLists from "./pages/shoppingLists/ShoppingLists";
import AddShoppingList from "./pages/addShoppingList/AddShoppingList";
import { ShoppingListApi, ProductApi, Category } from "./types/shopping";
import ShoppingList from "./pages/shoppingList/ShoppingList";
import useFetch from "./hooks/useFetch";
import { DragDropContext, DraggableLocation, DragUpdate } from "react-beautiful-dnd";
import useUpdateFetch from "./hooks/useUpdateFetch";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import AuthContextProvider from "./contexts/authContext";

function App() {
    const { data: shoppingLists, setData: setShoppingLists } =
        useFetch<ShoppingListApi[]>("/shoppingList");

    const { fetchUpdateApi } = useUpdateFetch();

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

    function updateShoppingList(shoppingList: ShoppingListApi) {
        setShoppingLists(prev => {
            if (prev === null) return [shoppingList];
            const newShoppingLists = prev.filter(list => list.id !== shoppingList.id);
            return [...newShoppingLists, shoppingList];
        });
    }

    function addProductToShoppingList(product: ProductApi) {
        setShoppingLists(prev => {
            if (!prev) return null;
            const shoppingList = prev.find(list => list.id === product.shoppingListId);
            if (!shoppingList) return prev;
            const newShoppingLists = prev.filter(sl => sl.id !== shoppingList.id);
            shoppingList.products.push(product);
            shoppingList.products = [...shoppingList?.products];
            return [...newShoppingLists, { ...shoppingList }];
        });
    }

    function deleteProductToShoppingList(productId: number, shoppingListId: number) {
        setShoppingLists(prev => {
            if (!prev) return null;
            const shoppingList = prev.find(list => list.id === shoppingListId);
            if (!shoppingList) return prev;
            const newShoppingLists = prev.filter(sl => sl.id !== shoppingList.id);
            shoppingList.products = shoppingList.products.filter(product => {
                return product.id !== productId;
            });
            return [...newShoppingLists, { ...shoppingList }];
        });
    }

    function updateProductToShoppingList(product: ProductApi) {
        setShoppingLists(prev => {
            if (!prev) return null;
            const shoppingList = prev.find(list => list.id === product.shoppingListId);
            if (!shoppingList) return prev;
            const newShoppingLists = prev.filter(sl => sl.id !== shoppingList.id);
            const index = shoppingList.products.findIndex(p => p.id === product.id);
            if (index === -1) return prev;
            shoppingList.products.splice(index, 1, product);
            shoppingList.products = [...shoppingList.products];
            return [...newShoppingLists, { ...shoppingList }];
        });
    }

    function updateDataFromDragAndDrop(
        destination: DraggableLocation,
        source: DraggableLocation,
        draggableId: string,
        listId: number
    ) {
        if (!shoppingLists) return;
        const shoppingListToUpdate = shoppingLists?.find(list => list.id === listId);
        if (!shoppingListToUpdate) return;
        const shoppingListIndex = shoppingLists?.indexOf(shoppingListToUpdate);
        const productToUpdate = shoppingListToUpdate?.products.find(
            product => product.id === +draggableId
        );
        // get the index of product
        const productToReplace = shoppingListToUpdate?.products.filter(
            product => product.category === destination.droppableId
        )[destination.index];
        const indexToReplace = shoppingListToUpdate.products.indexOf(productToReplace);
        if (!productToUpdate || shoppingListIndex === -1) return;

        productToUpdate.category = destination.droppableId;
        const productIndex = shoppingListToUpdate?.products.indexOf(productToUpdate);
        shoppingListToUpdate.products.splice(productIndex, 1);
        shoppingListToUpdate.products.splice(indexToReplace, 0, {
            ...productToUpdate,
        });
        if (productIndex === -1) return;
        shoppingLists.splice(shoppingListIndex, 1, { ...shoppingListToUpdate });
        fetchUpdateApi<ShoppingListApi, ShoppingListApi>(
            "/product/" + productToUpdate.id,
            "PUT",
            productToUpdate,
            data => {
                console.log("data", data);
            }
        );
        setShoppingLists(prev => {
            return [...shoppingLists];
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
                    onUpdateShoppingList={updateShoppingList}
                    shoppingLists={shoppingLists}
                />
            ),
        },
        {
            path: "/shoppingLists/add",
            element: <AddShoppingList onAddShoppingList={addShoppingList} />,
        },
        {
            path: "/auth/login",
            element: <LoginPage />,
        },
        {
            path: "/auth/register",
            element: <RegisterPage />,
        },
    ]);

    function handleDragEnd({ destination, draggableId, source, type }: DragUpdate) {
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return;
        updateDataFromDragAndDrop(destination, source, draggableId, +type);
    }

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <RouterProvider router={router} />
            </DragDropContext>
        </>
    );
}

export default App;
