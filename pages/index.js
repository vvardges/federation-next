import React from "react";
import Layout from '../components/layout';

import PostCard from "../components/post/postCard";
import PostCardSmall from "../components/post/postCardSmall";
import CategoryCard from "../components/category/categoryCard";
import Popular from "../components/posts/popular";
import More from "../components/posts/more";
import Banner from "../components/banner";

import {getPageData} from "../lib/categories";

export async function getServerSideProps() {
    const data = await getPageData('main');

    return {
        props: {
            data: data
        },
    }
}

export default function Home({ data }) {
    const {topFirstArticle, topSecondArticle, articlesByCategories, popularArticles, readMoreArticles, advertising} = data;
    return (
        <Layout data={{
            page: "home",
            banner: advertising[0]
        }}>
            <PostCard post={topFirstArticle} />

            <div className="row mt-4 flex-row-reverse">
                <div className="col-lg-3">
                    <Banner banner={advertising[1]}/>
                </div>
                <div className="col-lg-9 d-flex align-items-center">
                    <PostCardSmall post={topSecondArticle} banner={advertising[1]}/>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-lg-9">
                    {articlesByCategories.map((category) =>
                        <CategoryCard key={category.id} category={category}/>
                    )}
                </div>
                <div className="col-lg-3">
                    <Popular posts={popularArticles}/>
                </div>
            </div>

            <More categories={readMoreArticles} banner={advertising[2]}/>
        </Layout>
    );
}