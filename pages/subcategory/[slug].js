import React from "react";
import Layout from '../../components/layout';

import {getSubcategoryData} from "../../lib/categories";
import {useRouter} from "next/router";
import Popular from "../../components/posts/popular";
import Pagination from "../../components/pagination";
import Link from "next/link";

export async function getServerSideProps({ query }) {
    const data = await getSubcategoryData(query);

    return {
        props: {
            data: data
        },
    }
}

export default function Category({ data }) {
    const {articlesToShow, popularArticles} = data;
    const {current_page, total} = articlesToShow;

    const router = useRouter();


    const setPage = (page) => {
        console.log(router.query);
        router.push({
            pathname: `/subcategory/[slug]`,
            query: {
                page: page,
                cat: router.query.cat
            }
        }, {
            pathname: `/subcategory/${data.general.slug}`,
            query: {
                page: page,
                cat: router.query.cat
            }
        });
    };

    return (
        <Layout data={{
            page: "subcategory",
            title: data.general.title,
            selectedCategories: Array.from(router.query.cat)
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

                    <Pagination currentPage={current_page} totalPages={total} handleClick={(page) => setPage(page)}/>
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