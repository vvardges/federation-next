import React from "react";
import Layout from '../../components/layout';

import {getSubcategoryData} from "../../lib/categories";
import {useRouter} from "next/router";
import Popular from "../../components/posts/popular";
import Pagination from "../../components/pagination";
import MoreBySubcategories from "../../components/posts/moreBySubcategories";
import List from "../../components/posts/list";
import Banner from "../../components/banner";

export async function getServerSideProps({ query }) {
    const data = await getSubcategoryData(query);

    return {
        props: {
            data: data
        },
    }
}

export default function Category({ data }) {
    const {articlesToShow, popularArticles, moreArticlesBySubcategories, tags, advertising} = data;
    const {current_page, last_page} = articlesToShow;

    const router = useRouter();


    const setQueryParam = (param, value) => {
        router.push({
            pathname: `/subcategory/[slug]`,
            query: {
                ...router.query,
                [param]: value
            }
        }, {
            pathname: `/subcategory/${data.general.slug}`,
            query: {
                ...router.query,
                [param]: value
            }
        });
    };

    return (
        <Layout data={{
            page: "subcategory",
            title: <h2 className="text-white font-weight-normal mb-0 d-inline-block">{data.general.title}</h2>,
            selectedCategories: Array.from(router.query.cat),
            tags: tags,
            handleQueryUpdate: (param, values) => setQueryParam(param, values)
        }}>
            <div className="row">
                <div className="col-lg-9">
                    <List posts={articlesToShow.data} />
                    <Pagination currentPage={current_page} totalPages={last_page} handleClick={(page) => setQueryParam("page", page)}/>
                </div>
                <div className="col-lg-3">
                    <Banner banner={advertising[0]}/>
                    <Popular posts={popularArticles} />
                    <Banner banner={advertising[1]}/>
                </div>
            </div>
            <MoreBySubcategories categories={moreArticlesBySubcategories}/>
        </Layout>
    );
}