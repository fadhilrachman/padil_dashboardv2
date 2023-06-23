import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebar, setSidebar] = useState<boolean>(true);
  return (
    <div className="flex w-full">
      <Sidebar menu={sidebar} />
      <div
        className={`w-full  overflow-y-auto transition-all duration-150  ${
          sidebar ? "ml-[270px]" : "ml-0"
        }`}
      >
        <Navbar click={() => setSidebar(!sidebar)} />
        <div className="p-5 min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
