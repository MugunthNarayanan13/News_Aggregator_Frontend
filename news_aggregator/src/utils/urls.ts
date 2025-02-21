const apiKey = process.env.NEXT_PUBLIC_API_KEY
const baseURL = `https://newsdata.io/api/1/latest?apikey=${apiKey}&removeduplicate=1`
const sourceURL = `https://newsdata.io/api/1/sources?apikey=${apiKey}`

const keyWordSearchURL = (keyword: string)=>{
  return baseURL+`&q="${keyword}"`;
}

// the country should be the country code (2 letter)
const countryWiseURL = (countries: string[]) =>{
  let url = baseURL+`&country=`;
  countries.forEach((country)=>{
    url = url + `${country},`
  })
  return url.slice(0,url.length);
}

const categoryWiseURL = (categories: string[]) =>{
  let url = baseURL+`&category=`;
  categories.forEach((category)=>{
    url = url + `${category},`
  })
  return url.slice(0,url.length);
}

// the language should be the language code
const languageWiseURL = (langs: string[]) =>{
  let url = baseURL+`&language=`;
  langs.forEach((lang)=>{
    url = url + `${lang},`;
  })
  return url.slice(0,url.length);
}

// the country should be the country code (2 letter)
const publisherWiseURL = (countries: string[]) =>{
  let url = baseURL+`&country=`;
  countries.forEach((country)=>{
    url = url + `${country},`;
  })
  return url.slice(0,url.length);
}

const allPublishersURL = (countries: string[], langs=['en'], categories=[]) =>{
  let url = sourceURL+`&country=`;
  countries.forEach((country)=>{
    url = url + country +",";
  })
  url = url.slice(0, url.length);
  url+="&language=";
  langs.forEach((lang)=>{
    url = url + `${lang},`;
  })
  url = url.slice(0, url.length);
  if(categories.length>0){
    url+="&category=";
    categories.forEach((category)=>{
      url = url + `${category},`
    })
    url = url.slice(0, url.length);
  }
  return url;
}

export {
  keyWordSearchURL,
  countryWiseURL,
  categoryWiseURL,
  languageWiseURL,
  publisherWiseURL,
  allPublishersURL
}