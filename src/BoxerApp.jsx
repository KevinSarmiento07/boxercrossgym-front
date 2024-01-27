import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppRoutes } from "./AppRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";
export const BoxerApp = () => {
  return (
    <>
      <Provider store={store}>
        <AppRoutes></AppRoutes>
      </Provider>
    </>
  );
};
