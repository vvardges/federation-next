import React from "react";
import Layout from '../../components/layout';

import Column from "../../components/posts/column";
import PostCardWithTags from "../../components/post/postCardWithTags";
import MoreBySubcategories from "../../components/posts/moreBySubcategories";
import Small from "../../components/posts/small";
import Banner from "../../components/banner";

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
    const {topFirstArticle, articlesBySubcategories, articlesByCurrentCategory, moreArticlesBySubcategories, advertising} = data;

    return (
        <Layout data={{
            page: "category",
            currentCategory: data.general,
            subcategories: data.subcategories
        }}>
            <div className="row flex-row-reverse ">
                <div className="col-lg-3">
                    <Banner banner={advertising[0]}/>
                </div>
                <div className="col-lg-9 d-flex align-items-center">
                    <PostCardWithTags post={topFirstArticle} banner={advertising[0]}/>
                </div>
            </div>

            <Small posts={articlesBySubcategories}/>

            <Column posts={articlesByCurrentCategory} banner={advertising[1]}/>

            <MoreBySubcategories categories={moreArticlesBySubcategories}/>
        </Layout>
    );
}