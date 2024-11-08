import { useState } from "react";
import { api } from "~/utils/api";
import { FaUsers, FaUserCog } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [activeSection, setActiveSection] = useState("viewUsers"); // Track active section
  const [responseMessage, setResponseMessage] = useState(""); // Track response messages

  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the modal
  const [modalType, setModalType] = useState("add"); // Modal type: "add", "edit", "delete"
  const [editUserId, setEditUserId] = useState(null); // ID of the user to edit

  // Define functions
  const fetchAllUsers = api.example.getAll.useQuery();
  const createUserMutation = api.example.createUser.useMutation();
  const updateUserMutation = api.example.updateUser.useMutation();
  const deleteUserMutation = api.example.deleteUser.useMutation();

  // Display response message temporarily
  const showResponseMessage = (message) => {
    setResponseMessage(message);
    setTimeout(() => setResponseMessage(""), 3000);
  };

  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({ name, email });
      setName("");
      setEmail("");
      fetchAllUsers.refetch();
      showResponseMessage("User created successfully!");
      closeModal();
    } catch (error) {
      showResponseMessage("Error creating user.");
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({ id: editUserId, name, email });
      fetchAllUsers.refetch();
      showResponseMessage("User updated successfully!");
      closeModal();
    } catch (error) {
      showResponseMessage("Error updating user.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserMutation.mutateAsync({ id });
      fetchAllUsers.refetch();
      showResponseMessage("User deleted successfully!");
    } catch (error) {
      showResponseMessage("Error deleting user.");
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

          {/* Display response message */}
          {responseMessage && (
            <div className="mb-4 rounded bg-green-100 p-3 text-green-700 shadow">
              {responseMessage}
            </div>
          )}

          <section className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <div className="text-gray-600 grid grid-cols-4 gap-4 font-bold">
              <p>ID</p>
              <p>Name</p>
              <p>Email</p>
              <p>Actions</p>
            </div>
            {fetchAllUsers.data &&
              fetchAllUsers.data.map((user) => (
                <div
                  key={user.id}
                  className="my-4 grid grid-cols-4 gap-4 rounded-lg bg-gray-100 p-4 shadow-sm"
                >
                  <p>{user.id}</p>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <div className="flex space-x-2">
                    <button
                      className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                      onClick={() => openModal("edit", user)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            <button
              className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              onClick={() => openModal("add")}
            >
              Add User
            </button>
          </section>
        </main>
      </div>

      {/* Modal for Adding/Editing Users */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-1/3">
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
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`rounded px-4 py-2 text-white ${
                  modalType === "edit" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={modalType === "edit" ? handleUpdateUser : handleCreateUser}
              >
                {modalType === "edit" ? "Save Changes" : "Add User"}
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
