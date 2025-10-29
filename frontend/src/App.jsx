import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/employees/Home";
import Create from "./pages/employees/Create";
import Update from "./pages/employees/Update";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ViewSingleEmployee from "./components/ViewSingleEmployee";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<ViewSingleEmployee />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
