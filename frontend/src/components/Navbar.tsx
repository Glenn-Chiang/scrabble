import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-screen h-[6vh] px-4 flex items-center bg-white z-20 shadow text-xl ">
      <Link to={'/'} className="text-sky-500">Scrabble</Link>
    </nav>
  )
}