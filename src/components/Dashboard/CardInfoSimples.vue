<template>
  <div
    class="card-info d-flex align-center"
    :style="{ 'background': color, 'width': '100%' }"
  >
    <div class="widget-stat-icon">
      <v-icon
        large
        color="#f2f2f2"
      >mdi {{ icon }}</v-icon>
    </div>
    <div
      class="flex-grow-1 d-flex flex-column pa-2 pr-3 justify-content-start"
      :style="{ 'height': '100%' }"
    >
      <h4 class="mb-1 font-strong">{{ title }}</h4>
      <h2 class="font-strong text-center">{{ valor }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardInfoSimples",

  props: {
    color: {
      type: String,
      default: "#f2f2f2",
    },
    title: {
      type: String,
      default: undefined,
    },
    valor: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="sass">
.card-info
  position: relative
  height: 80px

.card-info, .card-info h2
  color: #f2f2f2

.widget-stat-icon
  width: 60px
  height: 100%
  text-align: center
  font-size: 30px
  background-color: rgba(0, 0, 0, 0.1)
  display: flex
  align-items: center
  justify-content: center
</style>