import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [blogs] = useState([]); // Assuming blogs will be empty initially
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/register', {
        name,
        email,
        password,
        blogs
      });

      if (response.status === 201) {
        setIsLoggedIn(true);
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-yellow-600 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block text-black">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-black">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-black">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-yellow-600 p-2 rounded-lg hover:bg-yellow-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
