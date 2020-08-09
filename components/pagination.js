import React from "react";
import {useRouter} from "next/router";

export default function Pagination ({ totalPages }) {
    const router = useRouter();
    const currentPage = +router.query.page;

    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    pages.splice(1, currentPage - 2);
    pages.splice(currentPage + 1, totalPages - currentPage - 2);
    if (pages[pages.length - 1] !== totalPages) pages.push(totalPages);

    const handleClick = (page) => {
        const query = {...router.query, page};

        router.push({
            pathname: router.pathname, query
        }, {
            pathname: router.asPath.slice(0, router.asPath.indexOf("?")), query
        });
    };

    return totalPages > 1 ? (
        <nav className="mb-4 text-center">
            <ul className="pagination font-family-condensed overflow-auto">
                {totalPages > 1 && <li className={`page-item mr-2 ${currentPage === 1 ? "disabled" : "cursor-pointer"}`} onClick={() => handleClick(Math.max(currentPage - 1, 1))}>
                    <a className="page-link rounded-circle">
                        <i className="icon-arrow-left"/>
                    </a>
                </li>}
                {pages.map((page, index) => {
                    return (index > 0 && page !== pages[index-1] + 1) ? (
                        <>
                            <li className={`page-item mx-1`} key={page + "dots"}>
                                ...
                            </li>
                            <li key={page} className={`page-item mx-1 ${currentPage === page ? "active" : "cursor-pointer"}`} onClick={() => handleClick(page)}>
                                <a className="page-link rounded-circle">{page}</a>
                            </li>
                        </>
                    ) : (
                        <li key={page} className={`page-item mx-1 ${currentPage === page ? "active" : "cursor-pointer"}`} onClick={() => handleClick(page)}>
                            <a className="page-link rounded-circle">{page}</a>
                        </li>
                    )
                })}
                {totalPages > 1 && <li className={`page-item mr-2 ${currentPage === totalPages ? "disabled" : "cursor-pointer"}`} onClick={() => handleClick(Math.min(currentPage + 1, totalPages))}>
                    <a className="page-link rounded-circle">
                        <i className="icon-arrow-right"/>
                    </a>
                </li>}
            </ul>
        </nav>
    ) : null;
}