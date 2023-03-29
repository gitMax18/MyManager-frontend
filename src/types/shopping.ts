export type ShoppingListData = {
    name: string;
    products: ProductData[];
};

export type ProductData = {
    name: string;
    quantity: number;
};
export type ShoppingListPostResponse = {
    data: ShoppingListApi;
    message: string;
};

export type ShoppingListGetAllResponse = {
    data: ShoppingListApi[];
    message: string;
};

export type ShoppingListApi = {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
    products: ProductApi[];
};

export type ProductApi = {
    createdAt: string;
    id: number;
    quantity: number;
    shoppingListId: number;
    updatedAt: string;
    name: string;
};
