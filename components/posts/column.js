import React from "react";
import Link from "next/link";

const Column = ({ posts }) => (
    <div className="mt-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
            {posts.map((post, index) =>
                <div className="col mb-4" key={index}>
                    <div className="card h-100">
                        <img src={post.img_md11} className="card-img-top" alt="..."/>
                        <div className="card-body px-0 py-1">
                            <div className="font-family-condensed letter-spacing-lg mb-1">
                                <span className="badge badge-secondary">#Зарплата</span>
                                <span className="badge badge-secondary">#Проблемы</span>
                                <span className="badge badge-secondary">#Деньги</span>
                            </div>
                            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                <a><h4 className="card-title">{post.title}</h4></a>
                            </Link>
                            <p className="card-text letter-spacing-xs">{post.main_key_thought}</p>
                        </div>
                        <div className="card-footer p-0">
                            <small className="font-family-condensed">
                                <span className="text-muted">{post.published_diff_for_humans}</span>
                                <span className="letter-spacing-lg ml-2">{post.author.name}</span>
                            </small>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default Column;