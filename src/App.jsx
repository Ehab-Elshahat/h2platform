/** @format */

// Router
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// css App
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Auth from "./components/Auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { login, logout } from "./redux/slices/authSlice";
import AddPostPage from "./pages/AddPostPage";
import PostsListPage from "./pages/PostsListPage";


function App() {
  // const user = useSelector((state)=> state.auth.user)

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            name: user.displayName || "User",
            email: user.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow  bg-gray-800  ">
        {/* Router Here */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PostsListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addpost"
            element={
              <ProtectedRoute>
                <AddPostPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
        {/*== Router Here== */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
