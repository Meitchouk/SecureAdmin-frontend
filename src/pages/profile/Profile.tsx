import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/Sidebar";
import { getRoleById } from "../../services/roles/getRoleById.service";
import { getUserById } from "../../services/users/getUserById.service";
import { User } from "../../types/auth/auth.types";
import { RolesType } from "../../types/roles/roles.types";
import { DateTimeUtils } from "../../utils/dateTimeUtils";

const Profile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<RolesType | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserById(Number(userId)).then((userData: User) => setUser(userData));
    }

    const roleId = localStorage.getItem("roleId");
    if (roleId) {
      getRoleById(Number(roleId)).then((roleData) => setRole(roleData));
    }
  }, []);

  const formattedCreatedAt = user
    ? DateTimeUtils.formatDate(new Date(user.createdAt), "dd-mm-yyyy")
    : "Fecha no disponible";

  return (
    <div className="flex bg-light-background dark:bg-dark-background min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-light-primary dark:text-dark-primary">
            {t("PROFILE")}
          </h1>
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary">
            {t("PROFILE_DETAILS")}
          </p>
        </header>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="grid grid-cols-5 gap-4">
            {/* Información del Usuario */}
            <div className="col-span-2">
              <h2 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-4">
                {t("WELCOME")}, {user?.name || t("USER")}
              </h2>
              <p className="text-light-textPrimary dark:text-dark-textPrimary mb-6">
                {t("PROFILE_MESSAGE")}
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                    {t("USERNAME")}:
                  </span>
                  <span className="text-light-textSecondary dark:text-dark-textSecondary">
                    {user?.username}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                    {t("EMAIL")}:
                  </span>
                  <span className="text-light-textSecondary dark:text-dark-textSecondary">
                    {user?.email}
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
            </div>

            {/* Información del Rol */}
            <div className="col-span-2 col-start-4">
              <h2 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-4">
                {t("ROLE_INFORMATION")}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                    {t("ROLE")}:
                  </span>
                  <span className="text-light-textSecondary dark:text-dark-textSecondary">
                    {role?.description}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                    {t("ROLE_STATUS")}:
                  </span>
                  <span className="text-light-textSecondary dark:text-dark-textSecondary">
                    {role?.status ? t("ACTIVE") : t("INACTIVE")}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mr-2">
                    {t("ROLE_CREATED_AT")}:
                  </span>
                  <span className="text-light-textSecondary dark:text-dark-textSecondary">
                    {DateTimeUtils.formatDate(
                      new Date(role?.createdAt ?? ""),
                      "dd-mm-yyyy"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
