import fetch from "node-fetch";

export async function getAllCategories() {
    const urlCats = 'https://api.federation.website/api/v1/customers/headings';
    const resCats = await fetch(urlCats);
    const jsonCats = await resCats.json();

    return jsonCats;
}