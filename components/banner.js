import React, {useEffect} from "react";
import ReactHtmlParser from 'react-html-parser';

const Banner = ({ banner }) => {
    const scriptText = banner.script.replace("<script>","").replace("</script>","");

    useEffect(() => {
        eval(scriptText);
    }, []);

    return (
        <div className="mb-4">
            {ReactHtmlParser(banner.code)}
        </div>
    )
};

export default Banner;