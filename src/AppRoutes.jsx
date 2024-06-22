import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useSelector } from "react-redux";
import { SignInPage } from "./pages/sign-in/SignInPage";
import { RoleUserRoute } from "./routes/RoleUserRoute";
import { RegisterFormPage } from "./pages/sign-in/RegisterFormPage";
import { RoleCoachRout } from "./routes/RoleCoachRout";
import { ForgotPasswordPage } from "./pages/sign-in/ForgotPasswordPage";

export const AppRoutes = () => {
  const { isAuth, isAdmin, isEntrenador } = useSelector((state) => state.auth);

  return (
    <Routes>
      {isAuth ? (
        <>
          {isAdmin ? <Route path="/*" element={<UserRoutes />}></Route> : isEntrenador ? <Route path="/*" element={<RoleCoachRout />}></Route> : <Route path="/*" element={<RoleUserRoute />}></Route>}
        </>
      ) : (
        <>
          <Route path="/login" element={<SignInPage></SignInPage>}></Route>
          <Route path="/*" element={<SignInPage></SignInPage>}></Route>
          <Route path="/register" element={<RegisterFormPage />}></Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}> </Route>
        </>
      )}
    </Routes>
  );
};
