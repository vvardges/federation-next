import React from "react";

import Footer from "./footer";
import Header from "./header/header";
import Banner from "./banner";
import Cookie from "./cookie";
import Head from "next/head";

export default class Layout extends React.Component {
    render() {
        const {children, data} = this.props;

        return (
            <>
                <Head>
                    <title>Federation</title>
                </Head>
                <div className="bg-body pb-4" style={{background: data?.currentCategory?.background}}>
                    {data?.banner && <div className="d-none d-xl-block"><Banner banner={data.banner}/></div>}
                    <Header data={data}/>
                    <div className="container py-4">
                        {children}
                    </div>
                    <Cookie/>
                </div>
                <Footer/>
            </>
        );
    }
}