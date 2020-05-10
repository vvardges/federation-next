import React from "react";

const Small = ({ posts }) => (
    <div className="bg-secondary border-black border-left border-md mb-3 py-2">
        <div className="card-group flex-column flex-lg-row">
            {posts.map((post, index) =>
                <div className="card bg-secondary" key={index}>
                    <div className="card-header">
                        <small className="font-family-condensed letter-spacing-lg">{post.source.name}</small>
                    </div>
                    <div className="card-body py-0">
                        <h5 className="card-title mb-0">{post.title}</h5>
                    </div>
                    <div className="card-footer d-flex no-gutters">
                        <div className="col-auto">
                            <small className="text-muted font-family-condensed">{post.publishedAt}</small>
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