<template>
  <div class='home'>
    <form
      class='input-wrapper'
      @submit.prevent='onSubmit'
    >
      <InputText
        v-model='shopCode'
        type='text'
        placeholder='XXXXX'
        class='input-text'
        :label='$t("shopCode")'
      />
      <Btn
        :disabled='!shopCode'
        :label='$t("next")'
      />
    </form>
  </div>
</template>

<script>
import InputText from '@/components/InputText.vue';
import Btn from '@/components/Btn.vue';

export default {
  name: 'Shop',
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
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.coffee-text {
  display: flex;
  flex-direction: row;
  margin-top: 1.25rem;
  padding: 1.25rem;
  text-align: left;
  background-color: rgba(255, 255, 255, .8);
  border-radius: .25rem;
}

@media (max-width: 576px) {
  .coffee-text {
    flex-direction: column;
  }

  .coffee-text :first-child {
    margin-bottom: .5rem;
  }
}

.coffee-text__cell {
  min-width: 50%;
}

.coffee-text__value {
  font-weight: bold;
  font-size: 1.125rem;
}

.picture-selection {
  margin: auto;
  padding: 2.5rem 1.25rem;
  background-color: rgba(255, 255, 255, .8);
  border-radius: .25rem;
}

.input-wrapper {
  flex-shrink: 0; /* for IE 11 для бордера */
  align-self: center; /* for IE 11 */
  margin: auto;
  padding: .9375rem 1.25rem 0;
  background-color: rgba(255, 255, 255, .8);
  border-radius: .25rem;
}
</style>
