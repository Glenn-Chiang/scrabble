import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-[6vh] p-4">
        <Outlet />
      </div>
    </>
  );
}

export default App;
