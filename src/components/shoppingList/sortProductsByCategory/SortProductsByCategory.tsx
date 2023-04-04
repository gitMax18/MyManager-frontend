import React from "react";
import { Category, ProductApi } from "../../../types/shopping";
import Product from "../product/Product";
import "./sortProductsByCategory.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";

type Props = {
    products: ProductApi[];
    onUpdateProduct: (product: ProductApi) => void;
    onDeleteProduct: (productId: number, shoppingListId: number) => void;
};

export default function SortProductsByCategory({
    products,
    onDeleteProduct,
    onUpdateProduct,
}: Props) {
    return (
        <div className="sortProductsByCategory">
            {Object.entries(Category).map((category, index) => {
                return (
                    <Droppable
                        droppableId={category[1]}
                        key={index}
                        type={products[0].shoppingListId.toString()}
                    >
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <h4 className="sortProductsByCategory__category">{category[0]}</h4>
                                <hr />
                                {products
                                    .filter(product => product.category === category[1])
                                    .map((product, index) => {
                                        return (
                                            <Draggable
                                                draggableId={product.id.toString()}
                                                index={index}
                                                key={product.id}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Product
                                                            product={product}
                                                            onDeleteProduct={onDeleteProduct}
                                                            onUpdateProduct={onUpdateProduct}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                );
            })}
        </div>
    );
}
