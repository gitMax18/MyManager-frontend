export type ShoppingListData = {
    name: string;
    products: ProductData[];
};

export type ProductData = {
    product: string;
    quantity: number;
};

export type ShoppingListResponse = {
    data: {
        newShoppingList: ShoppingListApi;
    };
    message: string;
};

export type ShoppingListApi = {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
    products?: ProductApi[];
};

export type ProductApi = {
    createdAt: string;
    id: number;
    quantity: number;
    shoppingListId: number;
    updatedAt: string;
    product: string;
};
