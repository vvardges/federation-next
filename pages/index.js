import React from "react";
import Layout from '../components/layout';

import PostCard from "../components/post/postCard";
import PostCardSmall from "../components/post/postCardSmall";
import CategoryCard from "../components/category/categoryCard";
import Popular from "../components/posts/popular";
import More from "../components/posts/more";
import Banner from "../components/banner";

import {getPageData} from "../lib/categories";
import Head from "next/head";

export async function getServerSideProps() {
    const response = await getPageData('main');
    return { props: { response }}
}

export default function Home({ response }) {
    const {topFirstArticle, topSecondArticle, articlesByCategories, popularArticles, readMoreArticles, advertising, general, errors} = response.data;

    if (!!errors) return <h1>{errors}</h1>;

    return (
        <Layout data={{
            page: "home",
            banner: advertising[0]
        }}>
            <Head>
                <title>{general.title}</title>
            </Head>

            <PostCard post={topFirstArticle} />

            <div className="row my-4 flex-row-reverse">
                <div className="col-lg-3">
                    <Banner banner={advertising[1]}/>
                </div>
                <div className="col-lg-9 d-flex align-items-center">
                    <PostCardSmall post={topSecondArticle} banner={advertising[1]}/>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-9">
                    {articlesByCategories.map((category) =>
                        <CategoryCard key={category.id} category={category}/>
                    )}
                </div>
                <div className="col-lg-3 d-flex align-items-center">
                    <Popular posts={popularArticles}/>
                </div>
            </div>

            <More categories={readMoreArticles} banner={advertising[2]}/>
        </Layout>
    );
}