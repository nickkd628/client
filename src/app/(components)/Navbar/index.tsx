"use client";

import React from "react";
import { Bell, Menu, Moon, Sun, SunDim } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/app/state";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <>
      {/* Glassmorphic Header */}
      <header className="glass-card mx-4 mt-4 p-4">
        <h2 className="text-xl font-semibold gradient-text">
          Inventory Management
        </h2>
      </header>
      {/*  */}

      <div className="flex justify-between items-center w-full mb-7">
        {/* Left side of navbar */}
        <div className="flex justify-between items-center gap-5">
          <button
            className="px-3 py-3 glass-card glass-card-hover rounded-full"
            onClick={toggleSidebar}
          >
            <Menu className="w-4 h-4 text-white/70" />
          </button>
        </div>
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="glass-input pl-10 pr-4 py-2 w-50 md:w-80 text-white placeholder-white/50"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-white/70" size={20} />
          </div>
        </div>

        {/* Right side of navbar */}

        <div className="flex justify-between items-center gap-5">
          <div className="hidden md:flex justify-between items-center gap-5">
            <div>
              <button onClick={toggleDarkMode} className="glass-card-hover p-2 rounded-lg transition-all">
                {isDarkMode ? (
                  <Sun className="cursor-pointer text-white/70 hover:text-white" size={24} />
                ) : (
                  <Moon className="cursor-pointer text-white/70 hover:text-white" size={24} />
                )}
              </button>
            </div>
            <div className="relative glass-card-hover p-2 rounded-lg transition-all">
              <Bell className="cursor-pointer text-white/70 hover:text-white" size={24} />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full glow-purple">
                4
              </span>
            </div>
            <hr className="w-0 h-7 border border-solid border-l border-white/20 mx-3" />
            <div className="flex items-center gap-3 cursor-pointer glass-card-hover p-3 rounded-lg transition-all">
              <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold glow-purple">N</div>
              <span className="font-semibold text-white">Nick Dasilva</span>
            </div>
          </div>
        </div>
      </div>

      {/* </header>   */}
      <h1 className="text-2xl font-bold text-white ml-4 mt-6">Dashboard</h1>
      <div className="space-y-6 ml-4">
        <div>
          <p className="text-white/70">Welcome to your modern inventory management system</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
