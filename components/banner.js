import React, {useEffect} from "react";
import ReactHtmlParser from 'react-html-parser';

const Banner = ({ banner }) => {
    const scriptText = banner.script.replace("<script>","").replace("</script>","");

    useEffect(() => {
        eval(scriptText);
    }, []);

    return (
        ReactHtmlParser(banner.code)
    )
};

export default Banner;