import Modal from "../modal";
import React, {useEffect, useState} from "react";

function FilterCategoriesModal({ initialCategories, onFilter, toggleModal }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories]);

    const toggleCategory = (id) => {
        const updatedCategories = [...categories];
        const selectedCat = updatedCategories.find(c => c.id === id);
        selectedCat.isSelected = !selectedCat.isSelected;
        setCategories(updatedCategories);
    };

    const submitSelectedCats = () => {
        const selectedCats = categories.filter(cat => cat.isSelected).map(cat => cat.id);
        onFilter(selectedCats);
        toggleModal(false);
    };

    return (
        <Modal
            toggle={toggleModal}
            title={"РУБРИКИ"}
            footer={<button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg font-family-condensed" onClick={submitSelectedCats}>
                Фильтровать <i className="icon-arrow-right h6 ml-2"/>
            </button>}>
            <ul className="list-unstyled h4 font-family-condensed font-weight-normal text-muted text-center">
                {categories.map(category =>
                    <li className={`list-group-item cursor-pointer ${category.isSelected ? "text-white" : ""}`} key={category.id} onClick={() => toggleCategory(category.id)}>
                        {category.title}
                        {category.isSelected && <button className="btn btn-sm btn-link text-white"><i className="icon-times-circle"/></button>}
                    </li>
                )}
            </ul>
        </Modal>
    );
}

export default FilterCategoriesModal;