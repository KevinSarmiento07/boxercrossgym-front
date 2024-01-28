import { Navigate, Route, Routes } from "react-router-dom";
import { UserPage } from "../usuarios/pages/UserPage";
import { RegisterPage } from "../usuarios/pages/RegisterPage";
import NavBar from "../components/layout/NavBar";

export const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar></NavBar>}>
          <Route path="users" element={<UserPage></UserPage>} />
          <Route
            path="users/register"
            element={<RegisterPage></RegisterPage>}
          />

          <Route path="/" element={<Navigate to={"/users"}></Navigate>} />
        </Route>
      </Routes>
    </>
  );
};
