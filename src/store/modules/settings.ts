import { useDisplay, useTheme } from 'vuetify';
import { useLocalStorage } from '@vueuse/core';

export const useSettingStore = defineStore('setting', () => {
  const { xs } = useDisplay();
  const theme = useTheme();

  const appHeaderHeight = computed(() => (xs.value ? 48 : 56));
  const appNavigation = ref(document.body.clientWidth > 1264);
  const appPermanentNavigation = useLocalStorage(
    'appPermanentNavigation',
    true,
  );
  const appTheme = useLocalStorage('appTheme', 'indigo');
  const appThemeDark = useLocalStorage('appThemeDark', false);
  const appSetting = useLocalStorage('appSetting', false);
  const appMultipleTabs = useLocalStorage('appMultipleTabs', true);

  watch(
    () => [appTheme.value, appThemeDark.value],
    ([appTheme, appThemeDark]) => {
      setTimeout(() => {
        theme.global.name.value = `${appTheme}${appThemeDark ? 'DarkTheme' : 'LightTheme'}`;
      });
    },
    { immediate: true },
  );

  function setAppTheme(theme) {
    appTheme.value = theme;
  }

  function toggleAppThemeDark() {
    appThemeDark.value = !appThemeDark.value;
  }

  function toggleAppNavigation() {
    appNavigation.value = !appNavigation.value;
  }

  function toggleAppPermanentNavigation() {
    appPermanentNavigation.value = !appPermanentNavigation.value;
  }

  function toggleAppSetting() {
    appSetting.value = !appSetting.value;
  }

  function toggleAppMultipleTabs() {
    appMultipleTabs.value = !appMultipleTabs.value;
  }

  return {
    appHeaderHeight,
    appNavigation,
    appPermanentNavigation,
    appTheme,
    appThemeDark,
    appSetting,
    appMultipleTabs,
    setAppTheme,
    toggleAppThemeDark,
    toggleAppNavigation,
    toggleAppPermanentNavigation,
    toggleAppSetting,
    toggleAppMultipleTabs,
  };
});
