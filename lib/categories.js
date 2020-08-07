import fetch from "node-fetch";

const API_URL = 'https://api.federation.website/api/v1/customers';

const checkStatus = async (url) => {
    return await fetch(url).then(async res => {
        if (res.status === 200) {
            const data = await res.json();
            return {
                status: 200,
                data
            };
        } else {
            return {
                status: 404
            }
        }
    });
};

export async function getAllCategories() {
    const url = `${API_URL}/headings`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
}

export async function getPageData(page) {
    const url = `${API_URL}/page/${encodeURIComponent(page)}`;
    return checkStatus(url);
}

export async function getPostData({slug, is_published = 0}) {
    const url = `${API_URL}/article/${encodeURIComponent(slug)}?is_published=${is_published}`;
    return checkStatus(url);
}

export async function getCategoryData(slug) {
    const url = `${API_URL}/headings/${encodeURIComponent(slug)}`;
    return checkStatus(url);
}

export async function getSubcategoryData({slug, page = 1, cat, tag}) {
    let url =
        `
            ${API_URL}/subcategory/${encodeURIComponent(slug)}?page=${page}
            ${cat ? `&cat[]=${Array.isArray(cat) ? cat.join("&cat[]=") : cat}` : ``}
            ${tag ? `&tag[]=${Array.isArray(tag) ? tag.join("&tag[]=") : tag}` : ``}
        `;
    url = url.replace("cat[]=0", "archive_heading=1");

    return checkStatus(url);
}

export async function getSearchData({q, page = 1, cat, tag}) {
    let url =
        `
            ${API_URL}/search?q=
            ${encodeURIComponent(q)}&page=${page}
            ${cat ? `&cat[]=${Array.isArray(cat) ? cat.join("&cat[]=") : cat}` : ``}
            ${tag ? `&tag[]=${Array.isArray(tag) ? tag.join("&tag[]=") : tag}` : ``}
        `;
    url = url.replace("cat[]=0", "archive_heading=1");

    const result = await fetch(url);
    const json = await result.json();

    return json;
}

export async function countPostView(id) {
    const url = `${API_URL}/article/counter/${id}`;
    await fetch(url, {method: "POST"});
}

export async function submitFeedback({client, email, message}) {
    const url = `${API_URL}/feedback?client=${client}&email=${email}&message=${message}`;
    const result = await fetch(url, {method: "POST"});

    const status = await result.status;

    let json = {};
    if (status !== 200) json = await result.json();

    return json;
}

export async function getExchangeRates() {
    const url = `${API_URL}/exchange/rates`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
}

export async function getSettings() {
    const url = `${API_URL}/settings`;
    const result = await fetch(url);
    const json = await result.json();

    return json;
}