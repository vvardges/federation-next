import React from "react";
import Link from "next/link";
import Tags from "../tags";
import Image from "../image";

const PostCardWithTags = ({ post }) => post ? (
    <div className="mb-3">
        <div className="row">
            <div className="col-lg-7 d-flex align-items-center">
                <Image post={post} size="lg16"/>
            </div>
            <div className="col-lg-5">
                <div className="card h-100">
                    <div className="card-body p-0">
                        <Tags tags={post.tag_article}/>
                        <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                            <a><h3 className="card-title">{post.title}</h3></a>
                        </Link>
                        <p className="card-text letter-spacing-xs">{post.main_key_thought}</p>
                    </div>
                    <div className="card-footer px-0 pb-0">
                        <small className="font-family-condensed">
                            <span className="letter-spacing-lg">{post.author.name}</span>
                            <span className="text-muted ml-2">{post.published_diff_for_humans}</span>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
) : null;

export default PostCardWithTags;