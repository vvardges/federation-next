import Layout from '../../components/layout';
import React, {useEffect} from "react";
import {countPostView, getPostData} from "../../lib/categories";

import PostsByCategorySmall from "../../components/post/postsByCategorySmall";
import Popular from "../../components/posts/popular";
import Content from "../../components/content";
import Tags from "../../components/tags";
import ShareIcons from "../../components/shareIcons";

import { FacebookProvider, Comments } from "react-facebook";

export async function getServerSideProps({ params }) {
    const data = await getPostData(params.slug);

    return {
        props: {
            data: data
        },
    }
}

export default function Slug({ data }) {
    const {general, popularArticles, content, articlesByCategories, tags, facebook_id, facebook_url} = data;

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
                                <h4 className="card-subtitle font-family-condensed letter-spacing-lg font-weight-normal mb-2">{general.heading.title}</h4>
                                <small className="font-family-condensed letter-spacing-lg">{general.published_diff_for_humans}</small>
                            </div>
                            <h1 className="my-lg-3">{general.title}</h1>

                            <div className="d-flex justify-content-between align-items-center">
                                <ShareIcons/>
                                <small className="font-family-condensed text-muted"><i className="icon-eye"/> {general.number_of_view}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-xl-9">
                        <div className="pl-xl-6">
                            <div className="border-top border-black border-md pt-1">
                                <p className="font-family-condensed letter-spacing-lg small">{general.author.name}</p>
                                <img src={general.img_original} className="w-100" alt="..."/>
                            </div>
                        </div>
                        <div className="pl-xl-5">
                            <p className="my-3 bg-secondary p-3 border-left border-md">{general.main_key_thought}</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <Popular posts={popularArticles} />
                    </div>
                </div>
                <Content content={content}/>
                <div className="d-flex flex-column flex-sm-row justify-content-sm-between pt-1 border-top mx-lg-4 mb-3">
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