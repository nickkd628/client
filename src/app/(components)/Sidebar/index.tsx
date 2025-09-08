"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/app/state";
import { isDraft } from "@reduxjs/toolkit";
import {
  Archive,
  ChartNoAxesColumn,
  CircleDollarSign,
  Clipboard,
  Icon,
  Layout,
  LucideIcon,
  Menu,
  PackageOpen,
  PackageSearch,
  Settings,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed?: boolean;
}

const SideBarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center${
          isCollapsed ? "justify-center py-4" : "justify-items-start px8 py-4"
        }
          hover: text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
            isActive ? "bg-blue-500 text-white" : ""
          }
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        ></span>
      </div>
    </Link>
  );
};
// 1:21:40

const Sidebar = () => {
  //1:10:10
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const SidebarClassName = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  }bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={SidebarClassName}>
      {/* TOP LOGO */}
      {/* <div className="flex gap-3 justify-between md:justify-normal items-center pt-8"> */}
      {/* <div>LOGO</div> */}
      {/* <h1 className="font-bold text-xl mb-8">Inventory</h1> ------ 1:15:23 for log and company name on sidebar (not really needed but hey ) */}
      <div className="flex min-h-screen bg-gray-800 text-amber-600">
        <div className="w-64 bg-gray-800 text-gray-900">
          {/* change the background color of the sidebar */}
          <div className="p-4">
            {/* Links */}
            <nav className="space-y-2">
              <SideBarLink
                href="/dashboard"
                icon={ChartNoAxesColumn}
                label="Dashboard"
                isCollapsed={isSidebarCollapsed}
              />

              <SideBarLink
                href="/inventory"
                // inventory
                icon={PackageSearch}
                label="Inventory"
                isCollapsed={isSidebarCollapsed}
              />

              <SideBarLink
                href="/products"
                // inventory
                icon={PackageOpen}
                label="Products"
                isCollapsed={isSidebarCollapsed}
              />

              <SideBarLink
                href="/users"
                icon={User}
                label="Users"
                isCollapsed={isSidebarCollapsed}
              />

              <SideBarLink
                href="/settings"
                icon={Settings}
                label="Settings"
                isCollapsed={isSidebarCollapsed}
              />

              <SideBarLink
                href="/expenses"
                icon={CircleDollarSign}
                label="Expenses"
                isCollapsed={isSidebarCollapsed}
              />
            </nav>
          </div>
        </div>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4 " />
        </button>
      </div>

      {/* FOOTER */}
      <div>
        <p className="text-center text-xs text-gray-500">
          &copy; 2025 Inventory Management System
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
