<template>
  <div class="search" role="search">
    <label class="search__label" for="search">Search for a country</label>
    <input
      class="search__box"
      :value="value"
      type="search"
      name="search"
      id="search"
      placeholder="Type in a country name"
      @input="handleInput"
    />
    <font-awesome-icon icon="search" />
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    handleInput($event) {
      this.$emit("input", $event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding: 1em;
  &__label {
    display: block;
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }
  &__box {
    width: 100%;
    display: block;
  }
}
</style>
