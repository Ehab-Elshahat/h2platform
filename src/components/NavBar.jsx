/** @format */
// Router
import { Link, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
// import { setAdmin } from "../redux/slices/isAdminSlice";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  // translation
  const { t, i18n } = useTranslation();

  // if user is admin or reader
  const isAdmin = useSelector((state) => state.isAdmin.isAdmin);
  const dispatch = useDispatch();

  // const toggleAdmin = () => {
  //   dispatch(setAdmin(!isAdmin));
  // };

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg md:text-2xl font-bold text-white hidden sm:block "
        >
          H2Platform
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1 md:gap-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-white font-medium transition-colors"
          >
            {t("Posts")}
          </Link>

          {/* User Avatar */}
          {user ? (
            <div className="flex items-center">
              <div className="  w-10 h-10 rounded-full bg-gray-600 hidden items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition md:flex ">
                <img
                  src={user.photo || "https://placehold.co/100x100?text=User"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-blue-400"
                />
              </div>
              {isAdmin ? (
                <Link
                  to={"/addpost"}
                  className="text-gray-300 hover:text-blue-400 transition-colors ml-4"
                >
                  {t("Add Post")}
                </Link>
              ) : (
                ""
              )}

              {/* View User Status  */}
              <span
                className={`ml-3 text-white px-3 py-1 rounded text-sm ${
                  isAdmin ? "bg-green-600" : "bg-blue-600"
                }`}
              >
                {isAdmin ? t("Admin") : t("Reader")}
              </span>

              <Link
                className="text-red-400 hover:text-red-500 transition-colors ml-4"
                onClick={handleLogout}
              >
                {t("Logout")}
              </Link>
            </div>
          ) : (
            <Link
              to={"/"}
              className="ml-3 text-gray-300 hover:text-blue-400 transition-colors"
            >
              {t("Login")}
            </Link>
          )}
          <div className="sm:ml-0 ml-2">
            <button
              className="text-white  text-md cursor-pointer"
              onClick={() => {
                const newLang = i18n.language === "en" ? "ar" : "en";
                i18n.changeLanguage(newLang);
                localStorage.setItem("lang", newLang);
              }}
            >
              {" "}
              {i18n.language === "en" ? "AR" : "EN"}
            </button>
          </div>
          <div className="flex items-center gap-4">
            {/* <button
              onClick={toggleAdmin}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
            >
              Toggle Role
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
