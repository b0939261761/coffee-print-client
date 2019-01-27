<template>
<div class='select-shop'>
  <form
    class='select-shop__body'
    @submit.prevent='onSubmit'
  >
    <InputText
      v-model='shopCode'
      class = 'select-shop__shop-code'
      type='text'
      placeholder='XXXXX'
      :label='$t("shopCode")'
    />

    <Btn
      :disabled='!shopCode'
      :label='$t("next")'
    />
  </form>

  <footer
    v-if = '$store.state.shop.code'
    class='select-shop__footer'
  >
    <Btn
      :label = '$t("back")'
      @click = '$router.push({name: "selectPicture", params: {code: $store.state.shop.code}})'
    />
  </footer>
</div>
</template>

<script>
import InputText from '@/components/InputText.vue';
import Btn from '@/components/Btn.vue';

export default {
  name: 'SelectShop',
  components: {
    InputText,
    Btn
  },
  data: () => ({
    shopCode: ''
  }),
  methods: {
    onSubmit() {
      if (!this.shopCode) return;
      this.$store.dispatch('shop/getShop', { code: this.shopCode });
      this.$router.push({ name: 'selectPicture', params: { code: this.shopCode } });
    }
  }
};
</script>

<style scoped>
.select-shop {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.select-shop__body {
  position: relative;
  width: 31.25rem;
  max-width: calc(100% - .625rem);
  margin: auto;
  padding: 2.9375rem 1.25rem 2rem;
}

.select-shop__body::before {
  content: '';
  position: absolute;
  top: .3125rem;
  right: .3125rem;
  bottom: .3125rem;
  left: .3125rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .25rem;
}

.select-shop__shop-code {
  width: 250px;
}

.select-shop__footer {
  padding-top: .9375rem;
  background-color: rgba(0, 0, 0, .6);
  border-radius: .25rem .25rem 0 0;
}
</style>
