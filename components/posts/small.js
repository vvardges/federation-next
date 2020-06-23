import React from "react";
import Link from "next/link";

const Small = ({ posts }) => (
    <div className="bg-secondary border-black border-left border-md mb-3 py-2">
        <div className="card-group flex-column flex-lg-row">
            {posts.map(post =>
                <div className="card bg-secondary" key={post.id}>
                    <div className="card-header">
                        <small className="font-family-condensed letter-spacing-lg">{post.sub_heading.title}</small>
                    </div>
                    <div className="card-body py-0">
                        <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                            <a className="h5 card-title mb-0">{post.title}</a>
                        </Link>
                    </div>
                    <div className="card-footer d-flex no-gutters">
                        <div className="col-auto">
                            <small className="text-muted font-family-condensed">{post.published_diff_for_humans}</small>
                        </div>
                        <div className="col d-lg-none">
                            <hr className="m-2 border-light-gray" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default Small;