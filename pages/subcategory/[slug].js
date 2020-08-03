import React from "react";
import Layout from '../../components/layout';

import { getSubcategoryData } from "../../lib/categories";
import Popular from "../../components/posts/popular";
import Pagination from "../../components/pagination";
import MoreBySubcategories from "../../components/posts/moreBySubcategories";
import List from "../../components/posts/list";
import Banner from "../../components/banner";
import NotFound from "../404";

export async function getServerSideProps({ query }) {
    const response = await getSubcategoryData(query);
    return { props: { response }}
}

export default function Category({ response }) {
    const {status, data} = response;
    if (status !== 200) return <NotFound/>;

    const {articlesToShow, popularArticles, moreArticlesBySubcategories, tags, advertising} = data;
    const {last_page} = articlesToShow;

    return (
        <Layout data={{
            page: "subcategory",
            title: <h2 className="text-white font-weight-normal mb-0 d-inline-block text-truncate">{data.general.title}</h2>,
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
                    <MoreBySubcategories
                        categories={moreArticlesBySubcategories}
                        classNames="h4 font-family-condensed bg-secondary d-xl-inline-block px-3 font-weight-normal"
                    />
                </> :
                <div className="text-center py-4">
                    <img src="/img/oops.png" alt="" className="mb-4"/>
                    <h3>К сожалению, мы не смогли найти никаких результатов</h3>
                </div>
            }
        </Layout>
    );
}