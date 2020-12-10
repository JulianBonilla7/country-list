import * as axios from "axios";

const saveLocalKey = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalKey = function(key) {
  return JSON.parse(localStorage.getItem(key));
};

const removeLocalKey = function(key) {
  return localStorage.removeItem(key);
};

const getCountries = async function() {
  try {
    const response = await axios.get("https://restcountries.eu/rest/v2/all");
    return parseList(response);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== "object") {
    list = [];
  }
  return list;
};

export const dataService = {
  getCountries,
  getLocalKey,
  saveLocalKey,
  removeLocalKey
};
