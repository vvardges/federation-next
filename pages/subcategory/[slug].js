import React from "react";
import Layout from '../../components/layout';

import { getSubcategoryData } from "../../lib/categories";
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
    const {last_page} = articlesToShow;

    return (
        <Layout data={{
            page: "subcategory",
            title: <h2 className="text-white font-weight-normal mb-0 d-inline-block">{data.general.title}</h2>,
            tags: tags,
        }}>
            {articlesToShow.data.length ?
                <>
                    <div className="row">
                        <div className="col-lg-9">
                            <List posts={articlesToShow.data} />
                            <Pagination totalPages={last_page}/>
                        </div>
                        <div className="col-lg-3">
                            <Banner banner={advertising[0]}/>
                            <Popular posts={popularArticles} />
                            <Banner banner={advertising[1]}/>
                        </div>
                    </div>
                    <MoreBySubcategories categories={moreArticlesBySubcategories}/>
                </> :
                <h3 className="text-center">К сожалению, мы не смогли найти никаких результатов</h3>
            }
        </Layout>
    );
}