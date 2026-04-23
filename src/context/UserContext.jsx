import { createContext, useState, useEffect } from "react";
import { API } from "../api/API";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("user-token");
    try {
      return savedToken ? JSON.parse(savedToken) : null;
    } catch (err) {
      console.error("no token saved in localStorage: ", err);
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("User");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const addUser = async (newUser) => {
    try {
      const res = await API.post("auth/login", newUser);
      setUser(res.data);
      setToken(res.data.accessToken);
    } catch (err) {
      console.log(err);
    }
  };
  const logout = () => {
    setUser(null);

    setToken(null);
  };

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
    localStorage.setItem("user-token", JSON.stringify(token));
  }, [user, token]);

  return (
    <UserContext.Provider value={{ user, token, addUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
