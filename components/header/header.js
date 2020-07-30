import Link from "next/link";
import React, {useEffect, useState} from "react";
import { getAllCategories } from "../../lib/categories";

import CategoryHeader from "./categoryHeader";
import SubcategoryHeader from "./subcategoryHeader";
import SearchBar from "./searchBar";
import WriteUsModal from "./writeUsModal";
import ExchangeRates from "../widgets/exchangeRates";

export default function Header({ data }) {
    const [categories, setCategories] = useState([]);

    useEffect( () => {
        getAllCategories().then(data => setCategories(data));
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [isSearchOpen, setSearch] = useState(false);
    const toggleSearch = () => setSearch(!isSearchOpen);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div className="sticky-top">
            {isModalOpen && <WriteUsModal toggleModal={toggleModal} />}
            <nav className="navbar navbar-expand-xl text-white bg-dark smallest font-family-roboto">
                <div className="container letter-spacing-md">
                    <div className="float-left text-white">
                        <ExchangeRates/>
                    </div>
                    <div className="float-right d-none d-xl-block">
                        <Link href="/page/[slug]" as="/page/about">
                            <a className="text-white ml-2">О журнале</a>
                        </Link>
                        <a className="text-info ml-2 ml-xl-4 cursor-pointer" onClick={toggleModal}>Написать в редакцию</a>
                    </div>
                </div>
            </nav>
            <nav className={`navbar navbar-expand-xl border-bottom align-items-start ${isOpen ? "navbar-dark bg-black vh-100" : "navbar-light bg-white"}`}>
                {!isSearchOpen ?
                    <div className="container">
                        <button className={`navbar-toggler border-0 ${isOpen ? "text-white" : "text-dark"}`} type="button" onClick={toggle}>
                            <i className={isOpen ? "icon-close" : "icon-navbar-toggler"}/>
                        </button>
                        <Link href="/">
                            <a className="navbar-brand d-xl-none mx-auto">
                                <img src="/img/logo.svg" className="align-top" alt=""/>
                            </a>
                        </Link>
                        <button className="btn btn-link d-xl-none" onClick={toggleSearch}><i className="icon-search"/></button>
                        <div className={`collapse navbar-collapse ${isOpen ? 'show pl-3' : ''}`}>
                            <div className="d-flex flex-column flex-xl-row justify-content-between small font-family-condensed w-100">
                                <ul className="navbar-nav justify-content-between w-100">
                                    {categories.slice(0, categories.length / 2).map(category =>
                                        <li className={`nav-item ${isOpen ? "h4" : ""}`} key={category.id} onClick={() => setIsOpen(false)}>
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
                                        <li className={`nav-item ${isOpen ? "h4" : ""}`} key={category.id} onClick={() => setIsOpen(false)}>
                                            <Link href="/category/[slug]" as={`/category/${category.slug}`}>
                                                <a className={`nav-link text-${category.super_header ? "primary" : isOpen ? "white" : "dark"}`}>{category.title}</a>
                                            </Link>
                                        </li>
                                    )}
                                    <li className="nav-item d-none d-xl-block">
                                        <button className="btn btn-link" onClick={toggleSearch}><i className="icon-search"/></button>
                                    </li>
                                </ul>
                                <ul className="navbar-nav d-xl-none">
                                    <li className="nav-item mb-2" onClick={() => setIsOpen(false)}>
                                        <Link href="/page/[slug]" as="/page/about">
                                            <a className="text-white">О журнале</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item" onClick={() => setIsOpen(false)}>
                                        <a className="text-info" onClick={toggleModal}>Написать в редакцию</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> :
                    <div className="container">
                        <SearchBar handleClose={toggleSearch}/>
                    </div>
                }
            </nav>
            {data && data.page === "category" && <CategoryHeader currentCategory={data.currentCategory} subcategories={data.subcategories}/>}
            {data && (data.page === "subcategory" || data.page === "search") &&
            <SubcategoryHeader
                {...data}
                categories={[...categories, {
                    id: 0,
                    title: "Архивные рубрики",
                }]}
            />}
        </div>
    );
}