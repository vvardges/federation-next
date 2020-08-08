import React from "react";
import Layout from '../../components/layout';
import Head from "next/head";

import Popular from "../../components/posts/popular";
import Content from "../../components/content";

import {getPageData} from "../../lib/categories";
import NotFound from "../404";

export async function getServerSideProps({ params }) {
    const response = await getPageData(params.slug);
    return { props: { response }}
}

export default function About({ response }) {
    const {status, data} = response;

    if (status !== 200) return <NotFound/>;

    const { popularArticles, content, general } = data;
    return (
        <Layout>
            <Head>
                <title>{general.title}</title>
            </Head>
            <div className="pl-xl-5">
                <h1 className="my-md-5">{general.title}</h1>
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