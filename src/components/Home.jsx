import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, UserContext } from "./AuthContext";
import axios from "axios";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.put("http://localhost:8000/getBlogs", {
          email: user?.email,
        });
        setBlogs(response.data.allBlogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-yellow-400 transition-all duration-500 ease-in-out">
      <nav className="fixed top-0 left-0 w-full bg-yellow-600 p-4 flex justify-between items-center shadow-lg z-10">
        <h1 className="text-4xl text-white font-bold">My Blogs</h1>
        <ul className="flex gap-5 items-center">
          {isLoggedIn && user?.email ? (
            <>
              <Link to="/AddNew">
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105">
                  Add New Blog
                </button>
              </Link>
              <Link to="/Profile">
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105">
                  Profile
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Login">
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105">
                  Login
                </button>
              </Link>
              <Link to="/Register">
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105">
                  Register
                </button>
              </Link>
            </>
          )}
        </ul>
      </nav>

      {/* Content Area */}
      <div className="pt-20 container mx-auto mt-6 p-4">
        <h2 className="text-4xl font-bold mb-6">Blog List</h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent text-yellow-400" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-300">Error: {error}</p>
        ) : (
          <ul className="space-y-4">
            {blogs &&
              blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="bg-black ml-6 text-yellow-400 p-4 border-2 border-white hover:border-4 hover:border-black rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:bg-white hover:shadow-lg hover:shadow-white hover:text-black scale-105"
                >
                  <h3 className="text-2xl font-semibold">{blog.title}</h3>
                  <p className="">By {blog.author}</p>
                  <p className="text-sm">Published on {blog.date}</p>
                  <Link to={`/blog/${blog.id}`}>
                    <button className="bg-yellow-500 text-black px-4 py-2 mt-2 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105">
                      View Blog
                    </button>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
