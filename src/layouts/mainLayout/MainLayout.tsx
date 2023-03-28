import React, { ReactNode } from "react";
import "./mainLayout.scss";
type Props = {
    children: ReactNode;
};

export default function MainLayout({ children }: Props) {
    return <div className="mainLayout">{children}</div>;
}
