import Sidebar from "../../components/Sidebar";

const Users = () => {
  return (
    <div className="flex min-h-screen bg-light-background dark:bg-dark-background">
      <Sidebar />
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-light-primary dark:text-dark-primary">
            Dashboard
          </h1>
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary">
            Gestiona tus opciones y configuraciones desde aquí.
          </p>
        </header>
      </div>
    </div>
  );
};

export default Users;
