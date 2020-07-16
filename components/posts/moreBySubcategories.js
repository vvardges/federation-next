import React from "react";
import Link from "next/link";

const MoreBySubcategories = ({ categories }) => (
    <div>
        {categories.map(category =>
            <div className="mt-4 pt-2" key={category.id}>
                <hr className="d-none d-lg-block"/>
                <h3 className="font-family-condensed mb-3 mt-1 text-center text-md-left">{category.title}</h3>
                <div className="row">
                    {category.articles.map(post =>
                        <div className="col-sm col-12" key={post.id}>
                            <div className="card mb-3" key={category.id}>
                                <div className="row">
                                    <div className="col-4 col-sm-12">
                                        <img src={post.img_md16} className="img-fluid mb-2" alt="..."/>
                                    </div>
                                    <div className="col">
                                        <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                            <a className="h5 card-title">{post.title}</a>
                                        </Link>
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

export default MoreBySubcategories;