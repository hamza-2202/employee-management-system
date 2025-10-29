import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEmployee } from "../../context/EmployeeContext";
import LogoutButton from "../../components/LogoutButton";

function Update() {
  const { updateEmployee } = useEmployee();
  const { state } = useLocation();
  const { _id, employeeName, email, department, position, salary, address } =
    state;
  const [input, setInput] = useState({
    employeeName,
    email,
    department,
    position,
    salary,
    address,
  });
  const [image, setimage] = useState(null);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employeeName", input.employeeName);
    formData.append("email", input.email);
    formData.append("department", input.department);
    formData.append("position", input.position);
    formData.append("salary", input.salary);
    formData.append("address", input.address);
    if (image) formData.append("image", image);

    await updateEmployee(_id, formData);
    navigate("/");
  };

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
      <form
        onSubmit={handleSubmit}
        className="w-3/7 max-sm:w-4/5 max-md:w-3/5 max-lg:w-1/2 mx-auto my-8 bg-gray-100 max-md:px-5 px-10 py-3 border rounded-3xl"
      >
        <h2 className="text-gray-600 text-3xl max-md:text-2xl max-sd:text-xl font-semibold text-center pb-8 max-sm:pb-5 underline underline-offset-4 bg-blend-darken">
          Update Employee
        </h2>
        <div className="flex items-center">
          <label className="pb-2 pe-2"><span className="text-red-500">*</span>Employee Name:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-2 grow bg-gray-50"
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            value={input.employeeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="pb-2 pe-2"><span className="text-red-500">*</span>Employee Email:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-2 grow bg-gray-50"
            type="text"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="pb-2 pe-2"><span className="text-red-500">*</span>Employee Department:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-2 grow bg-gray-50"
            type="text"
            name="department"
            placeholder="Department"
            value={input.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="pb-2 pe-2"><span className="text-red-500">*</span>Employee Position:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-2 grow bg-gray-50"
            type="text"
            name="position"
            placeholder="Position"
            value={input.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="pb-2 pe-2"><span className="text-red-500">*</span>Employee Salary:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-2 grow bg-gray-50"
            type="text"
            name="salary"
            placeholder="Salary"
            value={input.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="pb-2 pe-2"><span className="text-red-500">*</span>Employee Address:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-2 grow bg-gray-50"
            type="text"
            name="address"
            placeholder="Address"
            value={input.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="pb-2 pe-2">Employee Image:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-2 grow bg-gray-50 text-gray-500"
            type="file"
            name="image"
            placeholder="Employee image"
            onChange={handleFileChange}
          />
        </div>
        <div className="text-sm text-gray-600 my-2">
          Fields with <span className="text-red-500">*</span> are required
        </div>

        <div className="text-center">
          <button>
            <Link to={`/`} className="delete-button mx-4">
              Back
            </Link>
          </button>
          <input
            type="submit"
            value="Update Employee"
            className="update-button mx-auto my-2"
          />
        </div>
      </form>
    </>
  );
}

export default Update;
