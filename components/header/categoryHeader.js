import React from "react";
import Link from "next/link";
import HorizontalScroll from "./horizontalScroll";

export default function CategoryHeader({ currentCategory, subcategories }) {
    return (
        <nav className="navbar navbar-dark navbar-expand-xl bg-dark">
            <div className="container">
                <div className="row mx-auto m-xl-0">
                    <div className="col-xl-auto col-12">
                        <h1 className="h2 text-white font-weight-normal mb-0 text-center text-xl-left">{currentCategory.title}</h1>
                    </div>
                    <HorizontalScroll>
                        <ul className="navbar-nav font-family-condensed font-weight-normal letter-spacing-sm h4 w-100">
                            {subcategories.map(subcategory =>
                                <li className="nav-item px-2" key={subcategory.id}>
                                    <Link href={`/subcategory/[slug]?page=1&cat=${currentCategory.id}`} as={`/subcategory/${subcategory.slug}?page=1&cat=${currentCategory.id}`}>
                                        <a className="nav-link text-nowrap">{subcategory.title}</a>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </HorizontalScroll>
                </div>
            </div>
        </nav>
    );
}