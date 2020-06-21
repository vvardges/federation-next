import Link from "next/link";

export default function CategoryHeader({ currentCategory, subcategories }) {
    return (
        <nav className="navbar navbar-dark navbar-expand-xl bg-dark">
            <div className="container">
                <h2 className="text-white font-weight-normal mb-0 mx-auto">{currentCategory.title}</h2>
                <div className="collapse navbar-collapse ml-3" id="navbarTogglerDemo02">
                    <ul className="navbar-nav font-family-condensed font-weight-normal letter-spacing-sm h4 w-100 justify-content-between">
                        {subcategories.map(subcategory =>
                            <li className="nav-item" key={subcategory.id}>
                                <Link href={`/subcategory/[slug]?page=1&cat=${currentCategory.id}`} as={`/subcategory/${subcategory.slug}?page=1&cat=${currentCategory.id}`}>
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