import React from "react";
import dynamic from "next/dynamic";

const Image = dynamic(() => import('./Img'), { ssr: false });

export default Image;