import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { routes } from "./constantes/routes";
import { Auth } from "./pages/auth";
import { SelectAccount } from "./pages/selectAccount";
import { Detailed } from "pages/detailed";
import { PrivateRoute } from "components/privateRoute";
import { AdminUsers } from "pages/admin/users";
import { AdminAccounts } from "pages/admin/accounts";
import { AdminJobs } from "pages/admin/jobs";
import { AdminAddUser } from "pages/admin/addUser";
import { AdminAddAccounts } from "pages/admin/addAccount";
import { AdminAddJobs } from "pages/admin/addJobs";
import { AuthProvider } from "context/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path={routes.main}
            element={
              <PrivateRoute>
                <SelectAccount />
              </PrivateRoute>
            }
          />

          <Route path={routes.auth} element={<Auth />} />

          <Route
            path={routes.selectAccount}
            element={
              <PrivateRoute>
                <SelectAccount />
              </PrivateRoute>
            }
          />

          <Route
            path={routes.detailed}
            element={
              <PrivateRoute>
                <Detailed />
              </PrivateRoute>
            }
          />

          <Route
            path={routes.detailed + "/:id"}
            element={
              <PrivateRoute>
                <Detailed />
              </PrivateRoute>
            }
          />

          <Route
            path={routes.adminAccounts}
            element={
              <PrivateRoute>
                <AdminAccounts />
              </PrivateRoute>
            }
          />

          <Route
            path={routes.adminUsers}
            element={
              <PrivateRoute>
                <AdminUsers />
              </PrivateRoute>
            }
          />

          <Route
            path={routes.adminJobs}
            element={
              <PrivateRoute>
                <AdminJobs />
              </PrivateRoute>
            }
          />

          <Route
            path={routes.adminAddUser}
            element={
              <PrivateRoute>
                <AdminAddUser />
              </PrivateRoute>
            }
          />

          <Route
            path={routes.adminAddJobs}
            element={
              <PrivateRoute>
                <AdminAddJobs />
              </PrivateRoute>
            }
          />

          <Route
            path={routes.adminAddAccount}
            element={
              <PrivateRoute>
                <AdminAddAccounts />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
