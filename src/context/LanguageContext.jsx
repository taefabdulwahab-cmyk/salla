import { createContext, useContext, useEffect, useState } from "react";
import ar from "../locales/ar";
import en from "../locales/en";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en",
  );

  const translationCache = new Map();

  useEffect(() => {
    localStorage.setItem("language", language);

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const translate = async (text) => {
    if (language === "en" || !text) {
      return text;
    }

    if (translationCache.has(text)) {
      return translationCache.get(text);
    }

    try {
      const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: "ar",
          format: "text",
        }),
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      const translatedText = data?.translatedText;

      if (!translatedText) {
        throw new Error("No translation returned");
      }

      translationCache.set(text, translatedText);

      return translatedText;
    } catch (error) {
      console.error("Translation error:", text, error);
      return text;
    }
  };

  const translations = language === "ar" ? ar : en;

  const t = (key) => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translate,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
