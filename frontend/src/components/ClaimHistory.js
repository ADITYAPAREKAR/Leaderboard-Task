import React from 'react';

const ClaimHistory = ({ history }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Claim History</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User</th>
            <th className="border p-2">Points</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map(record => (
            <tr key={record._id}>
              <td className="border p-2">{record.userId.name}</td>
              <td className="border p-2">{record.points}</td>
              <td className="border p-2">{new Date(record.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimHistory;