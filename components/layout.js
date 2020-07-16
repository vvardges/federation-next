import React from "react";

import Footer from "./footer";
import Header from "./header/header";
import Banner from "./banner";
import Cookie from "./cookie";

export default class Layout extends React.Component {
    render() {
        const {children, data} = this.props;

        return (
            <React.Fragment>
                {data && data.banner && <Banner banner={data.banner}/>}
                <Header data={data}/>
                <div className="container py-4">
                    {children}
                </div>
                <Footer/>
                <Cookie/>
            </React.Fragment>
        );
    }
}