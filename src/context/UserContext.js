import React, { createContext, useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { jwtDecode } from 'jwt-decode';  // Import jwtDecode for decoding tokens

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          name: decodedToken.name,
          email: decodedToken.email,
          username: decodedToken.username || 'User',
        });
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
