import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";
import { resetPassword } from "../../services/mail/resetPassword.service";

const ResetPassword = () => {
  const [token, setToken] = useState(""); // New state for token
  const [email, setEmail] = useState(""); // New state for email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("error");
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await resetPassword(email, token, password);

      if (response.success) {
        setMessage(t("PASSWORD_RESET_SUCCESS"));
        setAlertType("success");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/"); // Redirect to login after successful reset
        }, 3000);
      } else {
        setMessage(t("PASSWORD_RESET_FAILED"));
        setAlertType("error");
        setShowAlert(true);
      }
    } catch (error) {
      setMessage(t("PASSWORD_RESET_ERROR"));
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
          {t("RESET_PASSWORD_TITLE")}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleResetPassword}>
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
                placeholder={t("EMAIL_PLACEHOLDER")}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="token"
              className="block text-sm font-medium leading-6 text-light-textPrimary dark:text-dark-textPrimary"
            >
              {t("TOKEN")}
            </label>
            <div className="mt-2">
              <input
                id="token"
                name="token"
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder={t("TOKEN_PLACEHOLDER")}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium leading-6 text-light-textPrimary dark:text-dark-textPrimary"
            >
              {t("NEW_PASSWORD")}
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
                placeholder={t("NEW_PASSWORD_PLACEHOLDER")}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-light-primary dark:bg-dark-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-secondary dark:hover:bg-dark-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary dark:focus-visible:outline-dark-primary"
              disabled={loading}
            >
              {loading ? <Spinner /> : t("RESET_PASSWORD_BUTTON")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
