import React from "react";

function ContentGenerator({ data }) {
    const {type, value, author} = data;
    switch (type) {
        case "heading":
            return (
                <div className="pl-xl-6">
                    <h4 className="my-3">{value}</h4>
                </div>
            );
        case "paragraph":
            return (
                <div className="pl-xl-7">
                    <p className="my-3 pl-lg-5">{value}</p>
                </div>
            );
        case "quote":
            return (
                <div className="pl-xl-6 my-3">
                    <div className="bg-secondary p-3 pl-5">
                        <p className="font-italic">{value}</p>
                        <p className="text-right mb-0">{author}</p>
                    </div>
                </div>
            );
        case "lead":
            return (
                <div className="pl-xl-6 my-3">
                    <p className="bg-secondary p-3 border-left border-md">{value}</p>
                </div>
            );
        case "gallery":
            return (
                <div className="position-absolute" style={{left: -70}}>
                    <img src={data.mainThumbnail} alt=""/>
                </div>
            );
        case "table":
            const {columns, rows} = data.data;
            return (
                <div className="my-3 border-top bg-secondary border-md font-family-roboto">
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