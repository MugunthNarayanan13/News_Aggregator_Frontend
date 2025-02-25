console.log("Loaded API Key:", process.env.NEXT_PUBLIC_API_KEY);

const apiKey = process.env.NEXT_PUBLIC_API_KEY
export const baseURL = `https://newsdata.io/api/1/latest?apikey=${apiKey}&removeduplicate=1`
export const sourceURL = `https://newsdata.io/api/1/sources?apikey=${apiKey}`


const addKeyWordSearchURL = (url: string, keyword: string)=>{
  return url+`&q="${keyword}"`;
}

// the country should be the country code (2 letter)
const addCountryWiseURL = (url: string, countries: string[]) =>{
  url = url+`&country=`;
  countries.forEach((country)=>{
    url = url + `${country},`
  })
  return url.slice(0,url.length);
}

const addExcludeKeyWordURL = (url: string, keyword: string) =>{
  return url+`&excludecategory=${keyword}`;
}

const addLocationURL = (url: string, keyword: string) =>{
  return url+`&excludecategory="${keyword}"`;
}

const addCategoryWiseURL = (url: string, categories: string[]) =>{
  url = url+`&category=`;
  categories.forEach((category)=>{
    url = url + `${category},`
  })
  return url.slice(0,url.length);
}

// the language should be the language code
const addLanguageWiseURL = (url: string, langs: string[]) =>{
  url = url+`&language=`;
  langs.forEach((lang)=>{
    url = url + `${lang},`;
  })
  return url.slice(0,url.length);
}

const addTimeframeURL = (url: string, timeframe: string) => {
  url = url+"&timeframe="+timeframe;
  return url;
}

const addPublisherWiseURL = (url: string, domains: string[]) =>{
  url = url+`&domain=`;
  domains.forEach((domain)=>{
    url = url + `${domain},`;
  })
  return url.slice(0,url.length);
}

const addRegionWiseURL = (url: string, regions: string[]) => {
  url = url+"&region=";
  regions.forEach((region)=>{
    url = url+`${region},`;
  })
  return url.slice(0,url.length);
}

const allPublishersURL = (countries: string[], langs=['en'], categories=[]) =>{
  let url = sourceURL+`&country=`;
  countries.forEach((country)=>{
    url = url + country +",";
  })
  url = url.slice(0, url.length-1);
  url+="&language=";
  langs.forEach((lang)=>{
    url = url + `${lang},`;
  })
  url = url.slice(0, url.length-1);
  if(categories.length>0){
    url+="&category=";
    categories.forEach((category)=>{
      url = url + `${category},`
    })
    url = url.slice(0, url.length-1);
  }
  return url;
}

export {
  addKeyWordSearchURL,
  addCountryWiseURL,
  addCategoryWiseURL,
  addLanguageWiseURL,
  addPublisherWiseURL,
  addRegionWiseURL,
  allPublishersURL,
  addTimeframeURL,
  addExcludeKeyWordURL
}