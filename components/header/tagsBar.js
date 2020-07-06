import React, {useState} from "react";
import {useRouter} from "next/router";

const TagsBar = ({ tags, page }) => {
    const router = useRouter();

    const toggleCat = (tagId) => {
        const tags = router.query.tag ? [...Array.from(router.query.tag)] : [];
        const index = tags.indexOf(`${tagId}`);

        if (index === -1) tags.push(tagId);
        else tags.splice(index, 1);

        const query = {
            ...router.query,
        };

        if (tags.length) query.tag =  tags;
        else delete query.tag;

        delete query.slug;

        router.push({
            pathname: router.pathname, query
        }, {
            pathname: `/${page}/${router.query.slug}`, query
        });
    };

    const isSelected = (tagId) => {
        return router.query.tag && router.query.tag.includes(`${tagId}`);
    };

    const [searchValue, setSearchValue] = useState("");

    return tags ? (
        <div className="bg-light py-2">
            <div className="container font-family-condensed text-black-50">
                <div className="btn-toolbar">
                    <div className="input-group input-group-sm">
                        <input type="text" className="form-control" placeholder="Поиск по тегам" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    </div>
                    <div className="btn-group ml-2">
                        {tags.filter(tag => tag.name.includes(searchValue)).map(tag =>
                            <button type="button" className={`btn btn-sm letter-spacing-lg mx-1 ${isSelected(tag.id) ? "btn-dark" : "btn-outline-gray"}`} onClick={() => toggleCat(tag.id)} key={tag.id}>#{tag.name}</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default TagsBar;