import React from "react";
import { Menu, MenuProps } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { routeConfig } from "../../../router";

const { Item } = Menu;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  path: string
): MenuItem {
  return {
    key,
    label: (
      <NavLink to={path}>
        <span>{label}</span>
      </NavLink>
    ),
  } as MenuItem;
}

export default function () {
  const { pathname } = useLocation();
  const items = routeConfig.map((route) =>
    getItem(route.title, route.path, route.path)
  );
  return <Menu mode="vertical" selectedKeys={[pathname]} items={items}></Menu>;
}
