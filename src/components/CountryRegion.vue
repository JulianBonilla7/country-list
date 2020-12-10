<template>
  <div class="region">
    <fieldset>
      <legend>{{ name || "N/A" }}</legend>
      <div class="countries">
        <slot name="countries"></slot>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped></style>
