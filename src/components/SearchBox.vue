<template>
  <div class="search" role="search">
    <label class="search__label" for="search">Search for a country</label>
    <div class="search__control">
      <span class="search__icon" aria-label="Search field">
        <font-awesome-icon icon="search" fixed-width />
      </span>
      <input
        class="search__box"
        :value="value"
        type="search"
        name="search"
        id="search"
        placeholder="Type in a country name"
        @input="handleInput"
      />
    </div>
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
  &__control {
    position: relative;
    display: flex;
    align-items: center;
  }
  &__icon {
    position: absolute;
    left: 0;
    margin-left: 0.75em;
  }
  &__label {
    display: block;
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }
  &__box {
    display: block;

    width: 100%;
    padding: 0.75em 3em;

    background-color: transparent;
    transition: transform 250ms ease-in-out;

    color: #575756;
    background-color: transparent;
    border-radius: 50px;
    border: 1px solid #575756;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    letter-spacing: 1.5px;

    &::placeholder {
      color: color(#575756 a(0.8));
    }

    &:hover,
    &:focus {
      padding: 0.75em 2.5em;
      outline: 0;
      border: 1px solid transparent;
      border-bottom: 1px solid #575756;
      border-radius: 0;
      background-position: 100% center;
    }
  }
}
</style>
