import { Link } from "react-router-dom";
import iconUrl from "/icon.png";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-screen h-[6vh] px-4 flex items-center bg-white z-20 shadow text-xl font-bold">
      <Link to={"/"} className="text-sky-500 flex items-center gap-2">
        <img src={iconUrl} className="w-10 h-10" />
        Scrabble
      </Link>
    </nav>
  );
};
