import { useEffect, useState } from 'react'
import NewBlog from './components/NewBlog';
import Login from './components/Login';
import Home from './components/Home';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Register from './components/Register';
// import { AuthProvider } from './AuthContext';
import { AuthProvider } from './components/AuthContext';
import Profile from './components/Profile';
import EditBlog from './components/EditBlog';
import BlogDetail from './components/BlogDetails';
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/AddNew",
      element:<NewBlog/>
    },
    {
      path:"/Login",
      element:<Login/>
    },
    {
      path:"/Register",
      element:<Register/>
    },
    {
      path:"/Profile",
      element:<Profile/>
    }
    ,
    {
      path:"/EditBlog",
      element:<EditBlog/>
    },
    {
      path:"/blog/:id",
      element:<BlogDetail/>
    }
  ])

  useEffect(()=>{
      const fetchData=async()=>{
        const response = await fetch("http://localhost:8000/");
        const result = await response.json();
        console.log(result.msg);
      } 
      fetchData();
  },[])

  return (
    <div>
      <AuthProvider><RouterProvider router={router}/></AuthProvider>
      
    </div>
  )
}

export default App
