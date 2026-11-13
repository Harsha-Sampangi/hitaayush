import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import type { Language } from '@/types';

type TranslationMap = Record<string, unknown>;

function getNestedValue(obj: TranslationMap, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as TranslationMap)[key];
  }

  return typeof current === 'string' ? current : undefined;
}

export function useTranslation() {
  const { currentLanguage } = useApp();

  const t = (key: string): string => {
    const langTranslations = (translations[currentLanguage] as unknown) as TranslationMap | undefined;

    // Try current language first
    if (langTranslations) {
      const value = getNestedValue(langTranslations, key);
      if (value !== undefined) {
        return value;
      }
    }

    // Fallback to English
    if (currentLanguage !== 'en') {
      const enTranslations = (translations['en' as Language] as unknown) as TranslationMap | undefined;
      if (enTranslations) {
        const value = getNestedValue(enTranslations, key);
        if (value !== undefined) {
          return value;
        }
      }
    }

    // Fallback to the key itself
    return key;
  };

  return { t, language: currentLanguage };
}
