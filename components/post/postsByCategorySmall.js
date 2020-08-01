import React from "react";
import Link from "next/link";
import Image from "../image";

const PostsByCategorySmall = ({ categories }) => (
    <div>
        {categories.map(category =>
            <div className="border-left border-md mb-4" key={category.id}>
                <p className="font-family-condensed letter-spacing-lg lead px-1 px-xl-3">{category.title}</p>
                <div className="card-group flex-column flex-md-row">
                    {category.articles.map((post, index) =>
                        <div className={`card ${!index ? "border-right-bottom border-secondary" : ""}`} key={post.id}>
                            <div className="row card-body py-1 px-1 px-xl-3">
                                <div className="col">
                                    <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                        <a><h5 className="card-title mb-0">{post.title}</h5></a>
                                    </Link>
                                    <small className="text-muted font-family-condensed">{post.published_diff_for_humans}</small>
                                </div>
                                <div className="col-auto">
                                    <div className="mb-2">
                                        <Image post={post} size="sm16"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
);

export default PostsByCategorySmall;