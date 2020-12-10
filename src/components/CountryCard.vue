<template>
  <article class="card">
    <img
      v-if="country"
      class="card__img"
      :src="country.flag"
      :alt="`${country.name} flag`"
    />
    <section class="card__content">
      <div v-if="country">
        <h2 class="card__header">
          {{ country.name }}
          <button class="card__button" @click="star" aria-label="favorite">
            <font-awesome-icon :icon="icon" />
          </button>
        </h2>
        <dl>
          <dt>Region</dt>
          <dd>{{ country.region || "N/A" }}</dd>
          <dt>Population</dt>
          <dd>{{ country.population }}</dd>
          <dt>Capital</dt>
          <dd>{{ country.capital || "N/A" }}</dd>
          <dt>Currency</dt>
          <dd v-for="currency in country.currencies" :key="currency.code">
            {{ currency.name }}
            <span v-if="currency.symbol">({{ currency.symbol }})</span>
          </dd>
          <dt>Language</dt>
          <dd v-for="language in country.languages" :key="language.name">
            {{ language.name }}
          </dd>
          <dt>Border countries</dt>
          <dd>{{ borders | list }}</dd>
        </dl>
      </div>
      <div v-else class="text-center">
        <h2>Select a country <br />to see more details.</h2>
      </div>
    </section>
  </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    country: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters("countries", ["getCountryByKey", "isFavorite"]),
    borders() {
      return this.country.borders.map(code => {
        const result = this.getCountryByKey("alpha3Code", code);
        return result && result.name;
      });
    },
    favorite() {
      return this.isFavorite(this.country.alpha3Code);
    },
    icon() {
      const params = this.favorite ? ["fas"] : ["far"];
      params.push("star");
      return params;
    }
  },
  filters: {
    list: function(value) {
      return Array.isArray(value) ? value.join(", ") : value;
    }
  },
  methods: {
    ...mapActions("countries", ["updateFavorites"]),
    star() {
      this.updateFavorites(this.country.alpha3Code);
    }
  }
};
</script>

<style lang="scss" scoped>
$color-header: #0d0d0d;
$color-text: #404040;

.country-detail {
  padding: 1em;
}

.card {
  background-color: #fff;
  overflow: hidden;
  // border: 1px solid #c3c3c3;
  box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
  // cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: translateY(-0.5%);
    box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.2);
  }
  &__img {
    display: block;
    width: 100%;
    object-fit: cover;
  }

  &__content {
    padding: 1.5em;
    background-color: #f5f5f5;
  }

  &__header {
    font-size: 2em;
    font-weight: 500;
    letter-spacing: 0.1rem;
    color: $color-header;
    margin: 0;
  }
  &__button {
    border-radius: 50%;
    cursor: pointer;
    background: none;
    border: none;
    color: darkgoldenrod;
  }
  dt {
    font-weight: bold;
  }
}
</style>
