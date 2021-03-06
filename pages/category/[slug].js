import React from "react";
import Layout from '../../components/layout';

import Column from "../../components/posts/column";
import PostCardWithTags from "../../components/post/postCardWithTags";
import MoreBySubcategories from "../../components/posts/moreBySubcategories";
import Small from "../../components/posts/small";
import Banner from "../../components/banner";

import {getCategoryData} from "../../lib/categories";
import NotFound from "../404";
import Head from "next/head";
import MetaTags from "../../components/metaTags";

export async function getServerSideProps({ params }) {
    const response = await getCategoryData(params.slug);
    return { props: { response }}
}

export default function Category({ response }) {
    const {status, data} = response;
    if (status !== 200) return <NotFound/>;

    const {topFirstArticle, articlesBySubcategories, articlesByCurrentCategory, moreArticlesBySubcategories, advertising, general} = data;

    return (
        <Layout data={{
            page: "category",
            currentCategory: data.general,
            subcategories: data.subcategories
        }}>
            <Head>
                <title>{general.title} - Federation</title>
                <MetaTags general={general}/>
            </Head>

            <div className="row">
                <div className="col-lg-9">
                    <PostCardWithTags post={topFirstArticle} banner={advertising[0]}/>
                </div>
                <div className="col-lg-3">
                    <Banner banner={advertising[0]}/>
                </div>
            </div>

            <Small posts={articlesBySubcategories}/>

            <Column posts={articlesByCurrentCategory} banner={advertising[1]}/>

            <MoreBySubcategories categories={moreArticlesBySubcategories} classNames="h3 font-family-condensed letter-spacing-lg"/>
        </Layout>
    );
}