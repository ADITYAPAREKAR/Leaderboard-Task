import React, { useState, useEffect } from 'react';
import UserSelection from './components/UserSelection';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import AddUser from './components/AddUser';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
    fetchHistory();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5000/api/users');
    const data = await response.json();
    setUsers(data);
    if (data.length > 0 && !selectedUser) {
      setSelectedUser(data[0]._id);
    }
  };

  const fetchLeaderboard = async () => {
    const response = await fetch('http://localhost:5000/api/leaderboard');
    const data = await response.json();
    setLeaderboard(data);
  };

  const fetchHistory = async () => {
    const response = await fetch('http://localhost:5000/api/history');
    const data = await response.json();
    setHistory(data);
  };

  const handleClaim = async () => {
    if (!selectedUser) return;
    const response = await fetch('http://localhost:5000/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedUser })
    });
    const data = await response.json();
    setMessage(`Claimed ${data.points} points!`);
    fetchLeaderboard();
    fetchHistory();
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newUserName })
    });
    await response.json();
    setNewUserName('');
    fetchUsers();
    fetchLeaderboard();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Points System</h1>
      <AddUser
        newUserName={newUserName}
        setNewUserName={setNewUserName}
        handleAddUser={handleAddUser}
      />
      <UserSelection
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleClaim={handleClaim}
        message={message}
      />
      <Leaderboard leaderboard={leaderboard} />
      <ClaimHistory history={history} />
    </div>
  );
}

export default App;