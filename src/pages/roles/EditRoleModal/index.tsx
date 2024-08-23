import React from "react";
import { useTranslation } from "react-i18next";

interface EditRoleModalProps {
  isModalOpen: boolean;
  closeEditModal: () => void;
  handleSaveChanges: (e: React.FormEvent<Element>) => void;
  editDescription: string;
  setEditDescription: React.Dispatch<React.SetStateAction<string>>;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  isModalOpen,
  closeEditModal,
  handleSaveChanges,
  editDescription,
  setEditDescription,
}) => {
  const { t } = useTranslation();
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Editar Rol</h2>
        <form onSubmit={handleSaveChanges}>
          <label className="block mb-2">
            {t("DESCRIPTION_EDIT_ROLE_MODAL")}:
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full border rounded p-2"
            />
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeEditModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              {t("CANCEL")}
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {t("SAVE")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
