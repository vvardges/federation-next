import Modal from "../modal";
import React, {useEffect, useState} from "react";

function FilterCategoriesModal({initialCategories, onFilter}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories]);

    const [isModalOpen, toggleModal] = useState(false);

    const toggleCategory = (index) => {
        const updatedCategories = [...categories];
        updatedCategories[index].selected = !updatedCategories[index].selected;
        setCategories(updatedCategories);
    };

    const submitSelectedCats = () => {
        const selectedCats = categories.filter(cat => cat.selected).map(cat => cat.id);
        onFilter(selectedCats);
        toggleModal(false);
    };

    return (
        <>
            <button className="btn btn-sm btn-link text-white" onClick={toggleModal}><i className="icon-plus-circle"/></button>
            {isModalOpen && <Modal
                toggle={toggleModal}
                title={"Написать в редакцию"}
                footer={<button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg" onClick={submitSelectedCats}>
                    Филтровать <i className="icon-arrow-right h6 ml-2"/>
                </button>}>
                <ul className="list-unstyled h4 font-family-condensed font-weight-normal text-muted text-center">
                    {categories.map((category, index) =>
                        <li className={`list-group-item ${category.selected ? "text-white" : ""}`} key={category.id} onClick={() => toggleCategory(index)}>
                            {category.title}
                            {category.selected && <button className="btn btn-sm btn-link text-white"><i className="icon-times-circle"/></button>}
                        </li>
                    )}
                </ul>
            </Modal>}
        </>
    );
}

export default function SubcategoryHeader({ title, categories, onFilter }) {
    const removeCat = (catId) => {
        categories.find(cat => cat.id === catId).selected = false;
        onFilter(categories.filter(cat => cat.selected).map(cat => cat.id));
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <h2 className="text-white font-weight-normal mb-0">{title} <i className="icon-slash h3"/>
                        {categories.filter(category => category.selected).map(category =>
                            <span className="text-muted h4 font-family-condensed align-middle font-weight-normal" key={category.id}>
                                {category.title}<button className="btn btn-sm btn-link text-muted" onClick={() => removeCat(category.id)}><i className="icon-times-circle"/></button>
                            </span>
                        )}

                        <FilterCategoriesModal initialCategories={categories} onFilter={onFilter}/>
                    </h2>
                </div>
            </nav>
            <div className="bg-light py-2">
                <div className="container font-family-condensed text-black-50">
                    <div className="btn-toolbar">
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" placeholder="Поиск по тегам"/>
                        </div>
                        <div className="btn-grou ml-2" role="group" aria-label="First group">
                            <button type="button" className="btn btn-sm letter-spacing-lg btn-outline-gray">#Москва
                            </button>
                            <button type="button" className="btn btn-sm letter-spacing-lg btn-dark">#Бизнесдома</button>
                            <button type="button"
                                    className="btn btn-sm letter-spacing-lg btn-outline-dark">#Бизнесдлявсех
                            </button>
                            <button type="button"
                                    className="btn btn-sm letter-spacing-lg btn-outline-dark">#Деньгиневсем
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}