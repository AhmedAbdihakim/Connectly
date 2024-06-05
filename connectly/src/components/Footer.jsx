import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <nav className="sm:hidden flex w-screen fixed bottom-0 dark:bg-gray-800 rounded-t">
      <ul className="flex w-screen justify-between p-8">
        <li>
          <Link to="/">
            <FaHome />
          </Link>
        </li>
        <li>
          <CiSearch />
        </li>
        <li>
          <Link to="/newPost">
            <IoMdAdd />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser className="text-black dark:text-gray-100" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
