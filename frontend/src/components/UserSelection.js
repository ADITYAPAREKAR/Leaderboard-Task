import React from 'react';

const UserSelection = ({ users, selectedUser, setSelectedUser, handleClaim, message }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Claim Points</h2>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="border p-2 mr-2"
      >
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
      <button
        onClick={handleClaim}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Claim Points
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default UserSelection;