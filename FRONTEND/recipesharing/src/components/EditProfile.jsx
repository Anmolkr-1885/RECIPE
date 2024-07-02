import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !bio) {
      setError('All fields are required');
      return;
    }

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      const response = await axios.post('http://localhost:8001/api/v1/users/update-details', { username, bio });
      console.log(response);
      alert('Account details updated successfully');
      setUsername('');
      setBio('');
      setError('');
    } catch (error) {
      setError('Error while updating account details');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="block w-full px-3 py-2 mt-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;

