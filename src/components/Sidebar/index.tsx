import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCaretDown,
  FaCaretUp,
  FaTachometerAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import { FaUsers, FaUserShield } from "react-icons/fa";
import { BsPersonBadgeFill } from "react-icons/bs";
import { formatDate, formatTime } from "../../utils/dateTimeUtils";
import { t } from "i18next";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSecurityMenuOpen, setIsSecurityMenuOpen] = useState(false);
  const [currentDate] = useState(formatDate(new Date()));
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
  const location = useLocation();
  const roleId = Number(localStorage.getItem("roleId"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSecurityMenu = () => {
    setIsSecurityMenuOpen(!isSecurityMenuOpen);
  };

  const navLinkClasses = (path: string) =>
    `flex items-center p-2 text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md ${
      location.pathname === path
        ? "bg-light-secondary dark:bg-dark-secondary font-bold"
        : ""
    }`;

  const isInSecurityMenu = ["/security/users", "/security/roles"].includes(
    location.pathname
  );

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
          <Link to="/dashboard" className={navLinkClasses("/dashboard")}>
            <FaTachometerAlt className="mr-2" />
            {!isCollapsed && <span>{t("DASHBOARD_SIDEBAR")}</span>}
          </Link>

          <div>
            <button
              onClick={toggleSecurityMenu}
              className={`flex items-center w-full text-left p-2 text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md ${
                isInSecurityMenu
                  ? "bg-light-secondary dark:bg-dark-secondary font-bold"
                  : ""
              }`}
            >
              <MdSecurity className="mr-2" />
              {!isCollapsed && (
                <>
                  <span>{t("SECURITY_SIDEBAR")}</span>
                  {isSecurityMenuOpen || isInSecurityMenu ? (
                    <FaCaretUp className="ml-auto" />
                  ) : (
                    <FaCaretDown className="ml-auto" />
                  )}
                </>
              )}
            </button>

            {!isCollapsed && (isSecurityMenuOpen || isInSecurityMenu) && (
              <div className="pl-6 space-y-">
                <Link
                  to="/security/users"
                  className={navLinkClasses("/security/users")}
                >
                  <FaUsers className="mr-2" />
                  <span>{t("USERS_SIDEBAR")}</span>
                </Link>
                {(roleId === 1 || roleId === 2) && (
                  <Link
                    to="/security/roles"
                    className={navLinkClasses("/security/roles")}
                  >
                    <BsPersonBadgeFill className="mr-2" />
                    <span>{t("ROLES_SIDEBAR")}</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="mt-auto text-center mb-16">
        <Link to="/profile" className={navLinkClasses("/profile")}>
          <FaUserShield className="mr-2" />
          {!isCollapsed && <span>{t("PROFILE_SIDEBAR")}</span>}
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
