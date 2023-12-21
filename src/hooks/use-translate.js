import { useState, useLayoutEffect } from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { setLocale, getLocale, subscribe, translate } = useServices().i18n;

  const [lang, setLang] = useState(getLocale());

  const t = (text, plural) => translate(lang, text, plural);

  const switchLang = (code) => {
    setLang(code);
    setLocale(code);
  };

  useLayoutEffect(() => {
    const unsubscribe = subscribe((newLang) => {
      setLang(newLang);
    });
    return () => {
      unsubscribe();
    };
  }, [setLang]);

  return { lang, switchLang, t };
}
