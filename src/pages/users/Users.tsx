import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/Sidebar";
import { getUsers } from "../../services/users/getAllUsers.service";
import { User } from "../../types/auth/auth.types";
import IconButton from "../../components/IconButton/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditUserModal from "./EditUserModal";
import CreateUserModal from "./CreateUserModal";
import { updateUser } from "../../services/users/updateUser.service";
import { deleteUser } from "../../services/users/deleteUser.service";
import { createUser } from "../../services/users/createUser.service";
import ConfirmationModal from "../../components/ConfirmationModal";
import Spinner from "../../components/Spinner";

const Users = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editName, setEditName] = useState("");

  const [userRoleId, setUserRoleId] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const roleId = localStorage.getItem("roleId");
    setUserRoleId(roleId ? Number(roleId) : null);

    const userId = localStorage.getItem("userId");
    setCurrentUserId(userId ? Number(userId) : null);

    const fetchUsers = async () => {
      setIsLoading(true); // Inicia la carga
      const usersData = await getUsers();
      setUsers(usersData);
      setIsLoading(false); // Termina la carga
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditUsername(user.username);
    setEditEmail(user.email);
    setEditName(user.name);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setEditModalOpen(false);
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleCreateUser = async (
    username: string,
    email: string,
    name: string,
    roleId: number
  ) => {
    const newUser = {
      username,
      email,
      name,
      password: "password",
      roleId,
    };

    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, { ...createdUser, role: "new role" }]);
      closeCreateModal();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDeleteClick = (user: User) => {
    if (user.id === currentUserId) {
      alert(t("CANNOT_DELETE_SELF"));
    } else {
      setUserToDelete(user);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id); // Llama al servicio para eliminar el usuario
        setUsers(users.filter((user) => user.id !== userToDelete.id));
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setDeleteModalOpen(false);
        setUserToDelete(null);
      }
    }
  };

  const handleSaveChanges = async (e: React.FormEvent<Element>) => {
    e.preventDefault();

    const updatedUser = {
      username: editUsername,
      email: editEmail,
      name: editName,
    };

    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, updatedUser);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, ...updatedUser } : user
          )
        );
      }
      closeEditModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Función para cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex bg-light-background dark:bg-dark-background min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-light-primary dark:text-dark-primary">
            {t("USERS")}
          </h1>
          {(userRoleId === 1 || userRoleId === 2) && (
            <button
              onClick={openCreateModal}
              className="bg-light-primary text-white px-4 py-2 rounded"
            >
              {t("CREATE_USER")}
            </button>
          )}
        </header>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner /> {/* Mostrar Spinner mientras se cargan los datos */}
            </div>
          ) : (
            <>
              <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                        {t("USERNAME")}
                      </th>
                      <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                        {t("EMAIL")}
                      </th>
                      <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                        {t("STATUS")}
                      </th>
                      <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                        {t("ROLE")}
                      </th>
                      {(userRoleId === 1 || userRoleId === 2) && (
                        <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                          {t("ACTIONS")}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                          {user.username}
                        </td>
                        <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                          {user.email}
                        </td>
                        <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                          {user.status ? t("ACTIVE") : t("INACTIVE")}
                        </td>
                        <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                          {user.role || t("ROLE_NOT_FOUND")}
                        </td>
                        {(userRoleId === 1 || userRoleId === 2) && (
                          <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                            <div className="flex gap-4">
                              <IconButton
                                icon={FaEdit}
                                type="button"
                                onClick={() => openEditModal(user)}
                                text={t("EDIT")}
                                color="text-white"
                                bgColor="bg-green-500"
                                size="medium"
                                minWidth="100px"
                              />
                              <IconButton
                                icon={FaTrash}
                                type="button"
                                onClick={() => handleDeleteClick(user)}
                                text={t("DELETE")}
                                color="text-red-500"
                                bgColor="bg-gray-200"
                                size="medium"
                                minWidth="100px"
                              />
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación e información */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-light-textPrimary dark:text-dark-textPrimary">
                  {t("PAGE")} {currentPage} {t("OF")}{" "}
                  {Math.ceil(users.length / usersPerPage)}
                </span>
                <div className="flex items-center">
                  <span className="mr-4 text-light-textPrimary dark:text-dark-textPrimary">
                    {t("TOTAL_RECORDS")}: {users.length}
                  </span>
                  {[
                    ...Array(Math.ceil(users.length / usersPerPage)).keys(),
                  ].map((number) => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === number + 1
                          ? "bg-light-primary text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <EditUserModal
          isModalOpen={isEditModalOpen}
          closeEditModal={closeEditModal}
          handleSaveChanges={handleSaveChanges}
          editUsername={editUsername}
          setEditUsername={setEditUsername}
          editEmail={editEmail}
          setEditEmail={setEditEmail}
          editName={editName}
          setEditName={setEditName}
        />
      )}

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <CreateUserModal
          isModalOpen={isCreateModalOpen}
          closeModal={closeCreateModal}
          handleCreateUser={handleCreateUser}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteUser}
          message={t("CONFIRM_DELETE")}
        />
      )}
    </div>
  );
};

export default Users;
