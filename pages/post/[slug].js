import Layout from '../../components/layout';
import React, {useEffect} from "react";
import Link from "next/link";
import {countPostView, getPostData} from "../../lib/categories";

import PostsByCategorySmall from "../../components/post/postsByCategorySmall";
import Popular from "../../components/posts/popular";
import Content from "../../components/content";
import Tags from "../../components/tags";
import ShareIcons from "../../components/shareIcons";

import { FacebookProvider, Comments } from "react-facebook";
import Banner from "../../components/banner";
import ReactHtmlParser from "react-html-parser";

export async function getServerSideProps({ query }) {
    const data = await getPostData(query);

    return {
        props: {
            data: data
        },
    }
}

export default function Slug({ data }) {
    const {general, popularArticles, content, articlesByCategories, tags, facebook_id, facebook_url, advertising} = data;

    useEffect( () => {
        countPostView(general.id).then();
    }, []);

    return (
        <Layout>
            <div>
                <div className="row">
                    <div className="col-lg-8 col-xl-9">
                        <div className="pl-xl-6">
                            <div className="d-flex flex-column flex-md-row justify-content-md-between">
                                <Link href="/category/[slug]" as={`/category/${general.heading.slug}`}>
                                    <h4 className="card-subtitle font-family-condensed letter-spacing-lg font-weight-normal mb-2 cursor-pointer">{general.heading.title}</h4>
                                </Link>
                                <small className="font-family-condensed letter-spacing-lg">{general.published_diff_for_humans}</small>
                            </div>
                            <h1 className="my-lg-3">{general.title}</h1>

                            <div className="d-flex justify-content-between align-items-center">
                                <ShareIcons fullPath={general.fullUrl}/>
                                <small className="font-family-condensed text-muted"><i className="icon-eye"/> {general.number_of_view}</small>
                            </div>
                        </div>
                        <div className="pl-xl-6">
                            <div className="border-top border-black border-md pt-1">
                                <div className="d-flex flex-column flex-sm-row justify-content-sm-between">
                                    <p className="font-family-condensed letter-spacing-lg small">{general.author.name}</p>
                                    <Tags tags={tags}/>
                                </div>
                                <img src={general.img_original} className="w-100" alt="..."/>
                            </div>
                        </div>
                        <div className="pl-xl-5">
                            <p className="my-3 bg-secondary p-3 border-left border-md">{ReactHtmlParser(general.main_key_thought)}</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <Banner banner={advertising[0]}/>
                        <Popular posts={popularArticles} />
                    </div>
                </div>
                <Content content={content}/>
                <div className="d-flex flex-column flex-sm-row justify-content-sm-between pt-1 border-top mx-lg-4 mb-4">
                    <ShareIcons/>
                    <Tags tags={tags}/>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-xl-9 mb-4">
                        <PostsByCategorySmall categories={articlesByCategories} />
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="bg-secondary p-2">
                            <Popular posts={popularArticles} />
                        </div>
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