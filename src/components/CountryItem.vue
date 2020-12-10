<template>
  <div class="country">
    <input
      type="radio"
      name="country"
      :value="value"
      :id="country.alpha3Code.toLowerCase()"
      @change="onChange"
    />
    <label :for="country.alpha3Code.toLowerCase()">
      <img :src="country.flag" :alt="`${country.name} flag`" />
      {{ country.name }}
      <font-awesome-icon
        v-if="isFavorite(country.alpha3Code)"
        fixed-width
        :icon="['fas', 'star']"
      />
    </label>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    country: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters("countries", ["isFavorite"]),
    value() {
      return this.country;
    }
  },
  methods: {
    onChange() {
      this.$emit("change", this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.country {
  label {
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    transition: border-color 0.3s;
    display: block;
    border-radius: 4px;
    padding: 4px;
    &:hover,
    &:focus {
      border-color: green;
      box-shadow: 2px 2px 4px 0px rgba(60, 60, 60, 0.45);
    }
  }
  input:checked + label {
    background: green;
    color: white;
  }
  img {
    width: 1em;
  }
}
</style>
