import Link from "next/link";
import React, {useEffect, useState, useContext} from "react";
import {getAllCategories} from "../lib/categories";
import Modal from "./modal";

function CategoryHeader({ title, subcategories }) {
    return (
        <nav className="navbar navbar-dark navbar-expand-xl bg-dark">
            <div className="container">
                <h2 className="text-white font-weight-normal mb-0 mx-auto">{title}</h2>
                <div className="collapse navbar-collapse ml-3" id="navbarTogglerDemo02">
                    <ul className="navbar-nav font-family-condensed font-weight-normal letter-spacing-sm h4 w-100 justify-content-between">
                        {subcategories.map(subcategory =>
                            <li className="nav-item" key={subcategory.id}>
                                <Link href="/subcategory/[slug]" as={`/subcategory/${subcategory.slug}`}>
                                    <a className="nav-link">{subcategory.title}</a>
                                </Link>
                            </li>
                        )}
                    </ul>
                    {/*<button className="btn btn-lg btn-link text-white"><i className="icon-chevron-right"></i>*/}
                    {/*</button>*/}
                </div>
            </div>
        </nav>
    );
}

function SubcategoryHeader({ title, categories }) {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <h2 className="text-white font-weight-normal mb-0">Пандемия <i className="icon-slash h3"/>
                        <span className="text-muted h4 font-family-condensed align-middle font-weight-normal">{title}<button
                            className="btn btn-sm btn-link text-muted"><i className="icon-times-circle"/></button></span>
                        <button className="btn btn-sm btn-link text-white" data-toggle="modal"
                                data-target="#exampleModal2"><i className="icon-plus-circle"/></button>
                    </h2>
                </div>
            </nav>
            <div className="bg-light py-2">
                <div className="container font-family-condensed text-black-50">
                    <div className="btn-toolbar">
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" placeholder="Поиск по тегам"/>
                        </div>
                        <div className="btn-grou ml-2" role="group" aria-label="First group">
                            <button type="button" className="btn btn-sm letter-spacing-lg btn-outline-gray">#Москва
                            </button>
                            <button type="button" className="btn btn-sm letter-spacing-lg btn-dark">#Бизнесдома</button>
                            <button type="button"
                                    className="btn btn-sm letter-spacing-lg btn-outline-dark">#Бизнесдлявсех
                            </button>
                            <button type="button"
                                    className="btn btn-sm letter-spacing-lg btn-outline-dark">#Деньгиневсем
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
                        <button className="btn btn-link btn-sm text-info ml-2" onClick={toggleModal}>Написать в редакцию</button>
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
            {data && data.page === "category" && <CategoryHeader title={data.title} subcategories={data.subcategories}/>}
            {data && data.page === "subcategory" && <SubcategoryHeader title={data.title} categories={categories}/>}
        </div>
    );
}