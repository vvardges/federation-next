import React from "react";
import TagsBar from "./tagsBar";
import FilterCategoriesModal from "./filterCategoriesModal";
import {useRouter} from "next/router";

export default function SubcategoryHeader({ title, categories, tags, page }) {
    const router = useRouter();
    const selectedCatIds = router.query.cat ? Array.isArray(router.query.cat) ? router.query.cat : [router.query.cat] : [];

    const onFilter = (cat) => {
        const query = {
            page: 1,
            cat
        };

        if (router.query.q) query.q = router.query.q;

        router.push({
            pathname: router.pathname, query
        }, {
            pathname: router.asPath.slice(0, router.asPath.indexOf("?")), query
        });
    };

    const removeCat = (id) => {
        onFilter(selectedCatIds.filter(catId => catId !== `${id}`));
    };

    categories.forEach(category => category.isSelected = selectedCatIds.indexOf(`${category.id}`) !== -1);

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <div className="row no-gutters mw-100">
                        <div className="col-auto d-flex align-items-center">
                            {title} <i className="icon-slash h3 mb-0 text-white ml-1"/>
                        </div>
                        <div className="d-flex col overflow-auto text-white">
                            {categories.filter(category => category.isSelected).map(category =>
                                <button className="btn btn-link btn-lg text-muted font-family-condensed py-0 text-nowrap" key={category.id} onClick={() => removeCat(category.id)}>
                                    {category.title} <i className="icon-times-circle h5"/>
                                </button>
                            )}
                            <FilterCategoriesModal initialCategories={categories} onFilter={onFilter}/>
                        </div>
                    </div>
                </div>
            </nav>
            <TagsBar tags={tags} page={page}/>
        </>
    );
}