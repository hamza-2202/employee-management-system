import { Link, useLocation } from "react-router-dom";
import { useEmployee } from "../context/EmployeeContext";
import LogoutButton from "./LogoutButton";

const ViewSingleEmployee = () => {
  const { state } = useLocation();
  const {
    _id,
    employeeName,
    email,
    department,
    position,
    salary,
    address,
    imageURL,
  } = state;

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
      <div className="w-3/4 mx-auto mt-5">
        <h2 className="text-3xl text-gray-600 font-semibold my-5">
          Employee Information:
        </h2>

        <div className="flex max-sm:flex-col">
          <div className="w-full overflow-auto border-gray-400 border-l-4 ps-3 font-semibold">
            <ul className="employee-list my-5">
              <li>
                Name: <span className="italic font-normal">{employeeName}</span>
              </li>
              <li>
                Email: <span className="italic font-normal">{email}</span>
              </li>
              <li>
                Department:{" "}
                <span className="italic font-normal">{department}</span>
              </li>
              <li>
                Position: <span className="italic font-normal">{position}</span>
              </li>
              <li>
                Salary: <span className="italic font-normal">{salary}</span>
              </li>
              <li>
                Address: <span className="italic font-normal">{address}</span>
              </li>
            </ul>
          </div>

          <div className="emp-img-responsive rounded">
            <img src={imageURL} alt="" className="w-full" />
          </div>
        </div>

        <div className="my-4">
          <Link to={`/`} className="update-button px-4 py-2">
            {"<-"} Back
          </Link>
          <Link state={state} to={`/update/${_id}`} className="update-button px-4 py-2 mx-2">
            Update Employee
          </Link>
        </div>
      </div>
    </>
  );
};

export default ViewSingleEmployee;
