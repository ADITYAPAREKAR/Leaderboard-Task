import React from 'react';

const AddUser = ({ newUserName, setNewUserName, handleAddUser }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Add New User</h2>
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Enter user name"
        className="border p-2 mr-2"
      />
      <button
        onClick={handleAddUser}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add User
      </button>
    </div>
  );
};

export default AddUser;