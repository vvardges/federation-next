import React, {useEffect, useState} from "react";
import { getExchangeRates } from "../../lib/categories";

const ExchangeRates = () => {
    const [exchangeRates, setExchangeRates] = useState(null);

    useEffect(() => {
        getExchangeRates().then(data => setExchangeRates(data.exchange));
    }, []);

    if (!exchangeRates) return null;

    return (
        <>
            <span className="pr-2">
                $ {exchangeRates[0].USD[0]}
            </span>
            <span className="pr-2">
                € {exchangeRates[1].EUR[0]}
            </span>
        </>
    )
};

export default ExchangeRates;