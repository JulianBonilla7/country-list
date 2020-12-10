import Vue from "vue";
import Vuex from "vuex";

import countriesModule from "./modules/countries";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    countries: countriesModule
  }
});
