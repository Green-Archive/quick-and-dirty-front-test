results
<template>
  <div class="results">
    <div class="results__wrapper" v-if="image">
      <div class="results__coordinates">
        <p class="results__coordinates-title">Results:</p>
        <p class="results__coordinates-value">Width: {{ coordinates.width }}</p>
        <p class="results__coordinates-value">
          Height: {{ coordinates.height }}
        </p>
        <p class="results__coordinates-value">Left: {{ coordinates.left }}</p>
        <p class="results__coordinates-value">Top: {{ coordinates.top }}</p>
      </div>
      <div class="results__preview">
        <img :src="image" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coordinates: {
      type: Object,
      default() {
        return {};
      },
    },
    image: {
      type: String,
    },
  },
};
</script>
