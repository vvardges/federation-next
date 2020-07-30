import React from "react";
import Link from "next/link";

const Image = ({ post, size }) => {
    return (
        <Link href="/post/[slug]" as={`/post/${post.slug}`}>
            <a className="d-inline-block"><img src={post[`img_${size}`]} className={`img-fluid`} alt="..."/></a>
        </Link>
    )
};

export default Image;