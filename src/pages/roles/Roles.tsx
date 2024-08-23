import { useTranslation } from "react-i18next";
import Sidebar from "../../components/Sidebar";

const Roles = () => {
  const { t } = useTranslation();

  return (
    <div className="flex bg-light-background dark:bg-dark-background min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div></div>
      </div>
    </div>
  );
};

export default Roles;
