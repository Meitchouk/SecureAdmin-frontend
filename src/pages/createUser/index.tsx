import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/users/createUser.service";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("error");
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newUser = {
        username,
        email,
        password,
        name,
        roleId: 1, // Assign roleId as 1 by default
      };

      await createUser(newUser);
      setMessage(t("USER_CREATED_SUCCESS"));
      setAlertType("success");
      setShowAlert(true);

      // Redirect to login page after successful user creation
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setMessage(
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || t("ERROR_CREATING_USER")
      );
      setAlertType("error");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-light-background dark:bg-dark-background pb-40">
      {showAlert && (
        <Alert
          type={alertType}
          message={message}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-light-textPrimary dark:text-dark-textPrimary">
          {t("CREATE_USER_TITLE")}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleCreateUser}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-light-textPrimary dark:text-dark-textPrimary"
            >
              {t("USERNAME")}
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder="username"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-light-textPrimary dark:text-dark-textPrimary"
            >
              {t("EMAIL")}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-light-textPrimary dark:text-dark-textPrimary"
            >
              {t("PASSWORD")}
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder="password"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-light-textPrimary dark:text-dark-textPrimary"
            >
              {t("NAME")}
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder="Full Name"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-light-primary dark:bg-dark-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-secondary dark:hover:bg-dark-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary dark:focus-visible:outline-dark-primary"
              disabled={loading}
            >
              {loading ? <Spinner /> : t("CREATE_ACCOUNT")}
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium leading-6 text-light-primary dark:text-dark-primary hover:underline"
            >
              {t("BACK_TO_LOGIN")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
