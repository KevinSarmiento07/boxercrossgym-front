import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useSelector } from "react-redux";
import { SignInPage } from "./pages/sign-in/SignInPage";
import { RoleUserRoute } from "./routes/RoleUserRoute";

export const AppRoutes = () => {
  const { isAuth, isAdmin } = useSelector((state) => state.auth);
  return (
    <Routes>
      {isAuth ? (
        <>
          {isAdmin ? (
            <Route path="/*" element={<UserRoutes />}></Route>
          ) : (
            <Route path="/*" element={<RoleUserRoute />}></Route>
          )}
        </>
      ) : (
        <>
          <Route path="/login" element={<SignInPage></SignInPage>}></Route>
          <Route path="/*" element={<SignInPage></SignInPage>}></Route>
        </>
      )}
    </Routes>
  );
};
