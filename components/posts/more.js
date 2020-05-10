import React from "react";

const More = ({ posts }) => (
    <div className="mt-4 pt-2">
        <hr className="d-none d-lg-block"/>
        <h3 className="font-family-condensed mb-3 mt-1 text-center text-md-left">Что еще почитать</h3>
        <div className="card-deck">
            {posts.map((post, index) =>
                <div className="card" key={index}>
                    <div className="row">
                        <div className="col-4 col-sm-12">
                            <img src={post.urlToImage} className="img-fluid mb-2" alt="..."/>
                        </div>
                        <div className="col">
                            <p className="card-subtitle font-family-condensed letter-spacing-lg lead">{post.source.name}</p>
                            <h5 className="card-title">{post.title}</h5>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default More;