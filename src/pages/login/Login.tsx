import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth/login.service";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("error");
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      const { access_token, user } = response;

      // Almacenar el token en el localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("username", user.username);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("createdAt", new Date(user.createdAt).toISOString());
      localStorage.setItem("roleId", user.roleId.toString());

      setMessage(`Login successful. Welcome, ${user.name}!`);
      setAlertType("success");
      setShowAlert(true);

      // Redirigir al dashboard
      console.log("Redirigiendo al dashboard...");
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "An error occurred while logging in"
      );
      setAlertType("error");
      setShowAlert(true);

      // Ocultar el Alert después de 3 segundos
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } finally {
      setLoading(false); // Ocultar el spinner una vez que la solicitud haya terminado
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
          {t("LOGIN_TITLE")}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
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
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                placeholder="email@email.com"
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
                placeholder="password"
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-light-primary dark:bg-dark-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-secondary dark:hover:bg-dark-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary dark:focus-visible:outline-dark-primary"
              disabled={loading} // Desactivar el botón mientras está cargando
            >
              {loading ? <Spinner /> : t("LOGIN_BUTTON")}{" "}
              {/* Mostrar el Spinner o el texto */}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm">
            <a
              href="/forgot-password"
              className="font-medium text-light-primary hover:text-light-secondary"
            >
              {t("FORGOT_PASSWORD")}
            </a>
          </div>
          <div className="text-sm">
            <a
              href="/register"
              className="font-medium text-light-primary hover:text-light-secondary"
            >
              {t("CREATE_ACCOUNT")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
