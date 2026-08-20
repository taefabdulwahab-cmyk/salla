import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import ar from "../locales/ar";
import en from "../locales/en";

const LanguageContext = createContext();

const TRANSLATION_URL = "https://translation-salla-api.onrender.com/translate";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en",
  );

  const translationCache = useRef(
    new Map(JSON.parse(localStorage.getItem("translationCache") || "[]")),
  );

  useEffect(() => {
    localStorage.setItem("language", language);

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const saveCache = useCallback(() => {
    localStorage.setItem(
      "translationCache",
      JSON.stringify([...translationCache.current]),
    );
  }, []);

  const translateBatch = useCallback(
    async (texts) => {
      if (language === "en") {
        return texts;
      }

      if (!texts?.length) {
        return [];
      }

      const uniqueTexts = [
        ...new Set(
          texts.filter(
            (text) => typeof text === "string" && text.trim().length > 0,
          ),
        ),
      ];

      const resultMap = new Map();

      const missingTexts = [];

      uniqueTexts.forEach((text) => {
        if (translationCache.current.has(text)) {
          resultMap.set(text, translationCache.current.get(text));
        } else {
          missingTexts.push(text);
        }
      });

      if (missingTexts.length === 0) {
        return texts.map((text) => resultMap.get(text) || text);
      }

      console.log("Texts that need translation:", missingTexts);

      try {
        const response = await fetch(TRANSLATION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: missingTexts,
            source: "en",
            target: "ar",
            format: "text",
          }),
        });

        if (!response.ok) {
          throw new Error(`Translation failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("Translation response:", data);

        if (!Array.isArray(data.translatedText)) {
          throw new Error("Invalid translation response");
        }

        data.translatedText.forEach((translatedText, index) => {
          const originalText = missingTexts[index];

          if (originalText && translatedText) {
            translationCache.current.set(originalText, translatedText);

            resultMap.set(originalText, translatedText);
          }
        });

        saveCache();
      } catch (error) {
        console.error("Translation request error:", error);

        missingTexts.forEach((text) => {
          resultMap.set(text, text);
        });
      }

      return texts.map((text) => resultMap.get(text) || text);
    },
    [language, saveCache],
  );

  const translate = useCallback(
    async (text) => {
      if (language === "en" || !text) {
        return text;
      }

      const result = await translateBatch([text]);

      return result[0] || text;
    },
    [language, translateBatch],
  );

  const translations = language === "ar" ? ar : en;

  const t = useCallback(
    (key) => {
      return translations[key] || key;
    },
    [translations],
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translate,
        translateBatch,
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
