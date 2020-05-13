import React from "react";

import Footer from "./footer";
import Header from "./header";

export default class Layout extends React.Component {
    render() {
        const {children} = this.props;

        return (
            <React.Fragment>
                <Header isCategory={this.props.category}/>
                <div className="container py-4">
                    {children}
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}