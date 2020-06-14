import React from "react";
import Layout from '../components/layout';

import PostCard from "../components/post/postCard";
import PostCardSmall from "../components/post/postCardSmall";
import CategoryCard from "../components/category/categoryCard";
import Popular from "../components/posts/popular";
import More from "../components/posts/more";

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
    const {topFirstArticle, topSecondArticle, articlesByCategories, popularArticles, readMoreArticles} = data;
    return (
        <Layout home>
            <PostCard post={topFirstArticle} />
            <PostCardSmall post={topSecondArticle}/>

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

            <More categories={readMoreArticles}/>
        </Layout>
    );
}