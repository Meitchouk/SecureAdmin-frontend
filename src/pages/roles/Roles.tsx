import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/Sidebar";
import { createRole } from "../../services/roles/createRole.service";
import { updateRole } from "../../services/roles/updateRole.service";
import { deleteRole } from "../../services/roles/deleteRole.service";
import IconButton from "../../components/IconButton/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditRoleModal from "./EditRoleModal";
import CreateRoleModal from "./CreateRoleModal";
import { RolesType } from "../../types/roles/roles.types";
import { getRoles } from "../../services/roles/getAllRole.service";
import ConfirmationModal from "../../components/ConfirmationModal";
import Spinner from "../../components/Spinner";

const Roles = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<RolesType[]>([]);
  const [roleToDelete, setRoleToDelete] = useState<RolesType | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RolesType | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [currentUserRoleId, setCurrentUserRoleId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 3;

  useEffect(() => {
    const roleId = localStorage.getItem("roleId");
    setCurrentUserRoleId(roleId ? Number(roleId) : null);

    const fetchRoles = async () => {
      setIsLoading(true); // Comienza la carga
      const rolesData = await getRoles();
      setRoles(rolesData);
      setIsLoading(false); // Termina la carga
    };

    fetchRoles();
  }, []);

  // Calcular roles a mostrar en la página actual
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

  const openEditModal = (role: RolesType) => {
    setSelectedRole(role);
    setEditDescription(role.description);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedRole(null);
    setEditModalOpen(false);
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleCreateRole = async (description: string) => {
    const newRole = { description };

    try {
      const createdRole = await createRole(newRole);
      setRoles([...roles, createdRole]);
      closeCreateModal();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleSaveChanges = async (e: React.FormEvent<Element>) => {
    e.preventDefault();

    const updatedRole = {
      description: editDescription,
    };

    try {
      if (selectedRole) {
        await updateRole(selectedRole.id, updatedRole);
        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.id === selectedRole.id ? { ...role, ...updatedRole } : role
          )
        );
      }
      closeEditModal();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleDeleteClick = (role: RolesType) => {
    if (role.id === currentUserRoleId) {
      alert(t("CANNOT_DELETE_SELF_ROLE"));
    } else {
      setRoleToDelete(role);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteRole = async () => {
    if (roleToDelete) {
      try {
        await deleteRole(roleToDelete.id); // Llama al servicio para eliminar el rol
        setRoles(roles.filter((role) => role.id !== roleToDelete.id));
      } catch (error) {
        console.error("Error deleting role:", error);
      } finally {
        setDeleteModalOpen(false);
        setRoleToDelete(null);
      }
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
            {t("ROLES")}
          </h1>
          <button
            onClick={openCreateModal}
            className="bg-light-primary text-white px-4 py-2 rounded"
          >
            {t("CREATE_ROLE")}
          </button>
        </header>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                        {t("ROLE")}
                      </th>
                      <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                        {t("STATUS")}
                      </th>
                      <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                        {t("CREATED_AT")}
                      </th>
                      <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                        {t("USERS")}
                      </th>
                      <th className="px-4 py-2 text-left text-light-textPrimary dark:text-dark-textPrimary">
                        {t("ACTIONS")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRoles.map((role) => (
                      <tr key={role.id} className="border-b">
                        <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                          {role.description}
                        </td>
                        <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                          {role.status ? t("ACTIVE") : t("INACTIVE")}
                        </td>
                        <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                          {new Date(role.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                          {role.users.length > 0 ? (
                            <div>
                              <ul>
                                {role.users.slice(0, 2).map((user) => (
                                  <li key={user.id}>{user.username}</li>
                                ))}
                              </ul>
                              {role.users.length > 2 && (
                                <span>
                                  +{role.users.length - 2} {t("MORE")}
                                </span>
                              )}
                            </div>
                          ) : (
                            t("NO_USERS")
                          )}
                        </td>
                        <td className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary">
                          <div className="flex gap-4">
                            <IconButton
                              icon={FaEdit}
                              type="button"
                              onClick={() => openEditModal(role)}
                              text={t("EDIT")}
                              color="text-white"
                              bgColor="bg-green-500"
                              size="medium"
                              minWidth="100px"
                            />
                            <IconButton
                              icon={FaTrash}
                              type="button"
                              onClick={() => handleDeleteClick(role)}
                              text={t("DELETE")}
                              color="text-red-500"
                              bgColor="bg-gray-200"
                              size="medium"
                              minWidth="100px"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación e información */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-light-textPrimary dark:text-dark-textPrimary">
                  {t("PAGE")} {currentPage} {t("OF")}{" "}
                  {Math.ceil(roles.length / rolesPerPage)}
                </span>
                <div className="flex items-center">
                  <span className="mr-4 text-light-textPrimary dark:text-dark-textPrimary">
                    {t("TOTAL_RECORDS")}: {roles.length}
                  </span>
                  {[
                    ...Array(Math.ceil(roles.length / rolesPerPage)).keys(),
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

      {/* Edit Role Modal */}
      {isEditModalOpen && (
        <EditRoleModal
          isModalOpen={isEditModalOpen}
          closeEditModal={closeEditModal}
          handleSaveChanges={handleSaveChanges}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
        />
      )}

      {/* Create Role Modal */}
      {isCreateModalOpen && (
        <CreateRoleModal
          isModalOpen={isCreateModalOpen}
          closeModal={closeCreateModal}
          handleCreateRole={handleCreateRole}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteRole}
          message={t("CONFIRM_DELETE_ROLE")}
        />
      )}
    </div>
  );
};

export default Roles;
