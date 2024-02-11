import { Link } from "react-router-dom";
import iconUrl from "/icon.png";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-screen h-[6vh] flex items-center bg-white z-20 shadow text-xl font-bold">
      <Link to={"/"} className="h-full p-2 text-sky-500 flex items-center gap-2">
        <img src={iconUrl} className="w-full h-full" />
        Scrabble
      </Link>
    </nav>
  );
};
