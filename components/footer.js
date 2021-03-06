import Link from "next/link";
import React, {useEffect, useState} from "react";
import {getSettings} from "../lib/categories";

export default function Footer() {
    const [settings, setSettings] = useState([]);

    useEffect( () => {
        getSettings().then(data => setSettings(data));
    }, []);

    return (
        <div className="border-top border-black bg-secondary text-center font-family-condensed py-1">
            <div className="container smaller">
                <Link href="/">
                    <a>
                        <img src="/img/logo.svg" className="mt-3" alt=""/>
                    </a>
                </Link>
                <hr/>

                {settings.length && <div className="mb-4">
                    <a href={settings.find(s => s.name === "Facebook_link").value} target="_blank" className="badge rounded-circle bg-white text-black-50 text-hover-dark py-1 mx-2"><i className="icon-facebook lead"/></a>
                    <a href={settings.find(s => s.name === "Telegram_link").value} target="_blank" className="badge rounded-circle bg-white text-black-50 text-hover-dark py-1 mx-2"><i className="icon-telegram lead"/></a>
                    <a href={settings.find(s => s.name === "Twitter_link").value} target="_blank" className="badge rounded-circle bg-white text-black-50 text-hover-dark py-1 mx-2"><i className="icon-twitter lead"/></a>
                    <a href={settings.find(s => s.name === "VK_link").value} target="_blank" className="badge rounded-circle bg-white text-black-50 text-hover-dark py-1 mx-2"><i className="icon-vk lead"/></a>
                </div>}

                <p className="text-muted mb-3 letter-spacing-lg">Полное или частное использование материалов возможно только с разрешения редакции.</p>
                <div className="letter-spacing-lg my-4">
                    <Link href="/page/[slug]" as="/page/privacy-policy">
                        <a className="d-block text-hover-underline">Политика конфиденциальности</a>
                    </Link>
                    <Link href="/page/[slug]" as="/page/warning-of-age-limit">
                        <a className="d-block text-hover-underline">Предупреждение о возрастном ограничение</a>
                    </Link>
                    <Link href="/page/[slug]" as="/page/disclaimers">
                        <a className="d-block text-hover-underline">Отказ от ответственности</a>
                    </Link>
                    <Link href="/page/[slug]" as="/page/processing-rules">
                        <a className="d-block text-hover-underline">Правила обработки персональных данных</a>
                    </Link>
                    <Link href="/page/[slug]" as="/page/cookie-policy">
                        <a className="d-block text-hover-underline">Использование куки</a>
                    </Link>
                </div>
                <p className="text-muted mb-0">© 2020. Все права защищены. FEDERATION</p>
            </div>
        </div>
    )
}