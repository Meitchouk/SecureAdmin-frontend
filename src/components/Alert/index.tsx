import React, { useEffect } from "react";
import { IconType } from "react-icons";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

interface AlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
  timerInSeconds?: number;
}

const Alert: React.FC<AlertProps> = ({
  message,
  type,
  onClose,
  timerInSeconds = 5,
}) => {
  const getColor = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIcon = (): IconType => {
    switch (type) {
      case "success":
        return FaCheckCircle;
      case "error":
        return FaTimesCircle;
      case "warning":
        return FaExclamationCircle;
      case "info":
        return FaInfoCircle;
      default:
        return FaInfoCircle;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, timerInSeconds * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, timerInSeconds]);

  const Icon = getIcon();

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-md ${getColor()} min-w-[400px]`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Icon className="mr-2" />
          <span className="text-center">{message}</span>
        </div>
        <button onClick={onClose} className="ml-4 text-lg font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
