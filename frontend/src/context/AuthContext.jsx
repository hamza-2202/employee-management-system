import { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    token: "",
  });
  console.log(user);

  const URL = "http://localhost:3000/api/v1/auth";

  const register = async (userData) => {
    try {
      const response = await axios.post(`${URL}/register`, userData);
      console.log(response);
      window.alert(`User Registered successfully.`);

      return true;
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Server Error:", err.response.data);
        window.alert(err.response.data.message || "Registration failed.");
      } else if (err.request) {
        // Request made but no response received
        console.error("No response from server:", err.request);
      } else {
        // Something else caused the error
        console.error("Error:", err.message);
      }
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(`${URL}/login`, credentials);

      window.localStorage.setItem("name", data.user.name);
      window.localStorage.setItem("email", data.user.email);
      window.localStorage.setItem("token", data.token);

      const { token } = data;
      const { name, email } = data.user;

      console.log(data.success);
      
      window.alert(data.message);
      setUser({ name, email, token });

      return data;

    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Server Error:", err.response.data);
        window.alert(err.response.data.message || "Login failed.");
      } else if (err.request) {
        // Request made but no response received
        console.error("No response from server:", err.request);
      } else {
        // Something else caused the error
        console.error("Error:", err.message);
      }
    }
  };

  const logout = () => {
    try {
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("token");
        setUser({
          name: "",
          email: "",
          token: ""
        })
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
