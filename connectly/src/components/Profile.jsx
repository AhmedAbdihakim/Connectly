import React from "react";

const Profile = ({ currentUser }) => {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-2">User Information</h2>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Name: {currentUser.name}
        </p>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Username: {currentUser.username}
        </p>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Email: {currentUser.email}
        </p>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Address: {currentUser.address.street}, {currentUser.address.suite},{" "}
          {currentUser.address.city}, {currentUser.address.zipcode}
        </p>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Phone: {currentUser.phone}
        </p>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Website: {currentUser.website}
        </p>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Company: {currentUser.company.name}
        </p>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Catch Phrase: {currentUser.company.catchPhrase}
        </p>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Business: {currentUser.company.bs}
        </p>
      </div>
    </div>
  );
};

export default Profile;
