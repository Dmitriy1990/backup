import { ENDPOINTS, client } from "api";
import { routes } from "constantes/routes";
import React, {
  createContext,
  FC,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "types/users";

type Contex = {
  getUserRoles: (username: string, password: string) => void;
  role: null | USER_ROLES;
  logout: () => void;
};

export const AuthContext = createContext<Contex>({
  getUserRoles: () => {},
  role: null,
  logout: () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<null | USER_ROLES>(null);
  const navigate = useNavigate();
  const authStorage = localStorage.getItem("auth");

  const isAuth = authStorage ? JSON.parse(authStorage) : null;

  useEffect(() => {
    if (isAuth) getUserRoles();
  }, [isAuth]);

  const logout = () => {
    setRole(null);
    localStorage.removeItem("auth");
    navigate(routes.auth);
  };

  const getUserRoles = async (
    username: string = isAuth?.lusername ? isAuth.lusername : "",
    password: string = isAuth?.lpassword ? isAuth.lpassword : ""
  ) => {
    try {
      const res = await client.get(ENDPOINTS.USERS.GET_USER_ROLES, {
        auth: {
          username,
          password,
        },
      });
      if (res.status == 200) {
        if (res.data[0]) {
          setRole(res.data[0]);
          if (
            window.location.pathname === routes.auth ||
            window.location.pathname === routes.selectAccount
          ) {
            res.data[0] === USER_ROLES.GROUP_ADMIN &&
              navigate(routes.adminUsers);
            res.data[0] === USER_ROLES.GROUP_USER &&
              navigate(routes.selectAccount);
          }
        } else {
          setRole(USER_ROLES.GROUP_USER);
          navigate(routes.selectAccount);
        }
      } else {
        setRole(null);
      }
    } catch (e) {
      console.log(e);
      setRole(null);
      localStorage.removeItem("auth");
      navigate(routes.auth);
    }
  };

  return (
    <AuthContext.Provider value={{ getUserRoles, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
