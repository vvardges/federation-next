import React from "react";
import Link from "next/link";

const Small = ({ posts }) => (
    <div className="bg-secondary border-black border-left border-md my-3 pb-1 pt-2 pt-xl-0">
        <div className="card-group flex-column flex-lg-row">
            {posts.map(post =>
                <div className="card bg-secondary mb-0" key={post.id}>
                    <div className="card-header pl-2 pl-xl-3">
                        <small className="font-family-condensed letter-spacing-lg">{post.sub_heading.title}</small>
                    </div>
                    <div className="card-body py-0 pl-2 pl-xl-3">
                        <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                            <a className="h5 card-title mb-0">{post.title}</a>
                        </Link>
                    </div>
                    <div className="card-footer d-flex no-gutters pl-2 pl-xl-3 pt-0">
                        <div className="col-auto">
                            <small className="text-muted font-family-condensed smaller">{post.published_diff_for_humans}</small>
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