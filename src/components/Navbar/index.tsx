import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaSun, FaMoon, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type NavbarProps = {
  onThemeToggle: (isDark: boolean) => void;
  isDarkMode: boolean;
};

const Navbar = ({ onThemeToggle, isDarkMode }: NavbarProps) => {
  const [isDark, setIsDark] = useState(isDarkMode);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    onThemeToggle(!isDark);
    const newTheme = !isDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  return (
    <nav className="top-0 left-0 w-full bg-light-background dark:bg-dark-background p-4 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-light-primary dark:text-dark-primary font-bold text-lg">
          {t("APP_NAME")}
        </h1>
        <div className="flex space-x-4 items-center relative">
          {/* Language Menu */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="text-light-primary dark:text-dark-primary"
            >
              <FaGlobe className="h-6 w-6" />
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute right-0 transform translate-x-1/2 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-300 dark:border-gray-600">
                <ul className="py-1">
                  {i18n.language === "en" ? (
                    <li
                      onClick={() => handleLanguageChange("es")}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {t("SPANISH")}
                    </li>
                  ) : (
                    <li
                      onClick={() => handleLanguageChange("en")}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {t("ENGLISH")}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <Switch
            checked={isDark}
            onChange={handleThemeToggle}
            className="bg-light-secondary dark:bg-dark-secondary relative inline-flex items-center h-6 rounded-full w-11"
          >
            <span className="sr-only">Enable dark mode</span>
            <span
              className={`${
                isDark ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-light-primary dark:bg-dark-primary rounded-full`}
            />
            {isDark ? (
              <FaMoon className="h-6 w-6 text-light-textPrimary dark:text-dark-textPrimary" />
            ) : (
              <FaSun className="h-6 w-6 text-light-textPrimary dark:text-dark-textPrimary" />
            )}
          </Switch>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
