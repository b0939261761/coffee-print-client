<template>
  <nav class = 'select-language'>
    <Btn
      class = 'select-language__item'
      @blur = 'onBlur'
      @click = 'onVisibleSelect'
    >
      <template #icon>
        <component :is = 'activeLocale' />
      </template>
    </Btn>

    <ul
      :class = '[
        "select-language__select-locales",
        { "select-language__select-locales--visible": visibleSelect }
      ]'
    >
      <li
        v-for = '(value, key) in selectLocales'
        :key = 'key'
      >
        <Btn
          :data-locale = 'key'
          @click = 'onChangeLang'
        >
          <template #icon>
            <component :is = 'value' />
          </template>
        </Btn>
      </li>
    </ul>
  </nav>
</template>

<script>
import Btn from '@/components/Base/Btn.vue';
import IconFlagUs from '@/assets/flag-us.svg';
import IconFlagRu from '@/assets/flag-ru.svg';
import IconFlagUk from '@/assets/flag-uk.svg';

export default {
  name: 'SelectLanguage',
  components: {
    Btn,
    IconFlagUs,
    IconFlagRu,
    IconFlagUk
  },
  data: () => ({
    visibleSelect: false,
    locales: {
      en: IconFlagUs,
      ru: IconFlagRu,
      uk: IconFlagUk
    }
  }),
  computed: {
    locale() {
      return this.$store.state.app.locale;
    },
    activeLocale() {
      return this.locales[this.locale];
    },
    selectLocales() {
      const { [this.locale]: active, ...other } = this.locales;
      return other;
    }
  },
  methods: {
    onVisibleSelect() {
      this.visibleSelect = !this.visibleSelect;
    },
    onBlur() {
      this.visibleSelect = false;
    },
    onChangeLang(event) {
      const { locale } = event.currentTarget.dataset;
      this.$i18n.locale = locale;
      this.$store.dispatch('app/setLocale', locale);
      this.visibleSelect = false;
    }
  }
};
</script>

<style scoped>
.select-language {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 6rem;
}

.select-language__select-locales {
  position: relative;
  z-index: 1;
  height: 0;
  margin: -2rem 0 0;
  padding: 0 .5rem;
  overflow: hidden;
  list-style: none;
  background-color: rgba(255, 255, 255, .8);
  transition:
    height .2s ease-in,
    padding-top .2s ease-in;
}

.select-language__select-locales--visible {
  height: 13rem;
  padding-top: 1rem;
}
</style>
