import Layout from '../../components/layout';
import React, {useEffect} from "react";
import Link from "next/link";
import Head from "next/head";

import {countPostView, getPostData} from "../../lib/categories";

import PostsByCategorySmall from "../../components/post/postsByCategorySmall";
import Popular from "../../components/posts/popular";
import Content from "../../components/content";
import Tags from "../../components/tags";
import ShareIcons from "../../components/shareIcons";

import { FacebookProvider, Comments } from "react-facebook";
import Banner from "../../components/banner";
import ReactHtmlParser from "react-html-parser";
import NotFound from "../404";

const metaTags = [
    "meta_keywords",
    "meta_descriptions",
    "meta_author",
    "meta_copyright",
    "og_title",
    "og_description",
    "og_type, og_url",
    "twitter_site",
    "twitter_creator",
    "twitter_title",
    "twitter_description",
    "twitter_card",
];

export async function getServerSideProps({ query }) {
    const response = await getPostData(query);
    return { props: { response }}
}

export default function Slug({ response }) {
    const {status, data} = response;

    if (status !== 200) return <NotFound/>;
    const {general, popularArticles, content, articlesByCategories, tags, facebook_id, facebook_url, advertising} = data;

    useEffect( () => {
        countPostView(general.id).then();
    }, []);

    return (
        <Layout>
            <Head>
                {metaTags.filter(metaTag => general[metaTag]).map(metaTag =>
                    <meta name={metaTag} content={general[metaTag]} />
                )}
                {general.other_metategs && ReactHtmlParser(general.other_metategs)}
            </Head>
            <div>
                <div className="row">
                    <div className="col-lg-8 col-xl-9">
                        <div className="ml-auto" style={{maxWidth: 740}}>
                            <div className="d-flex flex-column flex-md-row justify-content-md-between">
                                <Link href="/category/[slug]" as={`/category/${general.heading.slug}`}>
                                    <h4 className="card-subtitle font-family-condensed letter-spacing-lg font-weight-normal mb-2 cursor-pointer">{general.heading.title}</h4>
                                </Link>
                                <small className="font-family-condensed letter-spacing-lg">{general.published_diff_for_humans}</small>
                            </div>
                            <h1 className="my-lg-3">{general.title}</h1>

                            <div className="d-flex align-items-center pb-1">
                                <p className="font-family-condensed letter-spacing-lg small mr-auto mb-0">{general.author.name}</p>
                                <small className="font-family-condensed text-muted mr-2"><i className="icon-eye"/> {general.number_of_view}</small>
                                <ShareIcons fullPath={general.fullUrl}/>
                            </div>

                            <div className="border-top border-black border-md pt-2">
                                <img src={general.img_lg175} className="w-100" alt="..."/>
                                <small className="text-muted font-family-condensed">{general.source}</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <Banner banner={advertising[0]}/>
                    </div>
                </div>
                <Content content={[
                    {
                        type: "lead",
                        value: general.main_key_thought
                    },
                    ...content
                ]}/>
                <div className="d-flex flex-column flex-sm-row justify-content-sm-between pt-1 border-top mx-lg-4 mb-4">
                    <div className="mb-2">
                        <ShareIcons fullPath={general.fullUrl} />
                    </div>
                    <Tags tags={tags} className="text-sm-right"/>
                </div>
                <div className="row flex-row-reverse">
                    <div className="col-lg-4 col-xl-3">
                        <div className="bg-secondary p-2 mb-3">
                            <Popular posts={popularArticles} />
                        </div>
                    </div>
                    <div className="col-lg-8 col-xl-9 mb-4">
                        <PostsByCategorySmall categories={articlesByCategories} />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <FacebookProvider appId={facebook_id}>
                        <Comments href={facebook_url} />
                    </FacebookProvider>
                </div>
            </div>
        </Layout>
    );
}