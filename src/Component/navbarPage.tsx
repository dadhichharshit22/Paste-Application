import { NavbarData } from "../data/updateandcreate";
import { NavLink } from "react-router-dom";

interface NavLinkData {
  path: string;
  title: string;
}

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-[45px] flex justify-center items-center p-4 bg-gray-800 gap-x-5">
      {NavbarData.map((link: NavLinkData, idx: number) => (
        <NavLink
          key={idx}
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold text-xl"
              : "text-white font-medium text-xl"
          }
        >
          {link.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
