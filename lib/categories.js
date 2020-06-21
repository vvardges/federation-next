import fetch from "node-fetch";

const API_URL = 'https://api.federation.website/api/v1/customers';

export async function getAllCategories() {
    const url = `${API_URL}/headings`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
}

export async function getPageData(page) {
    const url = `${API_URL}/page/${page}`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
}

export async function getPostData(slug) {
    const url = `${API_URL}/article/${slug}`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
}

export async function getCategoryData(slug) {
    const url = `${API_URL}/headings/${slug}`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
}

export async function getSubcategoryData({slug, page = 1, cat}) {
    const url = `${API_URL}/subcategory/${slug}?page=${page}&cat[]=${Array.isArray(cat) ? cat.join("&cat[]=") : cat}`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
}

export async function countPostView(id) {
    const url = `${API_URL}/article/counter/${id}`;
    await fetch(url, {method: "POST"});
}