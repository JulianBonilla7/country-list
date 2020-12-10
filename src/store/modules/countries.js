import { dataService } from "@/services/data.service.js";
import { utils } from "@/services/utils.service.js";

export default {
  namespaced: true,
  state: {
    countries: null,
    favorites: [],
    selected: null,
    searchTerm: ""
  },
  getters: {
    getCountryByKey: state => (key, value) => {
      return state.countries.find(country => country[key] === value);
    },
    filteredCountries: state => {
      const { countries, searchTerm } = state;
      if (!searchTerm) {
        return countries;
      }
      const keyword = searchTerm.toLowerCase();
      return countries.filter(
        country =>
          country.name.toLowerCase().includes(keyword) ||
          country.region.toLowerCase().includes(keyword) ||
          (country.cioc && country.cioc.toLowerCase().includes(keyword))
      );
    },
    groupCountries: (state, getters) => {
      const countries = getters.filteredCountries;
      return countries.reduce((regions, country) => {
        if (!regions[country.region]) {
          regions[country.region] = [country];
        } else {
          regions[country.region].push(country);
        }
        return regions;
      }, {});
    },
    regionsList: (state, getters) => {
      return Object.keys(getters.groupCountries);
    },
    isFavorite: state => code => {
      return state.favorites.includes(code);
    }
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries.map(country => {
        country.id = utils.generateID();
        country.favorite = false;
        return country;
      });
    },
    setFilterSearch(state, keyword) {
      state.searchTerm = keyword;
    },
    getFavorites: (state, favorites) => {
      state.favorites = favorites;
    },
    addFavorite: (state, code) => {
      state.favorites.push(code);
      dataService.saveLocalKey("favorites", state.favorites);
    },
    removeFavorite: (state, code) => {
      state.favorites = [...state.favorites.filter(fav => fav !== code)];
      dataService.saveLocalKey("favorites", state.favorites);
    },
    clearFavorites: state => {
      state.favorites = [];
      dataService.removeLocalKey("favorites");
    }
  },
  actions: {
    async getCountries({ commit }) {
      const countries = await dataService.getCountries();
      commit("setCountries", countries);
    },
    getLocalData({ commit }) {
      commit("getFavorites", dataService.getLocalKey("favorites") || []);
    },
    search({ commit }, keyword) {
      commit("setFilterSearch", keyword);
    },
    updateFavorites({ commit, getters }, code) {
      if (getters.isFavorite(code)) {
        commit("removeFavorite", code);
      } else {
        commit("addFavorite", code);
      }
    }
  }
};
