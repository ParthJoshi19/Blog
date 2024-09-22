import axios from 'axios';
import { useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext, UserContext } from './AuthContext'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); 
  const { user, setUser } = useContext(UserContext);
  const [notLogin, setNotLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const response = await axios.put("http://localhost:8000/login", { email, password });
      if (response.status === 201) {
        setIsLoggedIn(true);
        setUser({
          name: response.data.Obj.name,
          email: email,
          blogs: response.data.Obj.blogs,
        });
      } else if (response.status === 202) {
        setNotLogin(true);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  if (user?.email) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-yellow-400 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-black">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-2 border border-black rounded-lg focus:ring focus:ring-yellow-300"
              required
            />
          </div>
          <div>
            <label className="block text-black">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-2 border border-black rounded-lg focus:ring focus:ring-yellow-300"
              required
            />
          </div>
          <button 
            type="submit" 
            onClick={handleLogin} 
            className="w-full bg-black text-yellow-400 p-2 rounded-lg hover:bg-yellow-600 hover:text-black transition duration-200"
          >
            Login            
          </button>
          {notLogin && (
            <div className="text-black">
              Please <Link to="/Register" className='text-yellow-600'>Register</Link> First
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
