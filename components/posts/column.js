import React from "react";
import Link from "next/link";
import Tags from "../tags";
import Banner from "../banner";
import Image from "../image";

const Column = ({ posts, banner }) => {
    const truncate = (text) => text.length > 140 ? text.slice(0, 140).concat("...") : text;

    return (
        <div className="mt-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                {posts.map((post, index) =>
                    <div className="col mb-xl-2 mb-5" key={index}>
                        <div className="card h-100">
                            <Image post={post} size="md11" className="w-100"/>
                            <div className="card-body px-0 py-1">
                                <Tags tags={post.tag_article}/>
                                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                    <a><h4 className="card-title">{post.title}</h4></a>
                                </Link>
                                <p className="card-text letter-spacing-xs" style={{fontSize: 15}}>{truncate(post.main_key_thought)}</p>
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
                <div className="col mb-2">
                    <Banner banner={banner}/>
                </div>
            </div>
        </div>
    );
};

export default Column;