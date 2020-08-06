import React from "react";

const Tags = ({ tags, className }) => {
    return tags.length ? (
        <div className={`font-family-condensed letter-spacing-lg ${className}`}>
            {tags.map((tag, index) =>
                <span className={`badge badge-secondary mb-1 ${!index||index===tags.length-1 ? "" : "mx-1"}`} key={tag.tag.id}>#{tag.tag.name}</span>
            )}
        </div>
    ) : null
};

export default Tags;