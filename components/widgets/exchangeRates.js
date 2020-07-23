import React, {useEffect, useState} from "react";
import { getExchangeRates } from "../../lib/categories";

const ExchangeRates = () => {
    const [exchangeRates, setExchangeRates] = useState(null);

    useEffect(() => {
        getExchangeRates().then(data => setExchangeRates(data.exchange));
    }, []);

    const formatNumber = (value) => value.slice(0, 5);

    if (!exchangeRates) return null;

    return (
        <>
            <span className="pr-2">
                $ {formatNumber(exchangeRates[0].USD[0])}
                <i className={`ml-1 text-muted icon-arrow-${exchangeRates[0].dynamic}`}/>
            </span>
            <span className="pr-2">
                € {formatNumber(exchangeRates[1].EUR[0])}
                <i className={`ml-1 text-muted icon-arrow-${exchangeRates[1].dynamic}`}/>
            </span>
        </>
    )
};

export default ExchangeRates;