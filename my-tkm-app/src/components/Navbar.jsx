import { NavLink } from "react-router-dom";
import {navItems} from "../data/navItems";


const Navbar = () => {

  return (
    <>
      {/* Top Header */}
      <div className= " w-full sticky top-0 left-0 right-0 z-50">

        <div className="bg-white text-red-600 flex justify-center px-4 py-2 font-bold text-2xl">
          TOPSERV
        </div>

        {/* Navigation Menu */}
        <nav className="bg-gray-200 border-b border-gray-400">
          <ul className="flex flex-wrap">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm border-r border-gray-400
                    ${
                      isActive
                        ? "bg-gray-700 text-white"
                        : "hover:bg-gray-300"
                      }`
                    }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>  
    </>
  );
};

export default Navbar;