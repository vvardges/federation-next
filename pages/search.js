import React, {useEffect, useState} from "react";
import Layout from '../components/layout';

import {getSearchData} from "../lib/categories";
import {useRouter} from "next/router";
import Popular from "../components/posts/popular";
import Pagination from "../components/pagination";
import List from "../components/posts/list";

export default function Search() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const [searchValue, setSearchValue] = useState("");


    useEffect(() => {
        setIsLoading(true);
        setSearchValue(router.query.q);
        getSearchData(router.query).then((data) => {
            console.log(data);
             setData(data);
             setIsLoading(false);
        });
    }, [router.query]);

    return (
        <Layout data={{
            page: "search",
            title: (
                <input
                    type="text"
                    style={{fontSize: 36, width: 250}}
                    value={searchValue}
                    className="form-control form-control-lg border-0 text-white font-family-condensed text-truncate d-inline-block"
                    onChange={(evt) => setSearchValue(evt.target.value)}
                    onKeyDown={handleKeyDown}
                />
            ),
            tags: data?.tags
        }}>
            {isLoading && <h3 className="text-center">Загрузка...</h3>}
            {!isLoading &&
                <div>
                    {data?.articlesToShow.data.length ?
                        <div className="row">
                            <div className="col-lg-9">
                                <List posts={data?.articlesToShow.data}/>
                                <Pagination totalPages={data?.last_page}/>
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
                </div>
            }
        </Layout>
    );
}