import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import SignUp from "./pages/signup/SignUp.tsx";
import SignIn from "./pages/signin/SignIn.tsx";
import { ROUTES } from "./contants/routes.ts";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import SideBarMenu from "./components/sidebarmenu/SideBarMenu.tsx";
import MyTask from "./pages/mytask/MyTask.tsx";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.HOME} element={<App />}>
      <Route
        path={ROUTES.HOME}
        element={
          <SideBarMenu>
            <Dashboard />
          </SideBarMenu>
        }
      />
      <Route
        path={ROUTES.MYTASK}
        element={
          <SideBarMenu>
            <MyTask />
          </SideBarMenu>
        }
      />
      <Route path={ROUTES.SIGNIN} element={<SignIn />} />
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={routes} />
    </RecoilRoot>
  </React.StrictMode>
);
