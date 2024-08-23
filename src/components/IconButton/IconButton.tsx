import React from "react";
import { IconType } from "react-icons";

type IconButtonProps = {
  icon: IconType; // El componente del icono
  position?: "left" | "right";
  size?: "small" | "medium" | "large";
  type: "button" | "submit" | "reset";
  onClick: () => void;
  text?: string;
  disabled?: boolean;
  color?: string; // Color del texto y del icono
  bgColor?: string; // Color de fondo del botón
  minWidth?: string; // Ancho mínimo del botón
};

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  position = "right",
  size = "medium",
  type,
  onClick,
  text,
  disabled = false,
  color = "text-white", // Valor predeterminado del color
  bgColor = "bg-blue-500", // Valor predeterminado del fondo
  minWidth = "0", // Valor predeterminado del ancho mínimo
}) => {
  const buttonClasses = `flex items-center ${
    position === "left" ? "flex-row-reverse" : ""
  } ${size === "small" ? "px-2 py-1 text-sm" : "px-4 py-2 text-base"} ${
    disabled ? "opacity-50 cursor-not-allowed" : `hover:bg-opacity-75`
  } rounded-md ${bgColor} ${color}`;

  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ minWidth: minWidth }} // Agregar el estilo de ancho mínimo
    >
      <Icon className="mr-2" /> {/* Aquí utilizamos el componente del icono */}
      {text && <span>{text}</span>}
    </button>
  );
};

export default IconButton;
