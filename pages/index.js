import React from "react";
import Layout from '../components/layout';
import fetch from 'node-fetch';

import PostCard from "../components/post/postCard";
import PostCardSmall from "../components/post/postCardSmall";
import CategoryCard from "../components/category/categoryCard";
import Popular from "../components/posts/popular";
import More from "../components/posts/more";

export async function getServerSideProps() {
    const urlPosts = 'http://newsapi.org/v2/top-headlines?' +
        'country=ru&' +
        'apiKey=9253aa616bb04518ba1688a6aae6bdb2';
    const resPosts = await fetch(urlPosts);
    const jsonPosts = await resPosts.json();

    const urlCats = 'http://newsapi.org/v2/sources?' +
        'country=ru&' +
        'apiKey=9253aa616bb04518ba1688a6aae6bdb2';
    const resCats = await fetch(urlCats);
    const jsonCats = await resCats.json();

    return {
        props: {
            posts: jsonPosts.articles,
            categories: jsonCats.sources
        },
    }
}

export default function Home({ categories, posts }) {
    return (
        <Layout home>
            <PostCard post={posts[0]} />
            <PostCardSmall post={posts[1]}/>

            <div className="row mt-4">
                <div className="col-lg-9">
                    {categories.slice(0, 3).map((category, index) =>
                        <CategoryCard key={index} category={category} posts={posts.slice(2, 6)}/>
                    )}
                </div>
                <div className="col-lg-3">
                    <Popular posts={posts.slice(7, 12)}/>
                </div>
            </div>

            <More posts={posts.slice(13, 17)}/>
        </Layout>
    );
}