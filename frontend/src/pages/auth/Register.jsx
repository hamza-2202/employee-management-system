import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const defaultInput = {
    username: "",
    email: "",
    password: ""
  }

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      if(await register(input)){
        navigate(`/`);
      }
      setInput(defaultInput)
    }catch(err){
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-gray-200 text-4xl max-md:text-3xl max-sd:text-2xl font-semibold text-center p-5 pb-7 underline underline-offset-4 bg-blend-darken bg-gray-600">
        Employee Management System
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-3/7 max-sm:w-4/5 max-md:w-3/5 max-lg:w-1/2 mx-auto my-15 bg-gray-100 max-md:px-5 px-10 py-3 border rounded-3xl"
      >
        <h2 className="text-gray-600 text-4xl max-md:text-2xl max-sd:text-xl font-semibold text-center p-5 max-sm:pb-5 underline underline-offset-4 bg-blend-darken">
          Register
        </h2>
        <div className="flex items-center">
          <label className="pb-3 pe-3">User Name:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-4 grow bg-gray-50"
            type="text"
            name="username"
            placeholder="Enter User Name"
            value={input.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="pb-3 pe-3">Email:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-4 grow bg-gray-50"
            type="text"
            name="email"
            placeholder="Enter your email here"
            value={input.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="pb-3 pe-3">Password:</label>
          <input
            className="border border-gray-400 rounded p-1 mt-1 mb-4 grow bg-gray-50"
            type="password"
            name="password"
            placeholder="password"
            value={input.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-center my-1">
          <input
            type="submit"
            value="Register"
            className="update-button mx-auto my-3"
          />
        </div>
        <div className="mb-3">
          <p>
            Already have an account{" "}
            <Link
              to={`/`}
              className="text-gray-500 underline hover:no-underline hover:text-gray-400 underline-offset-2 cursor-pointer"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Register;
