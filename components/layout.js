import React from "react";

import Footer from "./footer";
import Header from "./header";

export default class Layout extends React.Component {
    render() {
        const {children, data} = this.props;

        return (
            <React.Fragment>
                <Header data={data}/>
                <div className="container py-4">
                    {children}
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}