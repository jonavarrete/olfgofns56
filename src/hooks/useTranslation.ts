import { useGame } from '../context/GameContext';
import { translations, TranslationKey } from '../data/translations';

export function useTranslation() {
  const { state } = useGame();
  const currentLanguage = state.settings.language;

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key] || translations.es[key] || key;
  };

  return { t, currentLanguage };
}