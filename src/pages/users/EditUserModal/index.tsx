import React from "react";
import Modal from "../../../components/Modal/Modal";
import { t } from "i18next";

interface EditUserModalProps {
  isModalOpen: boolean;
  closeEditModal: () => void;
  handleSaveChanges: (e: React.FormEvent) => void;
  editUsername: string;
  setEditUsername: (value: string) => void;
  editEmail: string;
  setEditEmail: (value: string) => void;
  editName: string;
  setEditName: (value: string) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isModalOpen,
  closeEditModal,
  handleSaveChanges,
  editUsername,
  setEditUsername,
  editEmail,
  setEditEmail,
  editName,
  setEditName,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeEditModal}
      isAddMode={true}
      onSave={handleSaveChanges}
      titleKey="EDIT_USER"
    >
      <form onSubmit={handleSaveChanges}>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            htmlFor="username"
          >
            {t("USERNAME")}
          </label>
          <input
            id="username"
            type="text"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            htmlFor="email"
          >
            {t("EMAIL")}
          </label>
          <input
            id="email"
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            htmlFor="name"
          >
            {t("NAME")}
          </label>
          <input
            id="name"
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            required
          />
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
