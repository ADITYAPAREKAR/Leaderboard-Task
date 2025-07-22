import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Rank</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(user => (
            <tr key={user._id}>
              <td className="border p-2">{user.rank}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;