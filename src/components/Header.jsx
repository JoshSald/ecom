import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { NavLink } from "react-router-dom";

export default function Header({ links }) {
  return (
    <header className="p-4 bg-white text-slate-800 shadow-md flex justify-between px-4 md:px-12">
      <h1 className="text-3xl font-bold mb-0">🛍️ Josh's Emporium of Stuff</h1>
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link, i) => (
            <NavigationMenuItem key={i}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 transition-all duration-200 ${
                    isActive
                      ? "text-sky-800 font-bold"
                      : "hover:text-slate-800 hover:font-extrabold hover:underline"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
