import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useSelector } from "react-redux";
import { SignInPage } from "./pages/sign-in/SignInPage";

export const AppRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <Routes>
      {isAuth ? (
        <Route path="/*" element={<UserRoutes />}></Route>
      ) : (
        <>
          <Route path="/login" element={<SignInPage></SignInPage>}></Route>
          <Route path="/*" element={<SignInPage></SignInPage>}></Route>
        </>
      )}
    </Routes>
  );
};
