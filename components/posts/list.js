import Link from "next/link";
import React from "react";

const List = ({ posts }) => {
    return (
        <ul className="list-group list-group-flush mb-4">
            {posts.map(post =>
                <li className="list-group-item" key={post.id}>
                    <div className="row no-gutters">
                        <div className="col-5 col-sm-3 col-md-2">
                            <p className="font-family-condensed text-muted small">{post.published_diff_for_humans}</p>
                        </div>
                        <div className="col">
                            <div className="row flex-lg-row-reverse">
                                <div className="col-6 col-lg-4">
                                    <img src={post.img_original} className="card-img mb-2" alt="..."/>
                                </div>
                                <div className="col-lg-8">
                                    <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                        <a><h4 className="mb-1">{post.title}</h4></a>
                                    </Link>
                                    <p>{post.main_key_thought}</p>
                                    {post.heading && <small className="font-family-condensed text-muted font-weight-bold">{post.heading.title}</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            )}
        </ul>
    )
};

export default List;