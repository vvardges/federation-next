import React, {useState} from "react";
import TagsBar from "./tagsBar";
import FilterCategoriesModal from "./filterCategoriesModal";
import {useRouter} from "next/router";
import HorizontalScroll from "./horizontalScroll";

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const selectedCategories = categories.filter(category => category.isSelected);

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-subcategory">
                <div className="container">
                    <div className="row no-gutters w-100 d-flex flex-nowrap overflow-auto">
                        <div className="col-auto d-flex align-items-center">
                            {title} <i className="icon-slash h3 mb-0 text-white ml-1"/>
                            <button className="btn btn-link btn-lg text-white py-0 align-items-center" onClick={toggleModal}>
                                <i className="icon-plus-circle h5"/>
                                {!selectedCategories.length && <span className="text-mira ml-2 font-family-condensed text-nowrap">Фильтровать по рубрикам</span>}
                            </button>
                            {isModalOpen && <FilterCategoriesModal initialCategories={categories} onFilter={onFilter} toggleModal={toggleModal}/>}
                        </div>
                        <HorizontalScroll collapsible={false}>
                            {selectedCategories.map(category =>
                                <button className="btn btn-link btn-lg text-muted font-family-condensed py-0 text-nowrap" key={category.id} onClick={() => removeCat(category.id)}>
                                    {category.title} <i className="icon-times-circle h5"/>
                                </button>
                            )}
                        </HorizontalScroll>
                    </div>
                </div>
            </nav>
            <TagsBar tags={tags} page={page}/>
        </div>
    );
}