import React from "react";
import Layout from '../components/layout';

import {getSearchData} from "../lib/categories";
import {useRouter} from "next/router";
import Popular from "../components/posts/popular";
import Pagination from "../components/pagination";
import Link from "next/link";

export async function getServerSideProps({ query }) {
    const data = await getSearchData(query);

    return {
        props: {
            data: data
        },
    }
}

export default function Search({ data }) {
    const {articlesToShow, popularArticles} = data;
    const {current_page, last_page} = articlesToShow;

    const router = useRouter();

    const updateQuery = (param, value) => {
        router.push({
            pathname: `/search`,
            query: {
                ...router.query,
                [param]: value
            }
        }, {
            pathname: `/search`,
            query: {
                ...router.query,
                [param]: value
            }
        });
    };

    return (
        <Layout data={{
            page: "search",
            title: router.query.q,
            selectedCategories: router.query.cat ? Array.from(router.query.cat) : [],
            onCategoriesChange: cats => updateQuery('cat', cats)
        }}>
            <div className="row">
                <div className="col-lg-9">
                    <ul className="list-group list-group-flush mb-4">
                        {articlesToShow.data.map(post =>
                            <li className="list-group-item" key={post.id}>
                                <div className="row no-gutters">
                                    <div className="col-5 col-sm-3 col-md-2">
                                        <p className="font-family-condensed text-muted small">{post.published_diff_for_humans}</p>
                                    </div>
                                    <div className="col">
                                        <div className="row flex-lg-row-reverse">
                                            <div className="col-6 col-lg-4">
                                                <img src={post.img_original} className="card-img mb-2" alt="..."/>
                                            </div>
                                            <div className="col-lg-8">
                                                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                                    <a><h4 className="mb-1">{post.title}</h4></a>
                                                </Link>
                                                <p>{post.main_key_thought}</p>
                                                {post.heading && <small className="font-family-condensed text-muted font-weight-bold">{post.heading.title}</small>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>

                    <Pagination currentPage={current_page} totalPages={last_page} handleClick={(page) => updateQuery('page', page)}/>
                </div>
                <div className="col-lg-3">
                    <div className="bg-danger text-center mb-2">
                        <img src="/img/banner.png" className="img-fluid" alt=""/>
                    </div>
                    <Popular posts={popularArticles} />
                </div>
            </div>
        </Layout>
    );
}