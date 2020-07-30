import React, {useEffect, useState} from "react";

const Cookie = () => {
    const [cookiePolicy, setCookiePolicy] = useState("true");

    useEffect(() => {
        const cookie = localStorage.getItem('cookiePolicy');
        setCookiePolicy(cookie);
    }, []);

    const acceptCookiePolicy = () => {
        localStorage.setItem('cookiePolicy', true);
        setCookiePolicy("true");
    };

    if (cookiePolicy) return null;

    return (
        <div className="position-fixed fixed-bottom font-family-condensed small">
            <div className="bg-black">
                <div className="container text-white-50 letter-spacing-xl pt-1">
                    Уведомлений о использовании cookie на сайте
                </div>
            </div>
            <div className="bg-dark">
                <div className="container py-2">
                    <div className="row">
                        <div className="col-lg-9">
                            <p className="text-white letter-spacing-lg">
                                Для качественного предоставления услуги, мы используем cookies, которые сохраняються на Вашем устройстве.
                                Нажимая СОГЛАСЕН, Вы подтверждаете то, что Вы проинформированы об использовании cookies на нашем сайте.
                                Отключить cookies Вы можете в настройках своего браузера.
                            </p>
                        </div>
                        <div className="col-lg-3">
                            <button type="button" className="btn btn-link btn-lg text-white letter-spacing-lg font-family-condensed" onClick={acceptCookiePolicy}>
                                Согласен <i className="icon-arrow-right h6 ml-2"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cookie;