import React from "react";
import TagsBar from "./tagsBar";
import FilterCategoriesModal from "./filterCategoriesModal";
import {useRouter} from "next/router";

export default function SubcategoryHeader({ title, categories, tags, page }) {
    const router = useRouter();
    const selectedCatIds = router.query.cat ? Array.isArray(router.query.cat) ? router.query.cat : [router.query.cat] : [];

    const onFilter = (cat) => {
        const query = {
            ...router.query,
            page: 1,
            tag: [],
            cat
        };

        router.push({
            pathname: router.pathname, query
        }, {
            pathname: router.asPath.slice(0, router.asPath.indexOf("?")), query
        });
    };

    const removeCat = (catId) => {
        categories.find(cat => cat.id === catId).isSelected = false;
        onFilter(categories.filter(cat => cat.isSelected).map(cat => cat.id));
    };

    categories.forEach(category => category.isSelected = selectedCatIds.indexOf(`${category.id}`) !== -1);

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <div className="row mw-100">
                        <div className="col-auto">
                            {title} <i className="icon-slash h3 mb-0 text-white ml-1"/>
                            <FilterCategoriesModal initialCategories={categories} onFilter={onFilter} showText={!selectedCatIds.length}/>
                        </div>
                        <div className="btn-group col overflow-auto text-white">
                            {categories.filter(category => category.isSelected).map(category =>
                                <button className="btn btn-link btn-lg text-muted font-family-condensed py-0 text-nowrap" key={category.id}>
                                    {category.title} <i className="icon-times-circle h5" onClick={() => removeCat(category.id)}/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <TagsBar tags={tags} page={page}/>
        </>
    );
}