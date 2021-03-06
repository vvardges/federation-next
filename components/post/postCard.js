import React from "react";
import Link from "next/link";

import Image from "../image";

const PostCard = ({ post }) => post ? (
    <div className="card">
        <div className="row align-items-center">
            <div className="col">
                <div className="card-body p-0">
                    <h4 className="card-subtitle font-family-condensed letter-spacing-lg font-weight-normal mb-3">
                        <span className="border-bottom pr-2 pb-1">{post.heading ? post.heading.title : ""}</span>
                    </h4>
                    <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                        <a><h2 className="card-title mb-3">{post.title}</h2></a>
                    </Link>
                    <p className="card-text letter-spacing-xs">{post.main_key_thought}</p>
                    <p className="card-text small font-family-condensed">
                        <span className="letter-spacing-lg">{post.author.name}</span>
                        <span className="text-muted ml-2">{post.published_diff_for_humans}</span>
                    </p>
                </div>
            </div>
            <div className="col-auto">
                <Image post={post} size="lg16"/>
            </div>
        </div>
    </div>
) : null;

export default PostCard;