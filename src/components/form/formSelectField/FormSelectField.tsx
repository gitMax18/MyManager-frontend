import React from "react";
import "./formSelectField.scss";
type Props = {
    label: string;
    options: { value: string; name: string }[];
    name: string;
    id: string;
};

export default React.forwardRef(
    ({ label, options, name, id }: Props, ref: React.ForwardedRef<HTMLSelectElement>) => {
        return (
            <div className="formSelectField">
                <label className="formSelectField__label" htmlFor="category">
                    {label}
                </label>
                <select className="formSelectField__select" name={name} ref={ref} id={id}>
                    {options.map((option, index) => {
                        return (
                            <option
                                key={index}
                                className="formSelectField__option"
                                value={option.value}
                            >
                                {option.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }
);
