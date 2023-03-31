import React from "react";
import MainLayout from "../../layouts/mainLayout/MainLayout";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

type Props = {};

export default function Navbar({}: Props) {
    return (
        <div className="navbar">
            <MainLayout>
                <div className="navbar__container">
                    <div className="navbar__logo">
                        <NavLink className="navbar__logo--link" to="/">
                            My-Manager
                        </NavLink>
                    </div>
                    <nav className="navbar__nav">
                        <ul className="navbar__list">
                            <li className="navbar__item">
                                <NavLink className="navbar__link" to="/shoppingLists">
                                    Shopping lists
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </MainLayout>
        </div>
    );
}
