import React from "react";
import Link from "next/link";

const Image = ({ post, size }) => {
    return (
        <Link href="/post/[slug]" as={`/post/${post.slug}`}>
            <a><img src={post[`img_${size}`]} className={`img-fluid`} alt="..."/></a>
        </Link>
    )
};

export default Image;