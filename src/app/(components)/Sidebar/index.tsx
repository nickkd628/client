"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import {
  ChartNoAxesColumn,
  CircleDollarSign,
  LucideIcon,
  Menu,
  PackageOpen,
  PackageSearch,
  Settings,
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
        className={`cursor-pointer flex items-center rounded-lg glass-card-hover transition-all duration-300 ${
          isCollapsed ? "justify-center py-4" : "justify-start px-4 py-3"
        } ${
          isActive 
            ? "glass-button text-white glow-purple-strong" 
            : "text-white/70 hover:text-white hover:glow-purple"
        } gap-3`}
      >
        <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-white/70"}`} />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium`}
        >{label}</span>
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
  } glass-card transition-all duration-300 overflow-hidden h-full z-40 m-4 mr-0`;

  return (
    <div className={SidebarClassName}>
      {/* TOP LOGO */}
      <div className={`flex items-center ${
        isSidebarCollapsed ? "justify-center" : "justify-between"
      } p-4 border-b border-white/10`}>
        {!isSidebarCollapsed && (
          <h1 className="font-bold text-xl gradient-text">Inventory</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg glass-card-hover transition-colors text-white/70 hover:text-white glow-purple"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <SideBarLink
          href="/dashboard"
          icon={ChartNoAxesColumn}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />

        <SideBarLink
          href="/inventory"
          icon={PackageSearch}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />

        <SideBarLink
          href="/products"
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

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10">
        <p className={`text-center text-xs text-white/60 ${
          isSidebarCollapsed ? "hidden" : "block"
        }`}>
          &copy; 2025 Inventory Management System
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
