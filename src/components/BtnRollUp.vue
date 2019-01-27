<template>
<Btn
  :label = '$t("rollUp")'
  @click = '$emit("toggle")'
  size = 'small'
  colorTheme = 'dark'
>
  <span :class = '["icon-rollup", { "icon-rollup--down": !isUp }]'>
    &nbsp;
  </span>
</Btn>
</template>


<script>
import Btn from '@/components/Btn.vue';

export default {
  name: 'BtnRollUp',
  components: {
    Btn
  },
  props: {
    isUp: {
      type: Boolean,
      default: true
    }
  }
};
</script>


<style scoped>
.icon-rollup {
  position: relative;
  display: inline-block;
  width: 1rem;
  margin-left: .5rem;
  pointer-events: none;
}

.icon-rollup::before {
  content: '';
  position: absolute;
  width: .75rem;
  height: .75rem;
  border: 0 solid #fff;
  border-width: 0 0 .1875rem .1875rem;
  transform: rotate(-45deg);
  transition: transform .5s ease-out;
}

.icon-rollup--down::before {
  transform: translateY(.25rem) rotate(135deg);
}

</style>
