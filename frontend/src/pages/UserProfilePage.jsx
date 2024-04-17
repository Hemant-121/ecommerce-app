import { useState } from 'react';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // Implement save logic here to update user information
    // Dispatch action to save updated user information
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      gender: value,
    }));
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 ">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <div className="mb-4 flex items-center">
          <label className="font-semibold mr-2">Name:</label>
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={editedUser?.fullName}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p>{user?.fullName}</p>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <label className="font-semibold mr-2">Username:</label>
          {editMode ? (
            <input
              type="text"
              name="username"
              value={editedUser?.username}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p>{user?.username}</p>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <label className="font-semibold mr-2">Email:</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={editedUser?.email}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p>{user?.email}</p>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <label className="font-semibold mr-2">Role:</label>
          <p>{user?.role}</p>
        </div>
        <div className="mb-4 flex items-center">
          <label className="font-semibold mr-2">Gender:</label>
          {editMode ? (
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={editedUser?.gender === 'male'}
                  onChange={handleGenderChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={editedUser?.gender === 'female'}
                  onChange={handleGenderChange}
                  className="form-radio h-5 w-5 text-pink-600"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          ) : (
            <p>{user?.gender}</p>
          )}
        </div>
        {editMode ? (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
