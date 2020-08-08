import React from "react";
import Link from "next/link";
import Image from "../image";

const MoreBySubcategories = ({ categories, classNames }) => (
    categories.filter(category => category.articles?.length > 0).map(category =>
        <div key={category.id} className="more-by-subcategories">
            <hr className="d-none d-lg-block mb-0"/>
            <p className={`title my-2 text-center text-md-left ${classNames}`}>{category.title}</p>
            <div className="row">
                {category.articles.map(post =>
                    <div className="col-sm col-12" key={post.id}>
                        <div className="card mb-3" key={category.id}>
                            <div className="row">
                                <div className="col-4 col-sm-12">
                                    <div className="mb-2">
                                        <Image post={post} size="lg16"/>
                                    </div>
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
    )
);

export default MoreBySubcategories;