import React from "react";

export default function Pagination ({currentPage, totalPages, handleClick}) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return totalPages > 1 ? (
        <nav className="mb-4 text-center">
            <ul className="pagination font-family-condensed">
                {totalPages > 1 && <li className={`page-item mr-2 ${currentPage === 1 ? "disabled" : "cursor-pointer"}`} onClick={() => handleClick(Math.max(currentPage - 1, 1))}>
                    <a className="page-link rounded-circle">
                        <i className="icon-arrow-left"/>
                    </a>
                </li>}
                {pages.map(page =>
                    <li key={page} className={`page-item mx-1 ${currentPage === page ? "active" : "cursor-pointer"}`} onClick={() => handleClick(page)}>
                        <a className="page-link rounded-circle">{page}</a>
                    </li>
                )}
                {totalPages > 1 && <li className={`page-item mr-2 ${currentPage === totalPages ? "disabled" : "cursor-pointer"}`} onClick={() => handleClick(Math.min(currentPage + 1, totalPages))}>
                    <a className="page-link rounded-circle">
                        <i className="icon-arrow-right"/>
                    </a>
                </li>}
            </ul>
        </nav>
    ) : null;
}