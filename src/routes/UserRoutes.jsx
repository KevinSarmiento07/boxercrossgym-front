import { Navigate, Route, Routes } from "react-router-dom";
import { UserPage } from "../usuarios/pages/UserPage";
import { RegisterPage } from "../usuarios/pages/RegisterPage";
import NavBar from "../components/layout/NavBar";
import { PagoPage } from "../pagos/pages/PagoPage";
import { PagoRegisterPage } from "../pagos/pages/PagoRegisterPage";
import { EntrenamientoPage } from "../entrenamientos/pages/EntrenamientoPage";
import { EntrenamientoRegisterPage } from "../entrenamientos/pages/EntrenamientoRegisterPage";

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
          <Route
            path="users/edit/:id"
            element={<RegisterPage></RegisterPage>}
          />
          <Route path="/payments" element={<PagoPage></PagoPage>} />
          <Route
            path="/payments/edit/:id"
            element={<PagoRegisterPage></PagoRegisterPage>}
          />
          <Route
            path="/payments/register"
            element={<PagoRegisterPage></PagoRegisterPage>}
          />

          <Route path="/training" element={<EntrenamientoPage />} />
          <Route
            path="/training/register"
            element={<EntrenamientoRegisterPage />}
          />

          <Route path="/" element={<Navigate to={"/users"}></Navigate>} />
        </Route>
      </Routes>
    </>
  );
};
