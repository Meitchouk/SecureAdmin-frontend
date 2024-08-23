import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import { FaUsers, FaUserShield } from "react-icons/fa";
import { formatDate, formatTime } from "../../utils/dateTimeUtils";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentDate] = useState(formatDate(new Date()));
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo cuando se desmonte el componente
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`relative flex flex-col h-full min-h-screen p-4 bg-light-background dark:bg-dark-background border-r border-gray-200 dark:border-gray-700 ${
        isCollapsed ? "w-20" : "w-64"
      } transition-width duration-300 ease-in-out`}
    >
      <button
        onClick={toggleSidebar}
        className={`absolute -right-4 top-1/2 transform -translate-y-1/2 bg-light-secondary dark:bg-dark-secondary p-2 rounded-full shadow-md focus:outline-none`}
      >
        {isCollapsed ? (
          <FaChevronRight className="text-light-primary dark:text-dark-primary" />
        ) : (
          <FaChevronLeft className="text-light-primary dark:text-dark-primary" />
        )}
      </button>

      <div className="sidebar-content mt-6 flex-1">
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center p-2 text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md"
          >
            <MdSecurity className="mr-2" />
            {!isCollapsed && <span>Seguridad</span>}
          </Link>
          <Link
            to="/dashboard/users"
            className="flex items-center p-2 text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md"
          >
            <FaUsers className="mr-2" />
            {!isCollapsed && <span>Usuarios</span>}
          </Link>
        </nav>
      </div>

      <div className="mt-auto text-center mb-16">
        <Link
          to="/profile"
          className="flex items-center p-2 text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md"
        >
          <FaUserShield className="mr-2" />
          {!isCollapsed && <span>Perfil</span>}
        </Link>
        {!isCollapsed && (
          <div className="text-light-textPrimary dark:text-dark-textPrimary mt-2">
            {currentDate} {" | "} {currentTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
