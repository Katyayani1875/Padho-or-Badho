import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useThemeStore } from '../../store/theme.store';
import { useTranslation } from 'react-i18next';
import { SunIcon, MoonIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="bg-surface dark:bg-dark-surface shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary dark:text-dark-primary">
              {t('appName')}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-on-surface dark:text-dark-on-surface hover:text-primary dark:hover:text-dark-primary font-medium">
                  {t('nav.dashboard')}
                </Link>
                <span className="text-on-background/80 dark:text-dark-on-background/80">
                  Hi, {user.name}!
                </span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 text-sm font-semibold">
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-on-surface dark:text-dark-on-surface hover:text-primary dark:hover:text-dark-primary font-medium">Login</Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 text-sm font-semibold">
                  Sign Up
                </Link>
              </>
            )}
            
            {/* Theme & Language Toggles */}
            <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
              </button>
              <div className="relative">
                <select 
                  onChange={(e) => handleLanguageChange(e.target.value)} 
                  value={i18n.language}
                  className="bg-transparent text-sm font-medium focus:outline-none"
                >
                  <option value="en">EN</option>
                  <option value="hi">HI</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;