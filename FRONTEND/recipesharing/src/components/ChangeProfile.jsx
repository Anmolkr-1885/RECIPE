import React, { useState } from 'react';
import axios from 'axios';

const EditProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePicture) {
      setError('Please select a profile picture to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('newProfilePicture', profilePicture);

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      const response = await axios.post('http://localhost:8001/api/v1/users/change-profilePicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      setSuccess('Profile Picture Updated Successfully');
      setProfilePicture(null);
      setError('');
    } catch (error) {
      setError('Error while updating profile picture');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Profile Picture</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update Profile Picture
        </button>
      </form>
    </div>
  );
};

export default EditProfilePicture;
