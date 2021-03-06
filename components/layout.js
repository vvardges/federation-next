import React from "react";

import Footer from "./footer";
import Header from "./header/header";
import Banner from "./banner";
import Cookie from "./cookie";

export default class Layout extends React.Component {
    render() {
        const {children, data} = this.props;

        return (
            <>
                <div className="bg-body pb-4" style={{background: data?.currentCategory?.background}}>
                    {data?.banner && <div className="d-none d-xl-block mt-4"><Banner banner={data.banner}/></div>}
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