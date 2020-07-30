import Link from "next/link";
import React from "react";
import Image from "../image";

const List = ({ posts }) => {
    return (
        <ul className="list-group list-group-flush mb-4">
            {posts.map(post =>
                <li className="list-group-item py-3" key={post.id}>
                    <div className="row no-gutters">
                        <div className="col-5 col-sm-3 col-md-2">
                            <p className="font-family-condensed text-muted small">{post.published_diff_for_humans}</p>
                        </div>
                        <div className="col">
                            <div className="row flex-lg-row-reverse">
                                <div className="col-6 col-lg-4">
                                    <div className="mb-2">
                                        <Image post={post} size="md16"/>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                        <a><h4 className="mb-1">{post.title}</h4></a>
                                    </Link>
                                    <p>{post.main_key_thought}</p>
                                    <div className="d-flex">
                                        <small className="font-family-condensed text-muted font-weight-bold">{post.author?.name}</small>
                                        <small className="font-family-condensed text-muted font-weight-bold ml-auto">{post.heading?.title}</small>
                                    </div>
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