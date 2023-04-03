export type ShoppingListData = {
    name: string;
    products: ProductData[];
};

export type ProductData = {
    name: string;
    quantity: number;
    category?: string;
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
    price?: number;
    category: string;
};

export enum Category {
    Unknow = "UNKNOW",
    Dry = "DRY",
    Fresh = "FRESH",
    Household = "HOUSEHOLD",
    Frozen = "FROZEN",
    Beverage = "BEVERAGE",
    Hygienic = "HYGIENIC",
}
