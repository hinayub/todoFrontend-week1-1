import todoLogo from "../assets/todo-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const getInitial = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return "";
  };

  return (
    <nav>
      <div className="px-10 flex justify-between items-center">
        <div className="logo">
          <img src={todoLogo} alt="logo" className="h-[60px] w-20" />
        </div>
        <div className="flex space-x-7 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/tasks" className="text-gray-700 hover:text-blue-500">
            Task
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500">
            About
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-500">
                Login
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-500">
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{getInitial()}</span>
                </div>
                <span className="text-gray-700">{user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
