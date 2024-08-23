import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth/login.service";
import Alert from "../../components/Alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("error");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      const { access_token } = response;

      // Almacenar el token en el localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("username", response.user.name);
      localStorage.setItem("email", response.user.email);
      localStorage.setItem("createdAt", response.user.createdAt.toISOString());

      setMessage(`Login successful. Welcome, ${response.user.name}!`);
      setAlertType("success");
      setShowAlert(true);

      // Redirigir al dashboard
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
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-light-background dark:bg-dark-background">
      {showAlert && (
        <Alert type={alertType} message={message} onClose={closeAlert} />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-light-textPrimary dark:text-dark-textPrimary">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-light-textPrimary dark:text-dark-textPrimary"
            >
              Email
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
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-light-textPrimary dark:text-dark-textPrimary"
            >
              Password
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
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-light-primary dark:bg-dark-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-secondary dark:hover:bg-dark-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary dark:focus-visible:outline-dark-primary"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
