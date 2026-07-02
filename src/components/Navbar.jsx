import todoLogo from "../assets/todo-logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="px-10 flex justify-between items-center">
        <div className="logo">
          <img src={todoLogo} alt="logo" className="h-[60px] w-20" />
        </div>
        <div className="flex space-x-7">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/tasks" className="text-gray-700 hover:text-blue-500">
            Task
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500">
            About
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
