import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './AuthContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const EditBlog = () => {
  const [blog,setBlog]=useState([]);
  const [title, setTitle] = useState(blog.title || '');
  const [description, setDescription] = useState(blog.description || '');
  const { user } = useContext(UserContext);
  const [submit, setSubmit] = useState(false);


  

  // Handle blog submission for editing
  const handleBlogSubmission = async () => {
    try {
      // Ensure both fields are filled
      
      if (title && description) {
        // Prepare the blog data for update
        const blogData = {
          email: user?.email,
          title,
          description,
          id: blog.id, // Use the existing blog id
        };

        // Update existing blog (no new blog creation logic)
        await axios.put('http://localhost:8000/updateBlog', blogData);

        // Reset form and trigger redirect after successful update
        setTitle('');
        setDescription('');
        setSubmit(true); // Redirect after submission
      } else {
        alert('Please fill in both fields.');
      }
    } catch (error) {
      console.error('Error in blog update:', error);
    }
  };

  // Redirect to homepage after successful submission
  if (submit) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        {'Edit Blog'}
      </h1>
      <form className="space-y-4">
        <div>
          <label className="block text-lg mb-2" htmlFor="title">Blog Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter the blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border-2 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-lg mb-2" htmlFor="description">Blog Description</label>
          <textarea
            id="description"
            placeholder="Enter the blog description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border-2 p-2 rounded"
            rows="4"
          />
        </div>
        <button
          type="button"
          onClick={handleBlogSubmission}
          className="bg-purple py-2 px-4 rounded hover:bg-purple-900 bg-purple-600 border-black border-2 text-white"
        >
          {'Submit'}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
