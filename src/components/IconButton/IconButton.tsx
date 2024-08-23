import React from "react";

type IconButtonProps = {
  icon: string;
  position?: "left" | "right";
  size?: "small" | "medium" | "large";
  type: "button" | "submit" | "reset";
  onClick: () => void;
  text?: string;
  disabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  position = "right",
  size = "medium",
  type,
  onClick,
  text,
  disabled = false,
}) => {
  const buttonClasses = `flex items-center ${
    position === "left" ? "flex-row-reverse" : ""
  } ${size === "small" ? "px-2 py-1 text-sm" : "px-4 py-2 text-base"} ${
    disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
  } rounded-md`;

  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="material-icons">{icon}</span>
      {text && <span className="ml-2">{text}</span>}
    </button>
  );
};

export default IconButton;
