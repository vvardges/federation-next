import React from "react";
import Link from "next/link";

const CategoryCard = ({ category }) => (
    <div className="bg-secondary border-left border-md mb-3">
        <p className="font-family-condensed letter-spacing-lg lead m-0 p-3">{category.title}</p>
        <div className="card-group">
            {category.articles.map((post, index) =>
                <div className="card bg-secondary" key={index}>
                    <div className="card-body py-0">
                        <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                            <a className="h5 card-title mb-0">{post.title}</a>
                        </Link>
                    </div>
                    <div className="card-footer d-flex no-gutters">
                        <div className="col-auto">
                            <small className="text-muted font-family-condensed">{post.published_diff_for_humans}</small>
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