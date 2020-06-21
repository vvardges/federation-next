import Link from "next/link";
import React, {useEffect, useState} from "react";
import {getAllCategories} from "../../lib/categories";

import Modal from "../modal";
import CategoryHeader from "./categoryHeader";
import SubcategoryHeader from "./subcategoryHeader";

export default function Header({ data }) {
    const [categories, setCategories] = useState([]);

    useEffect( () => {
        async function fetchData() {
            const categories = await getAllCategories();
            return categories;
        }
        fetchData().then(data => setCategories(data));
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [isModalOpen, toggleModal] = useState(false);

    const initialCats = categories.map(category => {
        return {
            ...category,
            selected: data.selectedCategories.includes(""+category.id)
        }
    });

    return (
        <div className="sticky-top">
            <nav className="navbar text-white bg-dark smallest font-family-roboto">
                <div className="container letter-spacing-md">
                    <div className="float-left text-white">
                        <i className="icon-cloud"/> +6°C МОСКВА
                    </div>
                    <div className="float-right d-none d-xl-block">
                        <Link href="/about">
                            <a className="text-white ml-2">О журнале</a>
                        </Link>
                        <a className="text-info ml-2" onClick={toggleModal}>Написать в редакцию</a>
                        {isModalOpen && <Modal toggle={toggleModal} title={"Написать в редакцию"}>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg text-white" placeholder="Ваше имя"/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg text-white" placeholder="E-mail"/>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg text-white" rows="3" placeholder="Напишите нам что-то ;)"/>
                                </div>
                            </form>
                        </Modal>}
                    </div>
                </div>
            </nav>
            <nav className={`navbar navbar-expand-xl border-bottom align-items-start ${isOpen ? "navbar-dark bg-black vh-100" : "navbar-light bg-white"}`}>
                <div className="container">
                    <button className={`navbar-toggler border-0 ${isOpen ? "text-white" : "text-dark"}`} type="button" onClick={toggle}>
                        <i className={isOpen ? "icon-close" : "icon-navbar-toggler"}/>
                    </button>
                    <a className="navbar-brand d-xl-none mx-auto" href="#">
                        <img src="/img/logo.svg" className="align-top" alt=""/>
                    </a>
                    <div className={`collapse navbar-collapse ${isOpen ? 'show pl-3' : ''}`}>
                        <div className="d-flex flex-column flex-xl-row justify-content-between small font-family-condensed w-100">
                            <ul className="navbar-nav justify-content-between w-100">
                                {categories.slice(0, categories.length / 2).map(category =>
                                    <li className={`nav-item ${isOpen ? "h4" : ""}`} key={category.id}>
                                        <Link href="/category/[slug]" as={`/category/${category.slug}`}>
                                            <a className={`nav-link text-${category.super_header ? "primary" : isOpen ? "white" : "dark"}`}>{category.title}</a>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            <Link href="/">
                                <a className="px-5 d-none d-xl-block">
                                    <img src="/img/logo.svg" className="align-top" alt=""/>
                                </a>
                            </Link>
                            <ul className="navbar-nav justify-content-between w-100">
                                {categories.slice(categories.length / 2).map(category =>
                                    <li className={`nav-item ${isOpen ? "h4" : ""}`} key={category.id}>
                                        <Link href="/category/[slug]" as={`/category/${category.slug}`}>
                                            <a className={`nav-link text-${category.super_header ? "primary" : isOpen ? "white" : "dark"}`}>{category.title}</a>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {data && data.page === "category" && <CategoryHeader currentCategory={data.currentCategory} subcategories={data.subcategories}/>}
            {data && data.page === "subcategory" && <SubcategoryHeader title={data.title} categories={initialCats} onFilter={data.onCategoriesChange}/>}
        </div>
    );
}