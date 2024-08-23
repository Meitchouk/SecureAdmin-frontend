import { useTranslation } from "react-i18next";
import Sidebar from "../../components/Sidebar";
import { DateTimeUtils } from "../../utils/dateTimeUtils";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const createdAt = localStorage.getItem("createdAt");

  const { t } = useTranslation();

  const formattedCreatedAt = createdAt
    ? DateTimeUtils.formatDate(new Date(createdAt), "dd-mm-yyyy")
    : "Fecha no disponible";

  return (
    <div className="flex bg-light-background dark:bg-dark-background">
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

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-4">
            {t("WELCOME")}, {username || t("USER")}
          </h2>
          <p className="text-light-textPrimary dark:text-dark-textPrimary mb-6">
            {t("DASHBOARD_MESSAGE")}
          </p>

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
      </div>
    </div>
  );
};

export default Dashboard;
