import { Link } from "react-router-dom";
import Connectly from "../assets/Connectly.png";
import { FaUser } from "react-icons/fa";

const Navbar = ({ handleLogOut, username }) => {
  return (
    <nav className="flex justify-between items-center h-20 px-8">
      <img src={Connectly} alt="Logo" className="h-10 w-16" />
      <ul className="flex space-x-10">
        <li>
          <Link to="/">For you</Link>
        </li>
        <li>
          <Link to="/myPosts">My posts</Link>
        </li>
        <li>
          <Link to="/newPost">New post</Link>
        </li>
      </ul>
      <ul className="flex space-x-8">
        <li>{username}</li>
        <li>
          <Link to="/profile">
            <FaUser className="text-black dark:text-gray-100" />
          </Link>
        </li>
        <li>
          <button onClick={handleLogOut}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
