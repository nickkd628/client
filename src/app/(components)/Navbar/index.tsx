"use client";

import React from "react";
import { Bell, Menu, Sun } from "lucide-react";

const Navbar = () => {
  return (
    <>
      {/* added fragments to wrap the header rather then having th divs wrapped in the header component */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Inventory Management
        </h2>
      </header>
      {/*  */}

      <div className="flex justify-between items-center w-full mb-7">
        {/* Left side of navbar */}
        <div className=" justify-between items-center gap-5">
          <button
            className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
            onClick={() => {}}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>

        {/* Right side of navbar */}

        <div className="flex justify-between items-center gap-5">
          <div className="hidden md:flex justify-between items-center gap-5">
            <div>
              <button onClick={() => {}}>
                <Sun className="cursor-pointer text-gray-500" size={24} />
              </button>
            </div>
            <div className="relative">
              <Bell className="cursor-pointer text-gray-500" size={24} />
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs front-semibold leading-none text-red-500 rounded-full ">
                {/* hardcoded number of items in notification area need to be changed to the actual number of items in the notification area */}
                4
              </span>
            </div>
            <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
            <div className=" flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9"> image</div>
              {/* Place holder */}
              <span className=" front-semibold">Nick Dasilva</span>
            </div>
          </div>
        </div>
      </div>

      {/* </header>   */}
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="space-y-6">
        <div>
          <p className="text-gray-600">lets see how this looks</p>
          {/* either change it later down the line or remove it (not 100% sure if i want to keep this little area yet) */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
