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
      class="flex-grow-1 d-flex flex-column pa-2 pr-3"
      :style="{ 'height': '100%' }"
    >
      <h4 class="mb-1 font-strong">{{ title }}</h4>
      <div class="d-flex justify-space-between align-center">
        <span>{{ texto1 }}</span>
        <h4 class="font-strong">{{ valor }}</h4>
      </div>
      <div class="d-flex justify-space-between align-center">
        <span>{{ texto2 }}</span>
        <h4 class="font-strong">{{ valor2 }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardInfoDuploValor",

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
      type: String,
      default: '0',
    },
    valor2: {
      type: String,
      default: '0',
    },
    icon: {
      type: String,
      default: undefined,
    },
    texto1: {
      type: String,
      default: undefined
    },
    texto2: {
      type: String,
      default: undefined
    }
  },
};
</script>

<style lang="sass">
.card-info
  position: relative
  height: 110px

.card-info, .card-info h2
  color: #f2f2f2

.widget-stat-icon
  width: 60px
  height: 100%
  min-height: 120px
  text-align: center
  font-size: 30px
  background-color: rgba(0, 0, 0, 0.1)
  display: flex
  align-items: center
  justify-content: center
</style>