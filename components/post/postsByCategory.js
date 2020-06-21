import React from "react";
import Link from "next/link";

const PostsByCategory = ({ categories }) => (
    <div>
        {categories.map(category =>
            <div className="border-left border-md mb-3">
                <p className="font-family-condensed letter-spacing-lg lead m-0 p-3">{category.title}</p>
                <div className="card-group flex-column flex-md-row">
                    {category.articles.map(post =>
                        <div className="card" key={post.id}>
                            <div className="card-body py-0">
                                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                    <a><h5 className="card-title mb-0">{post.title}</h5></a>
                                </Link>
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

export default PostsByCategory;