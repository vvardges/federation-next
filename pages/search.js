import React, {useState} from "react";
import Layout from '../components/layout';

import {getSearchData} from "../lib/categories";
import {useRouter} from "next/router";
import Popular from "../components/posts/popular";
import Pagination from "../components/pagination";
import List from "../components/posts/list";
import Banner from "../components/banner";

export async function getServerSideProps({ query }) {
    const data = await getSearchData(query);

    return {
        props: {
            data: data
        },
    }
}

export default function Search({ data }) {
    const {articlesToShow, popularArticles, tags, advertising} = data;
    const {current_page, last_page} = articlesToShow;

    const router = useRouter();

    const updateQuery = (param, value) => {
        router.push({
            pathname: `/search`,
            query: {
                ...router.query,
                [param]: value
            }
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            updateQuery("q", event.target.value);
        }
    };

    const [searchValue, setSearchValue] = useState(router.query.q);

    return (
        <Layout data={{
            page: "search",
            title: (
                <input
                    type="text"
                    value={searchValue}
                    className="form-control form-control-lg border-0 text-white w-auto font-family-condensed text-truncate d-inline-block"
                    onChange={(evt) => setSearchValue(evt.target.value)}
                    onKeyDown={handleKeyDown}
                />
            ),
            selectedCategories: router.query.cat ? Array.from(router.query.cat) : [],
            tags: tags,
            onCategoriesChange: cats => updateQuery('cat', cats)
        }}>
            {articlesToShow.data.length ?
                <div className="row">
                    <div className="col-lg-9">
                        <List posts={articlesToShow.data}/>
                        <Pagination currentPage={current_page} totalPages={last_page} handleClick={(page) => updateQuery('page', page)}/>
                    </div>
                    <div className="col-lg-3">
                        {/*<Banner banner={advertising[0]}/>*/}
                        <Popular posts={popularArticles}/>
                        {/*<Banner banner={advertising[1]}/>*/}
                    </div>
                </div> :
                <h3 className="text-center">К сожалению, мы не смогли найти никаких результатов для "{router.query.q}"</h3>
            }
        </Layout>
    );
}