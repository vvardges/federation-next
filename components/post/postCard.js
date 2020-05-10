import React from "react";
import Link from "next/link";

const PostCard = ({ post }) => (
    <div className="card mb-3">
        <div className="row align-items-center">
            <div className="col-lg-6">
                <div className="card-body p-0">
                    <h4 className="card-subtitle font-family-condensed letter-spacing-lg font-weight-normal mb-2">
                        <span className="border-bottom">{post.source.name}</span>
                    </h4>
                    <Link href="/post">
                        <a><h2 className="card-title">{post.title}</h2></a>
                    </Link>
                    <p className="card-text letter-spacing-xs">{post.description}</p>
                    <p className="card-text small font-family-condensed">
                        <span className="letter-spacing-lg">{post.author}</span>
                        <span className="text-muted ml-2">{post.publishedAt}</span>
                    </p>
                </div>
            </div>
            <div className="col-lg-6">
                <img src={post.urlToImage} className="card-img" alt="..."/>
            </div>
        </div>
    </div>
);

export default PostCard;