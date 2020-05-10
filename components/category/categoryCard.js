import React from "react";

const CategoryCard = ({ category, posts }) => (
    <div className="bg-secondary border-left border-md mb-3">
        <p className="font-family-condensed letter-spacing-lg lead m-0 p-3">{category.name}</p>
        <div className="card-group">
            {posts.map(post =>
                <div className="card bg-secondary">
                    <div className="card-body py-0">
                        <h5 className="card-title mb-0">{post.title}</h5>
                    </div>
                    <div className="card-footer d-flex no-gutters">
                        <div className="col-auto">
                            <small className="text-muted font-family-condensed">{post.publishedAt}</small>
                        </div>
                        <div className="col d-md-none">
                            <hr className="m-2 border-light-gray"/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default CategoryCard;