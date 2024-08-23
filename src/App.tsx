import { useState } from "react";
import AppRoutes from "./routes/routes";
import Navbar from "./components/Navbar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = (
    isDark: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <Navbar onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
      <AppRoutes />
    </>
  );
}

export default App;
