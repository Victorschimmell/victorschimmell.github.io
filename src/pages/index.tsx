import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { FaUsers, FaUserCog } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [editUserId, setEditUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showIds, setShowIds] = useState(false);

  const usersPerPage = 7;
  const fetchAllUsers = api.example.getAll.useQuery();
  const createUserMutation = api.example.createUser.useMutation();
  const updateUserMutation = api.example.updateUser.useMutation();
  const deleteUserMutation = api.example.deleteUser.useMutation();

  const showResponseMessage = (message) => {
    setResponseMessage(message);
    setTimeout(() => setResponseMessage(""), 3000);
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      await createUserMutation.mutateAsync({ name, email });
      setName("");
      setEmail("");
      fetchAllUsers.refetch();
      showResponseMessage("User created successfully!");
      closeModal();
    } catch (error) {
      showResponseMessage("Error creating user.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      await updateUserMutation.mutateAsync({ id: editUserId, name, email });
      fetchAllUsers.refetch();
      showResponseMessage("User updated successfully!");
      closeModal();
    } catch (error) {
      showResponseMessage("Error updating user.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      await deleteUserMutation.mutateAsync({ id });
      fetchAllUsers.refetch();
      showResponseMessage("User deleted successfully!");
    } catch (error) {
      showResponseMessage("Error deleting user.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, user = {}) => {
    setModalType(type);
    setEditUserId(user.id || null);
    setName(user.name || "");
    setEmail(user.email || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName("");
    setEmail("");
  };

  // Calculate filtered and paginated users
  const filteredUsers = fetchAllUsers.data?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Automatically go to the previous page if the current page becomes empty after deletion
  useEffect(() => {
    if (currentPage > 1 && currentUsers.length === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentUsers, currentPage]);

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <nav className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full">
            <FaUserCog className="text-blue-800 text-3xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">User Management Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-lg font-medium">Welcome, Admin</p>
          <FiUser className="text-3xl bg-white text-blue-800 p-2 rounded-full" />
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Main Dashboard */}
        <main className="w-full bg-gray-50 p-8">
          <h2 className="mb-8 text-3xl font-semibold text-gray-700">All Users</h2>

          {/* Response Message */}
          {responseMessage && (
            <div className="mb-4 rounded bg-green-100 p-3 text-green-700 shadow transition duration-300">
              {responseMessage}
            </div>
          )}

          <section className="mb-8 rounded-lg bg-white p-6 shadow-md">
            {/* Search Bar and ID Toggle */}
            <div className="flex justify-between mb-4 items-center">
              <input
                type="text"
                className="w-1/2 rounded border border-gray-300 p-2"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setShowIds(!showIds)}
                className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 transition duration-150"
              >
                {showIds ? "Hide IDs" : "Show IDs"}
              </button>
            </div>

            {/* User List */}
            <div className="text-gray-600 grid grid-cols-4 gap-4 font-bold">
              <p>ID</p>
              <p>Name</p>
              <p>Email</p>
              <p>Actions</p>
            </div>
            {currentUsers.map((user) => (
              <div
                key={user.id}
                className="my-4 grid grid-cols-4 gap-4 rounded-lg bg-gray-100 p-4 shadow-sm transition duration-200 hover:shadow-md"
              >
                <p className={`transition-opacity duration-300 ${showIds ? "opacity-100" : "opacity-0"}`}>
                  {user.id}
                </p>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <div className="flex space-x-2">
                  <button
                    className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 transition duration-150"
                    onClick={() => openModal("edit", user)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 transition duration-150"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition duration-150"
              onClick={() => openModal("add")}
            >
              Add User
            </button>
          </section>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              className="rounded bg-gray-300 px-3 py-1 text-gray-800 hover:bg-gray-400 transition duration-150"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="rounded bg-gray-300 px-3 py-1 text-gray-800 hover:bg-gray-400 transition duration-150"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </main>
      </div>

      {/* Modal for Adding/Editing Users */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200">
          <div className="bg-white rounded-lg p-8 shadow-lg w-1/3 transform transition duration-200">
            <h2 className="text-2xl font-semibold mb-4">
              {modalType === "edit" ? "Edit User" : "Add User"}
            </h2>
            <div className="mb-4">
              <input
                className="w-full rounded border border-gray-300 p-2 mb-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded border border-gray-300 p-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition duration-150"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`rounded px-4 py-2 text-white ${
                  modalType === "edit" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                } transition duration-150`}
                onClick={modalType === "edit" ? handleUpdateUser : handleCreateUser}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin inline-block" />
                ) : (
                  modalType === "edit" ? "Save Changes" : "Add User"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 p-4 text-center text-gray-400">
        <p>&copy; 2024 User Management Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}
