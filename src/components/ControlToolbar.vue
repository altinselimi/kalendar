<template>
  <div class="ct-wrapper">
    <div class="date_info">
      <span class="month">{{month}}</span>
      <span class="year">{{year}}</span>
    </div>
    <div style="margin-left: auto;">
      <div>
        <label for="dark">Dark</label>
        <input name="dark" v-model="options.dark" type="checkbox" @change="updateOptions()">
      </div>
      <div>
        <label for="cell-size">Cell Size</label>
        <input type="number" name="cell-size" v-model.number="options.cell_height" @blur="updateOptions()">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['calendarOptions'],
  data: () => ({
    month: 'April',
    year: 2018,
    options: {
      dark: false,
      cell_height: 15,
    },
  }),
  methods: {
    updateOptions() {
      this.$emit('update:calendarOptions', { ...this.options });
    },
  },
}

</script>
<style lang="scss">
.ct-wrapper {
  display: flex;
}

.date_info {
  display: flex;
  align-items: center;
  font-size: 2.3rem;
}

.month {
  font-weight: 400;
  margin-right: 10px;
}

.year {
  font-weight: 200;
}

</style>
