import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import kr from "./locales/kr.json";
import cn from "./locales/cn.json";
import jp from "./locales/jp.json";
import vn from "./locales/vn.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: import.meta.env.NODE_ENV === "development",
    resources: {
      en: { translation: en },
      kr: { translation: kr },
      cn: { translation: cn },
      jp: { translation: jp },
      vn: { translation: vn },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
