<template>
  <div class="card-info-dense d-flex align-center" :style="{'background':color, 'width':'100%'}">
    <div class="flex-grow-1 pa-2 py-1 d-flex flex-column">
      <span class="card-info__title">{{ title }}</span>
      <div class="card-info__values">
        <span class="card-info__amount">{{ amount }}</span>
        <span class="card-info__count">({{count}})</span>
      </div>
    </div>
    <div class="widget-stat-icon">
      <v-icon large color="#f2f2f2">mdi {{icon}}</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#f2f2f2",
    },
    title: {
      type: String,
      default: undefined,
    },
    amount: {
      type: Number,
      default: 0,
    },
    count: {
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

<style lang="scss" scoped>
.card-info-dense {
  position: relative;
}

.card-info__title {
  font-size: 10px;
  list-style: 12px;
  font-weight: 500;
  color: #f2f2f2;
  text-transform: uppercase;
}

.card-info__values {
  display: flex;
  align-items: center;
}

.card-info__amount {
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  color: #f2f2f2 !important;
}

.card-info__count {
  font-size: 14px;
  color: #f2f2f2;
  margin-left: 5px;
}

.widget-stat-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 100%;
  text-align: center;
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>