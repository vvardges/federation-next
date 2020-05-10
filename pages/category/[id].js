import React from "react";
import fetch from "node-fetch";
import Layout from '../../components/layout';
import Column from "../../components/posts/column";
import PostCardWithTags from "../../components/post/postCardWithTags";
import More from "../../components/posts/more";
import Small from "../../components/posts/small";

export async function getServerSideProps({ params }) {
    const urlPosts = 'http://newsapi.org/v2/top-headlines?' +
        'country=ru&' +
        'category=' + params.id + '&' +
        'apiKey=9253aa616bb04518ba1688a6aae6bdb2';
    const resPosts = await fetch(urlPosts);
    const jsonPosts = await resPosts.json();

    return {
        props: {
            posts: jsonPosts.articles
        }
    }
}

export default function Category({ posts }) {
    return (
        <Layout category>
            <PostCardWithTags post={posts[0]}/>

            <Small posts={posts.slice(1, 5)}/>

            <Column posts={posts.slice(1,5)}/>

            <More posts={posts.slice(6, 11)}/>
        </Layout>
    );
}