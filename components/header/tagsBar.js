import React, {useState} from "react";
import {useRouter} from "next/router";
import HorizontalScroll from "./horizontalScroll";

const TagsBar = ({ tags, page }) => {
    const router = useRouter();
    const queryTags = router.query.tag ? Array.isArray(router.query.tag) ? router.query.tag : [router.query.tag] : [];

    const toggleTag = (tagId) => {
        const index = queryTags.indexOf(`${tagId}`);

        if (index === -1) queryTags.push(tagId);
        else queryTags.splice(index, 1);

        const query = {
            ...router.query,
            page: 1
        };

        if (queryTags.length) query.tag =  queryTags;
        else delete query.tag;

        if (query.slug) {
            delete query.slug;
            router.push({
                pathname: router.pathname, query
            }, {
                pathname: `/${page}/${router.query.slug}`, query
            });
        } else {
            router.push({
                pathname: router.pathname, query
            });
        }
    };

    const isSelected = (tagId) => {
        return queryTags && queryTags.indexOf(`${tagId}`) !== -1;
    };

    const [searchValue, setSearchValue] = useState("");

    return tags ? (
        <div className="py-2" style={{background: "#ECEFF5"}}>
            <div className="container font-family-condensed text-black-50">
                <div className="btn-toolbar row">
                    <div className="input-group input-group-sm col-auto">
                        <input
                            type="text"
                            className="form-control tags-search"
                            placeholder="Поиск по тегам"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <HorizontalScroll theme="light">
                        {tags.filter(tag => tag.name.toLowerCase().includes(searchValue.toLowerCase())).map(tag =>
                            <button
                                type="button"
                                className={`btn btn-sm letter-spacing-lg mx-1 ${isSelected(tag.id) ? "btn-dark" : "btn-outline-gray"}`}
                                onClick={() => toggleTag(tag.id)}
                                key={tag.id}
                                style={{borderColor: "#B1B2B5"}}
                            >
                                #{tag.name}
                            </button>
                        )}
                    </HorizontalScroll>
                </div>
            </div>
        </div>
    ) : null;
};

export default TagsBar;