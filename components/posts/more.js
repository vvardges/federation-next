import React from "react";
import Link from "next/link";
import Banner from "../banner";
import Image from "../image";

const More = ({ categories, banner }) => (
    <div className="mt-4 pt-2">
        <hr className="d-none d-lg-block"/>
        <h3 className="font-family-condensed mb-3 mt-1 text-center text-md-left">Что еще почитать</h3>
        <div className="row">
            <div className="col-lg-9">
                <div className="row">
                    {categories.map(category =>
                        category.articles.map(post =>
                            <div className="col-sm-4 col-12" key={post.id}>
                                <div className="card mb-3" key={category.id}>
                                    <div className="row">
                                        <div className="col-4 col-sm-12">
                                            <div className="mb-2">
                                                <Image post={post} size="md11"/>
                                            </div>
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
            <div className="col-lg-3">
                <Banner banner={banner}/>
            </div>
        </div>
    </div>
);

export default More;