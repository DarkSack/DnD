import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

let lang = "es"; // Valor por defecto

try {
  const savedLang = localStorage.getItem("user-preferences");
  if (savedLang) {
    const parsedLang = JSON.parse(savedLang);
    if (parsedLang?.state?.language) {
      lang = parsedLang.state.language;
    }
  }
} catch (error) {
  console.warn("Idioma no pudo ser leído del localStorage:", error);
}

i18n.use(initReactI18next).init({
  fallbackLng: "es", // Fallback siempre a español si algo falla
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
