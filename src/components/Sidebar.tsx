import { Link, useLocation } from "react-router-dom";
import co from "../assets/co.svg";

interface ListSidebar {
  title: string;
  path: string;
  icon: string;
}
const Sidebar = () => {
  const location = useLocation().pathname;
  const fnlLocation = location.split("-")[0];

  const mainMenu: ListSidebar[] = [
    {
      title: "Dashboard",
      path: "/",
      icon: "bx bxs-leaf",
    },
    {
      title: "Income",
      path: "/income",
      icon: "bx bxs-leaf",
    },
    {
      title: "Expense",
      path: "/expense",
      icon: "bx bxs-leaf",
    },
    {
      title: "Category",
      path: "/category",
      icon: "bx bxs-leaf",
    },
    {
      title: "Article",
      path: "/expense",
      icon: "bx bxs-leaf",
    },
  ];
  const userManagement: ListSidebar[] = [
    {
      title: "User",
      path: "/dashboard",
      icon: "bx bxs-leaf",
    },
  ];
  return (
    <div className="min-h-screen border-r border-[#55597D] border-opacity-30 w-[320px]">
      <div className=" h-32  px-5 flex items-center justify-center">
        {/* <h3 className="text-2xl  ">ICON</h3> */}
        <img src={co} alt="" />
      </div>
      <div className="px-6 ">
        <div className="border-b border-dashed  border-[#55597D] pb-10 border-opacity-30">
          <span className="text-[#55597D] text-sm mb-5">Main Menu</span>
          {mainMenu.map((val, key) => {
            return (
              <Link to={val.path}>
                <div
                  key={key}
                  className={`flex items-center mt-5 hover:scale-105 transition-all duration-150 ${
                    val.path === fnlLocation && "scale-105 text-sky-400"
                  }`}
                >
                  <i className={`${val.icon}  mr-3`}></i>
                  <span>{val.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-10">
          <span className="text-[#55597D] text-sm mb-5">User Management</span>
          {userManagement.map((val, key) => {
            return (
              <Link to={val.path}>
                <div
                  key={key}
                  className={`flex items-center mt-5 hover:scale-105 transition-all duration-150 ${
                    val.path === fnlLocation && "scale-105 text-sky-400"
                  }`}
                >
                  <i className={`${val.icon}  mr-3`}></i>
                  <span>{val.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
