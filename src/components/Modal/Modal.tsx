import React from "react";
import { useTranslation } from "react-i18next";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  isAddMode?: boolean;
  titleKey: string; // Prop to pass the translation key for the title
}

const Modal = ({
  isOpen,
  onClose,
  onSave,
  children,
  isAddMode = false,
  titleKey, // Destructure titleKey from props
}: ModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {t(titleKey)} {/* Use the titleKey for dynamic translation */}
        </h2>
        {children}
        <div className="mt-6 flex justify-end space-x-4">
          {isAddMode ? (
            <>
              <button
                className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:shadow-outline"
                onClick={onClose}
              >
                {t("CANCEL")}
              </button>
              <button
                className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:shadow-outline"
                onClick={onSave}
              >
                {t("SAVE")}
              </button>
            </>
          ) : (
            <button
              className="w-full bg-red-500 dark:bg-red-600 text-white py-2 rounded hover:bg-red-700 dark:hover:bg-red-500 transition duration-200 focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              {t("CLOSE")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
