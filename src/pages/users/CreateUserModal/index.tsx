import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
import { t } from "i18next";
import { getRoles } from "../../../services/roles/getAllRole.service";

interface CreateUserModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleCreateUser: (
    username: string,
    email: string,
    name: string,
    roleId: number
  ) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isModalOpen,
  closeModal,
  handleCreateUser,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [roles, setRoles] = useState<{ id: number; description: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesData = await getRoles();
      setRoles(
        rolesData.map((role: { id: number; description: string }) => ({
          id: role.id,
          description: role.description,
        }))
      );
    };

    fetchRoles();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      handleCreateUser(username, email, name, selectedRole);
      closeModal();
    } else {
      alert(t("PLEASE_SELECT_ROLE"));
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      isAddMode={true}
      onSave={handleSubmit}
      titleKey="CREATE_USER"
    >
      <form onSubmit={handleSubmit}>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm placeholder:text-light-textSecondary dark:placeholder:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            htmlFor="role"
          >
            {t("ROLE")}
          </label>
          <select
            id="role"
            value={selectedRole ?? ""}
            onChange={(e) => setSelectedRole(Number(e.target.value))}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-light-textPrimary dark:text-dark-textPrimary bg-light-background dark:bg-dark-background shadow-sm focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            required
          >
            <option value="" disabled>
              {t("SELECT_ROLE")}
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.description}
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
