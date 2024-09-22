import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./AuthContext";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog id from the URL
  const [blog, setBlog] = useState(null);
  const { user } = useContext(UserContext);
  const [back, setBack] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getBlog/${id}`);
        setBlog(response.data); // Set the blog data from the response
      } catch (error) {
        console.error("Error fetching blog:", error);
      }

      const response = await axios.put("http://localhost:8000/getBlogs", {
        email: user?.email,
      });
      const newBlog = response.data.allBlogs;
      for (let i = 0; i < newBlog.length; i++) {
        if (newBlog[i].id === id) {
          setBlog(newBlog[i]);
          break;
        }
      }
    };
    getBlogs();
  }, [id, user?.email]);

  if (!blog) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  const handleClick = () => {
    setBack(!back);
  };

  if (back) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 transition-all duration-500 ease-in-out p-8">
      <button
        onClick={handleClick}
        className="bg-yellow-500 text-black px-4 py-2 mt-2 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105"
      >
        Back
      </button>
      <div className="max-w-3xl mx-auto bg-yellow-600 text-black p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-300 mb-2">By {blog.author}</p>
        <p className="text-gray-200 mb-4">Published on {blog.date}</p>
        <div className="text-lg">
          {blog.description} {/* Display the full content of the blog */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
