/** @format */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Already have an account?":"Already have an account?",
          "Don't have an account?":"Don't have an account?",
          "Continue with Google":"Continue with Google",
          "Sign Up":"Sign Up",
          Posts: "Posts",
          "Add Post": "Add Post",
          Admin: "Admin",
          Reader: "Reader",
          Logout: "Logout",
          Login: "Login",
          Save: "Save",
          Cancel: "Cancel",
          Edit: "Edit",
        },
      },
      ar: {
        translation: {
          "Already have an account?":"لديك حساب بالفعل ؟",
          "Don't have an account?":"ليس لديك حساب؟",
          "Continue with Google":"التسجيل بحساب جوجل",
          "Sign Up":'التسجيل',
          Delete:"حذف",
          Edit:"تعديل",
          Cancel: "الغاء",
          Save: "حفظ",
          Posts: "المنشورات",
          "Add Post": "إضافة منشور",
          Admin: "مؤلف",
          Reader: "قارئ",
          Logout: "تسجيل الخروج",
          Login: "تسجيل الدخول",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
