import Link from "next/link";
import {useEffect, useState} from "react";
import {getAllCategories} from "../lib/categories";

export default function Header({ isCategory }) {
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

    return (
        <div className="sticky-top">
            <nav className="navbar text-white bg-dark smallest font-family-roboto">
                <div className="container letter-spacing-md">
                    <div className="float-left text-white">
                        <i className="icon-cloud"/> +6°C МОСКВА
                    </div>
                    <div className="float-right d-none d-xl-block">
                        <a className="text-white ml-2" href="./about.html">О журнале</a>
                        <a className="text-info ml-2" href="" data-toggle="modal" data-target="#exampleModal">Написать в редакцию</a>
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
                                    <li className={`nav-item ${isOpen ? "h4" : ""}`}>
                                        <Link href="/category/[id]" as={`/category/${category.slug}`}>
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
                                        <Link href="/category/[id]" as={`/category/${category.slug}`}>
                                            <a className={`nav-link text-${category.super_header ? "primary" : isOpen ? "white" : "dark"}`}>{category.title}</a>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {isCategory && <nav className="navbar navbar-dark navbar-expand-xl bg-dark">
                <div className="container">
                    <h2 className="text-white font-weight-normal mb-0 mx-auto">Личные деньги</h2>
                    <div className="collapse navbar-collapse ml-3" id="navbarTogglerDemo02">
                        <ul className="navbar-nav font-family-condensed font-weight-normal letter-spacing-sm h4 w-100 justify-content-between">
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Кризис 2.0</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Пандемия</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Реформы</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Самоизоляция</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./subrubric.html">Госпомощь</a>
                            </li>
                        </ul>
                        <button className="btn btn-lg btn-link text-white"><i className="icon-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </nav>}
        </div>
    );
}