import React from "react";
import Layout from '../components/layout';

import Popular from "../components/posts/popular";
import Content from "../components/content";

import {getPageData} from "../lib/categories";

export async function getServerSideProps() {
    const data = await getPageData('about');

    return {
        props: {
            data: data
        },
    }
}

export default function About({ data }) {
    const { popularArticles, content } = data;
    return (
        <Layout about>
            <div className="pl-xl-5">
                <h1 className="my-md-5">О журнале</h1>
                <div className="row">
                    <div className="col-lg-8 col-xl-9 mb-4">
                        <div className="border-top border-md border-black pt-4">
                            <Content content={content}/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <Popular posts={popularArticles}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}