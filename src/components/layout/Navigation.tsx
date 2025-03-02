import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher, UserMenu } from '@/components/ui';

export function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useTranslation();

  if (isHome) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              {t('nav.home')}
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <Link
              to="/knowledge"
              className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium ${
                location.pathname === '/knowledge' ? 'text-purple-600 dark:text-purple-400' : ''
              }`}
            >
              {t('nav.knowledgeBase')}
            </Link>
            <Link
              to="/questions"
              className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium ${
                location.pathname === '/questions' ? 'text-purple-600 dark:text-purple-400' : ''
              }`}
            >
              {t('nav.interviewQuestions')}
            </Link>
            <Link
              to="/chat"
              className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium ${
                location.pathname === '/chat' ? 'text-purple-600 dark:text-purple-400' : ''
              }`}
            >
              {t('nav.chat')}
            </Link>

            <div className="flex items-center gap-4 pl-8 border-l">
              <LanguageSwitcher />
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}