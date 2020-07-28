import React from "react";
import Link from "next/link";
import HorizontalScroll from "./horizontalScroll";

export default function CategoryHeader({ currentCategory, subcategories }) {
    return (
        <nav className="navbar navbar-dark navbar-expand-xl bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-auto">
                        <h2 className="text-white font-weight-normal mb-0 mx-auto">{currentCategory.title}</h2>
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