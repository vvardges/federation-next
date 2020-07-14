import Modal from "../modal";
import React, {useEffect, useState} from "react";
import TagsBar from "./tagsBar";

function FilterCategoriesModal({initialCategories, onFilter}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories]);

    const [isModalOpen, toggleModal] = useState(false);

    const toggleCategory = (id) => {
        const updatedCategories = [...categories];
        const selectedCat = updatedCategories.find(c => c.id === id);
        selectedCat.selected = !selectedCat.selected;
        setCategories(updatedCategories);
    };

    const submitSelectedCats = () => {
        const selectedCats = categories.filter(cat => cat.selected).map(cat => cat.id);
        onFilter("cat", selectedCats);
        toggleModal(false);
    };

    return (
        <>
            <button className="btn btn-link text-white" onClick={toggleModal}><i className="icon-plus-circle"/></button>
            {isModalOpen && <Modal
                toggle={toggleModal}
                title={"ДОБАВИТЬ РУБРИКУ"}
                footer={<button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg font-family-condensed" onClick={submitSelectedCats}>
                    Фильтровать <i className="icon-arrow-right h6 ml-2"/>
                </button>}>
                <ul className="list-unstyled h4 font-family-condensed font-weight-normal text-muted text-center">
                    {categories.map(category =>
                        <li className={`list-group-item cursor-pointer ${category.selected ? "text-white" : ""}`} key={category.id} onClick={() => toggleCategory(category.id)}>
                            {category.title}
                            {category.selected && <button className="btn btn-sm btn-link text-white"><i className="icon-times-circle"/></button>}
                        </li>
                    )}
                </ul>
            </Modal>}
        </>
    );
}

export default function SubcategoryHeader({ title, categories, tags, onFilter, page }) {
    const removeCat = (catId) => {
        categories.find(cat => cat.id === catId).selected = false;
        onFilter("cat", categories.filter(cat => cat.selected).map(cat => cat.id));
    };

    const selectedCategories = categories.filter(category => category.selected);
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container justify-content-start">
                    {title} <i className="icon-slash h3 mb-0 text-white ml-1"/>
                    <div className="text-white">
                        {selectedCategories.length ? selectedCategories.map(category =>
                            <button className="btn btn-link btn-lg text-muted font-family-condensed py-0" key={category.id}>
                                {category.title} <i className="icon-times-circle h5" onClick={() => removeCat(category.id)}/>
                            </button>
                        ): <span className="text-muted h4 font-family-condensed align-middle font-weight-normal">Фильтрование по рубрике</span>}
                        <FilterCategoriesModal initialCategories={categories} onFilter={onFilter}/>
                    </div>
                </div>
            </nav>
            <TagsBar tags={tags} page={page}/>
        </>
    );
}