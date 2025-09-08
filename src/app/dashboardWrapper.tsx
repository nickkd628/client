"use client";
import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      }"flex min-h-screen bg-gray-50 text-gray-900"`}
    >
      <Sidebar />
      <main
        className={`flex-1 p-6" ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        //   // might want to remove this class
        }`}
        // code i got from video but it adds space for no reason which makes it look weird
        // className={"flex-1 p-6"}
        // might want to remove this class
      >
        <div className="flex-1 flex flex-col">
          {/* may need to remove this div, must test line 11  */}
          <Navbar />
          {children}
        </div>
      </main>
    </div>
  );
};
// if anything breaks copy layout back into dashboardWrapper

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
