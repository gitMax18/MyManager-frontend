export type ShoppingList = {
    name: string;
    createdAt: number;
    products: ShoppingRow[];
};

export type ShoppingRow = {
    product: string;
    quantity: number;
};
