import axios from "axios";
import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext(null);

export const EmployeeContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const URI = "http://localhost:3000/api/v1/employees";

  const checkToken = (message) => {
    if (message === "jwt expired") {
      window.localStorage.clear();
      window.location.href = "/login";
      alert("Token expired. Please login again");
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = window.localStorage.getItem("token");
      console.log(token);

      const response = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.employees);

      checkToken(response.data.message);

      setEmployees(response.data.employees);
      // alert(response.data.message)
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const addEmployee = async (data) => {
    try {
      const token = window.localStorage.getItem("token")
      const response = await axios.post(URI, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      checkToken(response.data.message);

      window.alert("New Employee Added");
      setEmployees([...employees, response.employee]);
      return response;
    } catch (err) {
      alert(`Error: ${err.response.data.message}`);
      console.log(`Error: ${err}`);
    }
  };

  const getSingleEmployee = async (id) => {
    try {
      const response = await axios.get(`${URI}/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      checkToken(response.data.message);
      return response;
    } catch (err) {
      alert(`Error: ${err.response.data.message}`);
      console.log(`Error: ${err}`);
    }
  };

  const updateEmployee = async (id, data) => {
    try {
      const response = await axios.put(`${URI}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      checkToken(response.data.message);
      console.log(response.data.message);
      
      alert(response.data.message)
      return response;
    } catch (err) {
      alert(`Error: ${err.response.data.message}`);
      console.log(`Error: ${err}`);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const confirm = window.confirm(`Are you sure?`);
      if (confirm) {
        const response = await axios.delete(`${URI}/${id}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        checkToken(response.data.message);
        setEmployees(employees.filter((emp) => emp._id !== id));
        window.alert(`Employee Deleted.`);
        return response;
      }
    } catch (err) {
      alert(`Error: ${err.response.data.message}`);
      console.log(`Error: ${err}`);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        fetchEmployees,
        addEmployee,
        getSingleEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);

// export {useEmployee};
