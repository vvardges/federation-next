import React from "react";
import Link from "next/link";

const PostCardWithTags = ({ post }) => (
    <div className="card mb-3">
        <div className="row align-items-center">
            <div className="col-lg-5">
                <img src={post.img_original} className="card-img mb-2" alt="..."/>
            </div>
            <div className="col-lg-5">
                <div className="card-body p-0">
                    <div className="font-family-condensed letter-spacing-lg mb-3">
                        <span className="badge badge-secondary">#Москва</span>
                        <span className="badge badge-secondary">#Бизнесдома</span>
                        <span className="badge badge-secondary">#Бизнесдлявсех</span>
                        <span className="badge badge-secondary">#Деньгиневсем</span>
                    </div>
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-text letter-spacing-xs">{post.main_key_thought}</p>
                </div>
                <div className="card-footer px-0">
                    <small className="font-family-condensed">
                        <span className="letter-spacing-lg">{post.author.name}</span>
                        <span className="text-muted ml-2">{post.published_diff_for_humans}</span>
                    </small>
                </div>
            </div>
            <div className="col-lg-2">
                <div className="bg-danger text-center">
                    <img src="/img/banner.png" className="img-fluid" alt=""/>
                </div>
            </div>
        </div>
    </div>
);

export default PostCardWithTags;