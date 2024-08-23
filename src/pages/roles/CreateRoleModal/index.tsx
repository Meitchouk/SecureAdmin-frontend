import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface CreateRoleModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleCreateRole: (description: string) => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
  isModalOpen,
  closeModal,
  handleCreateRole,
}) => {
  const [description, setDescription] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    handleCreateRole(description);
    setDescription("");
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Crear Nuevo Rol</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            {t("DESCRIPTION_CREATE_ROLE_MODAL")}:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2"
            />
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              {t("CANCEL")}
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {t("CREATE")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoleModal;
