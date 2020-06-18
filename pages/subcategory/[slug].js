import React from "react";
import Layout from '../../components/layout';

import Router from 'next/router'

import Column from "../../components/posts/column";
import PostCardWithTags from "../../components/post/postCardWithTags";
import More from "../../components/posts/more";
import Small from "../../components/posts/small";

import {getCategoryData} from "../../lib/categories";
import {useRouter} from "next/router";

export async function getServerSideProps({ query }) {
    console.log(query);
    const data = await getCategoryData('business');
    //console.log("aaa");

    return {
        props: {
            data: data
        },
    }
}

export default function Category({ data }) {
    const {topFirstArticle, articlesBySubcategories, articlesByCurrentCategory, readMoreArticles} = data;

    const router = useRouter();

    //console.log(router);

    const handleClick = (page) => {
        router.push({
            pathname: `/subcategory/[slug]`,
            query: {
                page: [page, ...router.query.page],
            }
        }, {
            pathname: `/subcategory/${data.general.slug}`,
            query: {
                page: [page, ...router.query.page],
            }
        });
    };

    return (
        <Layout data={{
            page: "subcategory",
            title: data.general.title,
            subcategories: data.subcategories
        }}>
            <div className="row">
                <div className="col-lg-9">
                    <ul className="list-group list-group-flush mb-4">
                        <li className="list-group-item">
                            <div className="row no-gutters">
                                <div className="col-5 col-sm-3 col-md-2">
                                    <p className="font-family-condensed text-muted small">20 минут назад</p>
                                </div>
                                <div className="col">
                                    <div className="row flex-lg-row-reverse">
                                        <div className="col-6 col-lg-4">
                                            <img src="./public/img/card2.png" className="card-img mb-2" alt="..."/>
                                        </div>
                                        <div className="col-lg-8">
                                            <h4 className="mb-1">Малый бизнес не верит в поддержку государства</h4>
                                            <p>Малый бизнес базируется на коммуникации и контактах, поэтому не все
                                                сектора бизнеса могут работать в условиях карантина.</p>
                                            <small className="font-family-condensed text-muted font-weight-bold">Личные
                                                деньги</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <nav className="mb-4 text-center">
                        <ul className="pagination font-family-condensed">
                            <li className="page-item mr-2 disabled ">
                                <a className="page-link rounded-circle" href="#" aria-label="Previous">
                                    <i className="icon-arrow-left"/>
                                </a>
                            </li>
                            {[1,2,3,4,5,6,7].map(page =>
                                <li className="page-item mx-1" onClick={() => handleClick(page)}><a className="page-link rounded-circle">{page}</a>
                                </li>
                            )}
                            {/*<li className="page-item mx-1"><a className="page-link rounded-circle" href="#">2</a></li>*/}
                            {/*<li className="page-item mx-1"><a className="page-link rounded-circle" href="#">3</a></li>*/}
                            {/*<li className="page-item mx-1"><a className="page-link rounded-circle" href="#">4</a></li>*/}
                            {/*<li className="page-item mx-1"><a className="page-link rounded-circle" href="#">5</a></li>*/}
                            {/*<li className="page-item mx-1"><a className="page-link rounded-circle" href="#">6</a></li>*/}
                            {/*<li className="page-item mx-1"><a className="page-link rounded-circle" href="#">7</a></li>*/}
                            {/*<li className="page-item mx-1"><a className="page-link rounded-circle" href="#">...</a></li>*/}
                            {/*<li className="page-item mx-1"><a className="page-link rounded-circle" href="#">147</a></li>*/}
                            <li className="page-item ml-2">
                                <a className="page-link rounded-circle" href="#" aria-label="Next">
                                    <i className="icon-arrow-right"/>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-lg-3">
                    <div className="bg-danger text-center mb-2">
                        <img src="./public/img/banner.png" className="img-fluid" alt=""/>
                    </div>

                </div>
            </div>
        </Layout>
    );
}