import React from "react";

function ContentGenerator({ data }) {
    const {type, value, author} = data;
    switch (type) {
        case "heading":
            return <h4 className="my-2">{value}</h4>;
        case "paragraph":
            return <p className="my-2 pl-lg-5">{value}</p>;
        case "quote":
            return (
                <div className="my-2 bg-secondary p-3 pl-4">
                    <p className="font-italic">{value}</p>
                    <p className="text-right mb-0">{author}</p>
                </div>
            );
        case "lead":
            return <p className="my-2 bg-secondary p-3 border-left border-md">{value}</p>;
        case "gallery":
            return <img src={data.mainThumbnail} alt=""/>;
        case "table":
            const {columns, rows} = data.data;
            return (
                <div className="my-2 border-top bg-secondary border-md font-family-roboto">
                    <table className="table table-borderless table-sm mb-0">
                        <thead>
                        <tr className="bg-white">
                            {columns.map((column, index) =>
                                <th key={index}>{column}</th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, index) =>
                            <tr key={index}>
                                {row.map((r, index) =>
                                    <td key={index}>{r}</td>
                                )}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            );
        default:
            return <p>{value}</p>;
    }
}

export default function Content({ content }) {
    if (!content) return;

    return content.map((data, index) =>
        <ContentGenerator data={data} key={index}/>
    )
}