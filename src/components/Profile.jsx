import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userBlogs, setUserBlogs] = useState([]);
  const [LogOut, setLogOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Fetch blogs written by the user
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.put(`http://localhost:8000/getData`, {
          email: user?.email,
        });
        setUserBlogs(response.data.Obj.blogs);
      } catch (error) {
        console.error("Error fetching user blogs", error);
      }
    };
    fetchUserBlogs();
  }, [user?.email]);

  // Delete blog function
  const handleDelete = async (blogId) => {
    try {
      const newBlog = userBlogs.filter((blog) => blog.id !== blogId);
      setUserBlogs(newBlog);
      await axios.put(`http://localhost:8000/delete`, {
        blog: newBlog,
        email: user?.email,
      });
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  // Handle the logout
  const handleLogOut = () => {
    setUser(null);
    setLogOut(true);
  };

  // Handle edit mode
  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditingBlog(blog);
  };

  // Save the edited blog
  const handleSaveEdit = async () => {
    try {
      const updatedBlogs = userBlogs.map((b) =>
        b.id === editingBlog.id ? editingBlog : b
      );
      setUserBlogs(updatedBlogs);
      setIsEditing(false);

      // Send updated blog to the backend
      await axios.put(`http://localhost:8000/editBlog`, {
        email: user?.email,
        blog: updatedBlogs,
      });
    } catch (error) {
      console.error("Error updating blog", error);
    }
  };

  if (LogOut) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-black text-black flex flex-col items-center">
      {/* User Profile Info */}
      <div className="bg-yellow-600 p-8 rounded-lg shadow-lg w-80 text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold mb-2">Name:</p>
          <p className="text-lg mb-4">{user?.name || "Guest"}</p>
          <p className="text-xl font-semibold mb-2">Email:</p>
          <p className="text-lg">{user?.email || "Not Available"}</p>
        </div>
        <button
          onClick={handleLogOut}
          className="bg-yellow-400 text-black px-4 mt-2 py-2 rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
        >
          LogOut
        </button>
      </div>

      <div className="w-full max-w-4xl px-4">
        <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>

        {userBlogs && userBlogs.length > 0 ? (
          <ul className="space-y-4">
            {userBlogs.map((blog) => (
              <li
                key={blog.id}
                className="bg-yellow-300 text-black p-6 rounded-lg shadow-md"
              >
                {isEditing && editingBlog?.id === blog.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingBlog.title}
                      onChange={(e) =>
                        setEditingBlog({
                          ...editingBlog,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-yellow-500 rounded mb-2"
                    />
                    <textarea
                      value={editingBlog.description}
                      onChange={(e) =>
                        setEditingBlog({
                          ...editingBlog,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-yellow-500 rounded mb-2"
                      rows="4"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold">{blog.title}</h3>
                    <p className="text-gray-700">By {user?.name}</p>
                    <p className="text-gray-500 text-sm">
                      Published on {new Date(blog.date).toLocaleDateString()}
                    </p>

                    <div className="flex justify-end mt-4 space-x-4">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-yellow-300">
            You haven't written any blogs yet. Click below to add your first
            blog.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
