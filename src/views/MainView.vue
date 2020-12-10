<template>
  <div class="container">
    <AppHeader :title="title" />
    <aside class="panel">
      <SearchBox v-model="keyword" />
      <CountryCard :country="selected" />
    </aside>
    <main class="content">
      <section>
        <error-view v-if="errored" />
        <AppLoader v-else-if="loading" />
        <div v-else class="wrapper">
          <CountryRegion v-for="region in regions" :name="region" :key="region">
            <template v-slot:countries>
              <CountryItem
                v-for="country in info[region]"
                v-model="selected"
                :country="country"
                :key="country.name"
              />
            </template>
          </CountryRegion>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import AppHeader from "../components/AppHeader.vue";
import AppLoader from "@/components/AppLoader.vue";
import CountryCard from "@/components/CountryCard.vue";
import CountryItem from "@/components/CountryItem.vue";
import CountryRegion from "../components/CountryRegion.vue";
import ErrorView from "./ErrorView.vue";
import SearchBox from "@/components/SearchBox.vue";

export default {
  name: "Home",
  components: {
    CountryCard,
    CountryItem,
    SearchBox,
    AppLoader,
    ErrorView,
    CountryRegion,
    AppHeader
  },
  computed: {
    ...mapState("countries", ["countries", "searchTerm"]),
    ...mapGetters("countries", {
      info: "groupCountries",
      regions: "regionsList"
    }),
    keyword: {
      get() {
        return this.searchTerm;
      },
      set(value) {
        this.search(value);
      }
    }
  },
  data() {
    return {
      title: "Countries list",
      selected: null,
      loading: true,
      errored: false
    };
  },
  async mounted() {
    await this.loadCountries();
    this.getLocalData();
  },
  methods: {
    ...mapActions("countries", ["getCountries", "search", "getLocalData"]),
    async loadCountries() {
      this.loading = true;
      await this.getCountries();
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
