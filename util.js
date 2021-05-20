const API_END_POINT = "https://api.unsplash.com/";
const fetch = require("node-fetch");
const axios = require("axios");

const nodeFetchRetrieveImageFromAPI = async (destination, location) => {
  console.log(process.env.UNSPLASH_API);
  let photoURL = `${destination}, ${location}`;
  let UNSPLASH_API = `${API_END_POINT}/search/photos?page=1&query=${photoURL}&client_id=${process.env.UNSPLASH_KEY}`;
  let randomImageData = "";
  try {
    const fetchingData = await fetch(UNSPLASH_API);
    const response = await fetchingData.json();
    randomImageData =
      response.results[Math.floor(Math.random() * response.results.length)].urls
        .regular;
  } catch (error) {
    randomImageData = `https://images.unsplash.com/photo-1621472469898-549961cdda07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=808&q=80`;
  }
  return randomImageData;
};

const axiosRetrieveImageFromAPI = async (destination, location) => {
  let photoURL = `${destination}, ${location}`;
  let UNSPLASH_API = `${API_END_POINT}/search/photos?page=1&query=${photoURL}&client_id=${process.env.UNSPLASH_KEY}`;
  try {
    const fetchingDataAxios = await axios.get(UNSPLASH_API);
    const dataAxios = await fetchingDataAxios.data.results[
      Math.floor(Math.random() * fetchingDataAxios.data.results.length)
    ].urls.regular;
    console.log(dataAxios);
    return dataAxios;
  } catch (error) {
    return `https://images.unsplash.com/photo-1621472469898-549961cdda07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=808&q=80`;
  }
};

module.exports = { nodeFetchRetrieveImageFromAPI, axiosRetrieveImageFromAPI };
