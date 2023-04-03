import React, { ForwardedRef } from "react";
import "./formField.scss";

type Props = {
    type: "text" | "password" | "date" | "number";
    label: string;
    id: string;
    name?: string;
    defaultValue?: string | number;
};

export default React.forwardRef(
    ({ id, label, type, name, defaultValue }: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
        return (
            <div className="formField">
                <label className="formField__label" htmlFor={id}>
                    {label}
                </label>
                <input
                    defaultValue={defaultValue}
                    ref={ref}
                    className="formField__input"
                    type={type}
                    id={id}
                    name={name}
                />
            </div>
        );
    }
);
