import React, { useContext, useState } from 'react';
import { UserContext } from './AuthContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const NewBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(UserContext);
  const [submit, setSubmit] = useState(false);
  
  const handleBlogSubmission = async () => {
    try {
      const id = uuidv4();
      const blogData = {
        email: user?.email,
        title,
        description,
        author: user?.name,
        date: new Date().toISOString(), // Capture current date in ISO format
        id: id 
      };

      if (title && description) {
        // Create new blog
        await axios.post("http://localhost:8000/Addnew", blogData);
        setTitle('');
        setDescription('');
        setSubmit(true); // Redirect after submission
      } else {
        alert('Please fill in both fields.');
      }
    } catch (error) {
      console.error('Error in submission:', error);
    }
  };

  if (submit) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {'Create a Blog'}
      </h1>
      <form className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block text-lg mb-2" htmlFor="title">Blog Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter the blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border-2 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <div>
          <label className="block text-lg mb-2" htmlFor="description">Blog Description</label>
          <textarea
            id="description"
            placeholder="Enter the blog description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border-2 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            rows="4"
          />
        </div>
        <button
          type="button"
          onClick={handleBlogSubmission}
          className="w-full bg-yellow-600 text-black py-2 rounded-lg hover:bg-yellow-700 transition duration-200"
        >
          {'Submit'}
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
