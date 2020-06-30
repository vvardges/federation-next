import React from "react";
import Link from "next/link";

const PostsByCategorySmall = ({ categories }) => (
    <div>
        {categories.map(category =>
            <div className="border-left border-md mb-3" key={category.id}>
                <p className="font-family-condensed letter-spacing-lg lead m-0 p-3">{category.title}</p>
                <div className="card-group flex-column flex-md-row">
                    {category.articles.map(post =>
                        <div className="card border-right border-secondary" key={post.id}>
                            <div className="row card-body py-0">
                                <div className="col">
                                    <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                        <a><h5 className="card-title mb-0">{post.title}</h5></a>
                                    </Link>
                                </div>
                                <div className="col-auto">
                                    <img src={post.img_sm11} className="img-fluid mb-2" alt="..."/>
                                </div>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted font-family-condensed">{post.published_diff_for_humans}</small>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
);

export default PostsByCategorySmall;