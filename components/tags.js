const Tags = ({ tags }) => {
    return tags.length ? (
        <div className="font-family-condensed letter-spacing-lg mb-3">
            {tags.map(tag =>
                <span className="badge badge-secondary mr-1" key={tag.id}>#{tag.tag.name}</span>
            )}
        </div>
    ) : null
};

export default Tags;