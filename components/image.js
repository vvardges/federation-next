import React, {useState} from "react";
import Link from "next/link";

const Image = ({ post, size }) => {
    const [hasError, setHasError] = useState(false);
    return (
        <Link href="/post/[slug]" as={`/post/${post.slug}`}>
            <a className="d-inline-block">
                {hasError ?
                    <img src={`/img/NF${size}.png`} className="img-fluid"/> :
                    <img
                        src={post[`img_${size}`]}
                        className={`img-fluid`}
                        onError={() => setHasError(true)}
                        alt="..."
                    />
                }
            </a>
        </Link>
    )
};

export default Image;