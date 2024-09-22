import { createContext, useState } from 'react';

// Create a context for authentication
export const AuthContext = createContext();
export const UserContext = createContext();

// AuthProvider component to wrap around the components that need login state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    blogs:[{}],
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};
