import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEmployee } from "../../context/EmployeeContext";
import { useAuth } from "../../context/AuthContext";
import LogoutButton from "../../components/LogoutButton";

function Home() {
  const { employees, deleteEmployee, fetchEmployees } = useEmployee();
  // const { user } = useAuth();


  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <div className="flex items-center bg-blend-darken bg-gray-600">
        <h1 className="text-gray-200 text-4xl max-md:text-3xl max-sd:text-2xl font-semibold text-center p-5 pb-7 underline underline-offset-4 grow">
          Employee Management System
        </h1>
        <span className="me-2 border rounded border-red-500">
          <LogoutButton />
        </span>
      </div>
      <div className="w-9/10 mx-auto mt-5">
        <div>
          <Link to={`/create`} className="update-button px-4 py-2 my-5">
            Add New Employee
          </Link>
        </div>
        {/* min-w-[500px] max-w-[1200px] */}
        <div className="w-full overflow-auto">
          <table border={1} className="my-5 w-8/10 min-w-[600px] ">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { employees.length > 0 ? employees?.map((emp, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      state={emp}
                      to={`/employee`}
                      className="primary-button"
                    >
                      {emp?.employeeName}
                    </Link>
                  </td>
                  <td>{emp?.department}</td>
                  <td>{emp?.position}</td>
                  <td>
                    <Link
                      state={emp}
                      to={`/update/${emp?._id}`}
                      className="update-button py-1.5"
                    >
                      Edit
                    </Link>{" "}
                    <button
                      onClick={() => {
                        deleteEmployee(emp?._id);
                      }}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : 
              (<tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
