import React from "react";
import Navbar from "@/app/(components)/Navbar";
import Link from "next/link";
// import {useRouter} from "next/navigation
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Simple Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="font-bold text-xl mb-8">Inventory</h1>
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="flex items-center space-x-3 p-3 rounded-lg bg-blue-600"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
            >
              <span>📦</span>
              <span>Products</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
            >
              <span>📈</span>
              <span>Analytics</span>
            </a>
            <Link
              href="/settings"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700"
            >
              <span>⚙️</span>
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      {/* if anything does break move the code from Navbar/index.tsx  back between lines 35 and 40 */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
