import React, { cloneElement, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import Layout from "../pages/components/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import CMS from "../pages/CMS";
import NotFound from "../pages/NotFound";
import Chat from "../pages/AI";

// const Login = lazy(() => import("../pages/Login"));
// const Dashboard = lazy(() => import("../pages/Dashboard"));
// const User = lazy(() => import("../pages/User"));

type Component = {
  (...args: any[]): React.JSX.Element;
  getServerSideProps?: (store: any) => Promise<any>;
};

export type IRoute = {
  path?: string;
  element?: React.JSX.Element;
  component?: Component;
  children?: IRoute[];
};

export const routerConfig: IRoute[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Chat />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/cms",
        element: <CMS />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export const menu = [
  {
    title: "AI",
    path: "/",
    icon: <DashboardOutlined />,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlined />,
  },
  {
    title: "User",
    path: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "CMS",
    path: "/cms",
    icon: <FileImageOutlined />,
  },
];

const renderRoutes = (routes = routerConfig) => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const key = route.path ?? index;
        if (route.children) {
          return (
            <Route
              key={key}
              element={
                route.path
                  ? route.element
                  : cloneElement(route.element, {
                      children: renderRoutes(route.children),
                    })
              }
              path={route.path ?? "/*"}
            />
          );
        }
        return <Route key={key} element={route.element} path={route.path} />;
      })}
    </Routes>
  );
};

export default renderRoutes;
