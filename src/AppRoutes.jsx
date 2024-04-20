import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useSelector } from "react-redux";
import { SignInPage } from "./pages/sign-in/SignInPage";
import { RoleUserRoute } from "./routes/RoleUserRoute";
import { RegisterFormPage } from "./pages/sign-in/RegisterFormPage";
import { RoleCoachRout } from "./routes/RoleCoachRout";

export const AppRoutes = () => {
  const { isAuth, isAdmin, isEntrenador } = useSelector((state) => state.auth);

  if (isAuth && isAdmin) {
    return (
      <Routes>
        <Route path="/*" element={<UserRoutes />}></Route>
      </Routes>
    );
  }
  if (isAuth && isEntrenador) {
    return (
      <Routes>
        <Route path="/*" element={<RoleCoachRout />}></Route>
      </Routes>
    );
  }
  return (
    <Routes>
      {isAuth ? (
        <>{isAdmin ? <Route path="/*" element={<UserRoutes />}></Route> : <Route path="/*" element={<RoleUserRoute />}></Route>}</>
      ) : (
        <>
          <Route path="/login" element={<SignInPage></SignInPage>}></Route>
          <Route path="/*" element={<SignInPage></SignInPage>}></Route>
          <Route path="/register" element={<RegisterFormPage />}></Route>
        </>
      )}
    </Routes>
  );
};
