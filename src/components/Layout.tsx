import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
