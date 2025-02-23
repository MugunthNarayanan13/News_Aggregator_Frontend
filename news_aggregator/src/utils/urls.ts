const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseURL = `https://newsdata.io/api/1/latest?apikey=${apiKey}&removeduplicate=1`;
const sourceURL = `https://newsdata.io/api/1/sources?apikey=${apiKey}`;

const keyWordSearchURL = (keyword: string) => {
    return baseURL + `&q="${keyword}"`;
};

const countryWiseURL = (countries: string[]) => {
    let url = baseURL + `&country=`;
    countries.forEach((country) => {
        url = url + `${country},`;
    });
    return url.slice(0, url.length);
};

const categoryWiseURL = (category: string) => {
    return baseURL + `&category=${category.toLowerCase()}`;
};

const languageWiseURL = (langs: string[]) => {
    let url = baseURL + `&language=`;
    langs.forEach((lang) => {
        url = url + `${lang},`;
    });
    return url.slice(0, url.length);
};

export {
    keyWordSearchURL,
    countryWiseURL,
    categoryWiseURL,
    languageWiseURL
};
