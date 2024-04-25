import { useDisplay, useTheme } from 'vuetify';
import { useLocalStorage } from '@vueuse/core';

export const useSettingStore = defineStore('setting', () => {
  const { xs } = useDisplay();
  const t = useTheme();

  const headerHeight = computed(() => (xs.value ? 48 : 56));
  const navigation = ref(document.body.clientWidth > 1264);
  const permanentNavigation = useLocalStorage('permanentNavigation', true);
  const theme = useLocalStorage('theme', 'indigo');
  const themeDark = useLocalStorage('themeDark', false);
  const setting = useLocalStorage('setting', false);
  const multipleTabs = useLocalStorage('multipleTabs', true);

  watch(
    () => [theme.value, themeDark.value],
    ([theme, themeDark]) => {
      setTimeout(() => {
        t.global.name.value = `${theme}${themeDark ? 'DarkTheme' : 'LightTheme'}`;
      });
    },
    { immediate: true },
  );

  function setAppTheme(theme) {
    theme.value = theme;
  }

  function toggleAppThemeDark() {
    themeDark.value = !themeDark.value;
  }

  function toggleAppNavigation() {
    navigation.value = !navigation.value;
  }

  function toggleAppPermanentNavigation() {
    permanentNavigation.value = !permanentNavigation.value;
  }

  function toggleAppSetting() {
    setting.value = !setting.value;
  }

  function toggleAppMultipleTabs() {
    multipleTabs.value = !multipleTabs.value;
  }

  return {
    headerHeight,
    navigation,
    permanentNavigation,
    theme,
    themeDark,
    setting,
    multipleTabs,
    setAppTheme,
    toggleAppThemeDark,
    toggleAppNavigation,
    toggleAppPermanentNavigation,
    toggleAppSetting,
    toggleAppMultipleTabs,
  };
});
