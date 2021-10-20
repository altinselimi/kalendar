<template>
  <div class="x-button">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#777777"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: "kalendar-x-button"
}
</script>

<style lang="scss">
.x-button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all .3s;
  border: 2px solid #fff;
  &:hover {
    transform: rotate(90deg);
  }
}
</style>