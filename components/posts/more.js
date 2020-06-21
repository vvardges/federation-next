import React from "react";
import Link from "next/link";

const More = ({ categories }) => (
    <div className="mt-4 pt-2">
        <hr className="d-none d-lg-block"/>
        <h3 className="font-family-condensed mb-3 mt-1 text-center text-md-left">Что еще почитать</h3>
        <div className="row">
            <div className="col-lg-9">
                <div className="row">
                    {categories.map(category =>
                        category.articles.map(post =>
                            <div className="col-sm-4 col-12">
                                <div className="card mb-3" key={category.id}>
                                    <div className="row">
                                        <div className="col-4 col-sm-12">
                                            <img src={post.img_md11} className="img-fluid mb-2" alt="..."/>
                                        </div>
                                        <div className="col">
                                            <p className="card-subtitle font-family-condensed letter-spacing-lg lead">{category.title}</p>
                                            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                                <a className="h5 card-title">{post.title}</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="col-lg-3 text-center">
                <img src="/img/banner.png" className="img-fluid" alt=""/>
            </div>
        </div>
    </div>
);

export default More;