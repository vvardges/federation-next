import React, {useEffect, useState} from "react";
import Layout from '../components/layout';

import {getSearchData} from "../lib/categories";
import {useRouter} from "next/router";
import Popular from "../components/posts/popular";
import Pagination from "../components/pagination";
import List from "../components/posts/list";
import Head from "next/head";

export default function Search() {
    const [searchRequest, setSearchRequest] = useState({
        data: null,
        isLoading: false
    });

    const router = useRouter();

    const  updateQuery = (param, value) => {
        router.push({
            pathname: `/search`,
            query: {
                ...router.query,
                [param]: value
            }
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.value) {
            updateQuery("q", event.target.value);
        }
    };

    useEffect(() => {
        if (router.query.q) {
            setSearchRequest({
                isLoading: true
            });

            getSearchData(router.query).then((data) => {
                setSearchRequest({
                    isLoading: false,
                    data: data
                });
            });
        }
    }, [router.query]);

    const {data, isLoading} = searchRequest;
    return (
        <Layout data={{
            page: "search",
            title: (
                <input
                    type="text"
                    defaultValue={router.query.q}
                    className="form-control form-control-lg border-0 text-white font-family-condensed text-truncate input-search-sm"
                    onKeyDown={handleKeyDown}
                />
            ),
            tags: data?.tags
        }}>
            <Head>
                <title>Результат поиска по фразе - {router.query.q}</title>
            </Head>
            {isLoading ?
                <h3 className="text-center">Загрузка...</h3> :
                data?.articlesToShow.data.length > 0 ?
                    <div className="row">
                        <div className="col-lg-9">
                            <List posts={data?.articlesToShow.data}/>
                            <Pagination totalPages={data?.articlesToShow.last_page}/>
                        </div>
                        <div className="col-lg-3">
                            <Popular posts={data?.popularArticles}/>
                        </div>
                    </div> :
                    <div className="text-center py-4">
                        <img src="/img/oops.png" alt="" className="mb-4"/>
                        <h3>К сожалению, мы не смогли найти никаких результатов для "{router.query.q}"</h3>
                    </div>
            }
        </Layout>
    );
}