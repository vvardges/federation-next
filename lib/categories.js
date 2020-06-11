import fetch from "node-fetch";

export async function getAllCategories() {
    const url = 'https://api.federation.website/api/v1/customers/headings';
    const result = await fetch(url);
    const json = await result.json();

    return json;
}

export async function getPageData(page) {
    const url = `https://api.federation.website/api/v1/customers/page/${page}`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
}