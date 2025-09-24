/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Auth() {
  // translation
  const { t} = useTranslation();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  // ✅ Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(
        login({
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error.message);
      setError(error.message);
    }
  };

  // ✅ Email/Password (login or signup)
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let result;
      if (isLogin) {
        result = await signInWithEmailAndPassword(auth, email, password);
      } else {
        result = await createUserWithEmailAndPassword(auth, email, password);
      }

      dispatch(
        login({
          uid: result.user.uid,
          name: result.user.displayName || "User",
          email: result.user.email,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Auth failed:", error.message);
      setError(error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-scree bg-gray-800"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96">
        {user ? (
          ""
        ) : (
          // ✅ If not logged in
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              {isLogin ? t("Login") : t("Sign Up")}
            </h2>

            {error && (
              <p className="bg-red-500 text-white p-2 rounded mb-4 text-sm">
                {error}
              </p>
            )}

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                autoComplete="true"
                placeholder="Password (min 6 chars)"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isLogin ? t("Login") : t("Sign Up")}
              </button>
            </form>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
            >
              {t("Continue with Google")}
            </button>

            <p className="text-gray-400 text-sm text-center mt-4">
              {isLogin ? t("Don't have an account?") : t("Already have an account?")}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 cursor-pointer hover:underline"
              >
                {isLogin ? t("Sign Up") : t("Login")}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
