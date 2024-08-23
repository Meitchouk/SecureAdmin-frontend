import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/Sidebar";
import { DateTimeUtils } from "../../utils/dateTimeUtils";
import { getRoleById } from "../../services/roles/getRoleById.service";
import { Roles } from "../../types/roles/roles.types";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const createdAt = localStorage.getItem("createdAt");
  const roleId = localStorage.getItem("roleId");

  const [Role, setRole] = useState<Roles | null>(null);

  useEffect(() => {
    getRoleById(Number(roleId)).then((role) => {
      setRole(role);
    });
  }, [roleId]);

  const { t } = useTranslation();

  const formattedCreatedAt = createdAt
    ? DateTimeUtils.formatDate(new Date(createdAt), "dd-mm-yyyy")
    : "Fecha no disponible";

  return (
    <div className="flex bg-light-background dark:bg-dark-background min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-light-primary dark:text-dark-primary">
            {t("DASHBOARD")}
          </h1>
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary">
            {t("MANAGE_YOUR_OPTIONS")}
          </p>
        </header>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-4">
            {t("WELCOME")}, {username || t("USER")}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                {t("USERNAME")}:
              </span>
              <span className="text-light-textSecondary dark:text-dark-textSecondary">
                {username}
              </span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                {t("EMAIL")}:
              </span>
              <span className="text-light-textSecondary dark:text-dark-textSecondary">
                {email}
              </span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                {t("CREATED_AT")}:
              </span>
              <span className="text-light-textSecondary dark:text-dark-textSecondary">
                {formattedCreatedAt}
              </span>
            </div>
          </div>
        </section>

        {Role && (
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-light-primary dark:text-dark-primary mb-4">
              {t("ROLE_INFORMATION")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                  {t("ROLE_DESCRIPTION")}:
                </span>
                <span className="text-light-textSecondary dark:text-dark-textSecondary">
                  {Role.description}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                  {t("ROLE_STATUS")}:
                </span>
                <span className="text-light-textSecondary dark:text-dark-textSecondary">
                  {Role.status ? t("ACTIVE") : t("INACTIVE")}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                  {t("ROLE_CREATED_AT")}:
                </span>
                <span className="text-light-textSecondary dark:text-dark-textSecondary">
                  {DateTimeUtils.formatDate(
                    new Date(Role.createdAt),
                    "dd-mm-yyyy"
                  )}
                </span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
