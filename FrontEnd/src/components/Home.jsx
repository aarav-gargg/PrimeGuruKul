import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  
  const { email, name } = location.state || {}; 

  console.log(location.state)

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
      <div className="text-center text-white p-8 bg-opacity-75 bg-black rounded-lg shadow-lg">
        {name && email && (
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Welcome, {name}!</h1>
            <p className="text-sm text-gray-300">Email: {email}</p>
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="bg-white text-indigo-500 px-6 py-3 rounded-lg font-medium shadow-md hover:bg-indigo-500 hover:text-white transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-500 px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
