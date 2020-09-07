import Link from "next/link";
import React, {useEffect, useState} from "react";
import { getAllCategories } from "../../lib/categories";

import CategoryHeader from "./categoryHeader";
import SubcategoryHeader from "./subcategoryHeader";
import SearchBar from "./searchBar";
import WriteUsModal from "./writeUsModal";
import ExchangeRates from "../widgets/exchangeRates";
import {useRouter} from "next/router";

export default function Header({ data }) {
    const [categories, setCategories] = useState([]);

    useEffect( () => {
        getAllCategories().then(data => setCategories(data));
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        isOpen ? document.body.classList.remove("overflow-hidden") : document.body.classList.add("overflow-hidden");
        setIsOpen(!isOpen);
    };
    const close = () => {
        document.body.classList.remove("overflow-hidden")
        setIsOpen(false);
    };

    const [isSearchOpen, setSearch] = useState(false);
    const toggleSearch = () => setSearch(!isSearchOpen);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const router = useRouter();
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.value) {
            toggle();

            router.push({
                pathname: `/search`,
                query: {
                    q: event.target.value,
                    page: 1
                }
            });
        }
    };

    return (
        <>
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
                        <div className="container h-100">
                            <div className="d-flex flex-column  no-gutters h-100 w-100">
                                <div className="d-flex d-xl-none w-100 col-auto">
                                    <button className={`navbar-toggler border-0 ${isOpen ? "text-white" : "text-dark"}`} type="button" onClick={toggle}>
                                        <i className={isOpen ? "icon-close" : "icon-navbar-toggler"}/>
                                    </button>
                                    {!isOpen && <>
                                        <Link href="/">
                                            <a className="navbar-brand d-xl-none mx-auto">
                                                <img src="/img/logo.svg" className="align-top" alt=""/>
                                            </a>
                                        </Link>
                                        <button className="btn btn-link d-xl-none" onClick={toggleSearch}><i className="icon-search"/></button>
                                    </>}
                                </div>
                                <div className={`collapse navbar-collapse col overflow-auto ${isOpen ? 'show px-3 pb-4' : ''}`}>
                                    <div className="d-flex flex-column flex-xl-row small font-family-condensed w-100 h-100 overflow-auto pb-xl-0">
                                        <ul className="navbar-nav justify-content-between w-100">
                                            {categories.slice(0, categories.length / 2).map(category =>
                                                <li className={`nav-item ${isOpen ? "h3 font-weight-normal font-family-condensed" : ""}`} key={category.id} onClick={close}>
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
                                                <li className={`nav-item ${isOpen ? "h3 font-weight-normal font-family-condensed" : ""}`} key={category.id} onClick={close}>
                                                    <Link href="/category/[slug]" as={`/category/${category.slug}`}>
                                                        <a className={`nav-link text-${category.super_header ? "primary" : isOpen ? "white" : "dark"}`}>{category.title}</a>
                                                    </Link>
                                                </li>
                                            )}
                                            <li className="nav-item d-none d-xl-block">
                                                <button className="btn btn-link" onClick={toggleSearch}><i className="icon-search"/></button>
                                            </li>
                                        </ul>
                                        <ul className="navbar-nav d-xl-none mt-auto">
                                            <li className="nav-item mb-4">
                                                <div className="input-group input-group-sm border-bottom border-gray pb-1">
                                                    <input
                                                        type="text"
                                                        className={`form-control border-0 font-family-condensed input-search text-gray pl-0`}
                                                        placeholder="Поиск"
                                                        onKeyDown={handleKeyDown}
                                                    />
                                                    <div className="input-group-append text-white px-1">
                                                        <i className="icon-search align-self-center"/>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="nav-item mb-2" onClick={close}>
                                                <Link href="/page/[slug]" as="/page/about">
                                                    <a className="text-white">О журнале</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item mb-3" onClick={close}>
                                                <a className="text-info" onClick={toggleModal}>Написать в редакцию</a>
                                            </li>
                                            <li className="nav-item text-center">
                                                <img src="/img/logo.svg" className="mx-auto" alt=""/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className="container">
                            <SearchBar handleClose={toggleSearch} color={isOpen ? "white" : "dark"}/>
                        </div>
                    }
                </nav>
                {data && data.page === "category" && <CategoryHeader currentCategory={data.currentCategory} subcategories={data.subcategories}/>}
            </div>
            {data && (data.page === "subcategory" || data.page === "search") &&
            <SubcategoryHeader
                {...data}
                categories={[...categories, {
                    id: 0,
                    title: "Архивные рубрики",
                }]}
            />}
        </>
    );
}