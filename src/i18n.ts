import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

const savedLang = localStorage.getItem("user-preferences") || "es";
const parsedLang = JSON.parse(savedLang);
const lang = parsedLang.state.language;
i18n.use(initReactI18next).init({
  fallbackLng: lang,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  lng: lang,
});

export default i18n;
