import React from "react";
import Link from "next/link";
import Header from "../components/header";

export default function () {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/>
            <div className="pt-4 bg-dark col">
                <div className="text-gray col-lg-6 mx-auto">
                    <h1>Упссс!</h1>
                    <hr className="border-gray"/>
                    <p className="lead letter-spacing-sm mb-5">Мы не можем найти страницу, которую ты ищешь</p>
                    <img src="/img/404.png" className="w-100" alt=""/>
                    <div className="text-right mt-3">
                        <Link href="/">
                            <a className="btn btn-link btn-lg text-white font-family-condensed letter-spacing-lg">На главную <i className="icon-arrow-right h6 ml-2"/></a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}