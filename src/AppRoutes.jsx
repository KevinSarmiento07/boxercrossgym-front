import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />}></Route>
    </Routes>
  );
};
