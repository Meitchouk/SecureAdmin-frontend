import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { forgotPassword } from "../../services/mail/forgotPassword.service";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("error");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => {
        navigate("/reset-password");
      }, 5000);
    } catch (error) {
      setMessage("An error occurred while sending the reset email.");
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
          {t("FORGOT_PASSWORD_TITLE")}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-light-primary dark:bg-dark-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-secondary dark:hover:bg-dark-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary dark:focus-visible:outline-dark-primary"
              disabled={loading}
            >
              {loading ? <Spinner /> : t("SEND_RESET_LINK")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
