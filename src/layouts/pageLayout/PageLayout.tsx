import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainLayout from "../mainLayout/MainLayout";

type Props = {
    children: React.ReactNode;
};

function PageLayout({ children }: Props) {
    return (
        <>
            <Navbar />
            <MainLayout>{children}</MainLayout>
        </>
    );
}

export default PageLayout;
