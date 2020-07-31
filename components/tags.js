import React from "react";

const Tags = ({ tags }) => {
    return tags.length ? (
        <div className="font-family-condensed letter-spacing-lg text-right">
            {tags.map(tag =>
                <span className="badge badge-secondary ml-2 mb-1" key={tag.tag.id}>#{tag.tag.name}</span>
            )}
        </div>
    ) : null
};

export default Tags;