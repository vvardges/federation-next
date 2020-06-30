import React from "react";
import Layout from '../../components/layout';

import Column from "../../components/posts/column";
import PostCardWithTags from "../../components/post/postCardWithTags";
import MoreBySubcategories from "../../components/posts/MoreBySubcategories";
import Small from "../../components/posts/small";

import {getCategoryData} from "../../lib/categories";

export async function getServerSideProps({ params }) {
    const data = await getCategoryData(params.slug);

    return {
        props: {
            data: data
        },
    }
}

export default function Category({ data }) {
    const {topFirstArticle, articlesBySubcategories, articlesByCurrentCategory, moreArticlesBySubcategories} = data;

    return (
        <Layout data={{
            page: "category",
            currentCategory: data.general,
            subcategories: data.subcategories
        }}>
            <PostCardWithTags post={topFirstArticle}/>

            <Small posts={articlesBySubcategories}/>

            <Column posts={articlesByCurrentCategory}/>

            <MoreBySubcategories categories={moreArticlesBySubcategories}/>
        </Layout>
    );
}