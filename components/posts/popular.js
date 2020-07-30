import React from "react";
import Link from "next/link";

const Popular = ({ posts }) => (
    <div className="mb-2">
        <h5 className="font-family-condensed letter-spacing-0">Популярное</h5>
        <ul className="list-group">
            {posts.map(post =>
                <li className="list-group-item border-left-0 border-right-0" key={post.id}>
                    <small className="font-family-condensed letter-spacing-lg">{post.heading ? post.heading.title : ""}</small>
                    <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                        <a><h5 className="my-1">{post.title}</h5></a>
                    </Link>
                    <small className="text-muted font-family-condensed">{post.published_diff_for_humans}</small>
                </li>
            )}
        </ul>
    </div>
);

export default Popular;