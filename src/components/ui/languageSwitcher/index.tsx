import { useTranslation } from 'react-i18next';
import { Button } from '../button';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="fixed bottom-4 right-4 bg-white shadow-md"
    >
      {i18n.language === 'en' ? '🇻🇳 VI' : '🇺🇸 EN'}
    </Button>
  );
}