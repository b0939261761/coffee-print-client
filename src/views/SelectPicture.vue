<template>
  <div class='home'>
    <div class='coffee-text'>
      <div class='coffee-text__cell'>
        <span v-text='$t("shopCode")' />
        <span class='coffee-text__value'
              v-text='shopCode' />
      </div>
      <div class='coffee-text__cell'>
        <span v-text='$t("shopName")' />
        <span class='coffee-text__value'
              v-text='shopName'/>
      </div>
    </div>

    <div class='picture-selection'>
      <Btn :label='$t("addPicture")' />
    </div>
  </div>
</template>

<script>
import Btn from '@/components/Btn.vue';
import { mapState } from 'vuex';

export default {
  name: 'SelectPicture',
  components: {
    Btn
  },
  data: () => ({

  }),
  computed: mapState('shop', {
    shopCode: state => state.code,
    shopName: state => state.name
  })
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
  padding: 2.5rem 1.25rem;
  background-color: rgba(255, 255, 255, .8);
  border-radius: .25rem;
}
</style>
