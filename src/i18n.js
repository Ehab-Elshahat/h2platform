/** @format */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const savedLang = localStorage.getItem("lang") || "en";


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Create a Post": "Create a Post",
          "Already have an account?": "Already have an account?",
          "Don't have an account?": "Don't have an account?",
          "Continue with Google": "Continue with Google",
          "Sign Up": "Sign Up",
          Posts: "Posts",
          "Add Post": "Add Post",
          Admin: "Admin",
          Reader: "Reader",
          Logout: "Logout",
          Login: "Login",
          Save: "Save",
          Cancel: "Cancel",
          Edit: "Edit",
          Title: "Title",
          Category: "Category",
          "Select category": "Select category",
          News: "News",
          Tutorial: "Tutorial",
          Announcement: "Announcement",
          Other: "Other",
          "Cover Image": "Cover Image",
          optional: "optional",
          "Choose Image": "Choose Image",
          "No image": "No image",
          Content: "Content",
          "Tip: use a short title and add an image to increase engagement.":
            "Tip: use a short title and add an image to increase engagement.",
          Reset: "Reset",
          "Publish Post": "Publish Post",
          "Submitting...": "Submitting...",
          "The post has been added successfully":
            "The post has been added successfully",
          "The post has been Edit": "The post has been Edit",
          "The post has been deleted": "The post has been deleted",
        },
      },
      ar: {
        translation: {
          "The post has been deleted": "تم تعديل المنشور",
          "The post has been Edit": "تم تعديل المنشور",
          "The post has been added successfully": "تم اضافة المنشور بنجاح",
          "Submitting...": "تقديم...",
          "Publish Post": "نشر المنشور",
          Reset: "اعادة ضبط",
          "Tip: use a short title and add an image to increase engagement.":
            "نصيحة: استخدم عنوانًا قصيرًا وأضف صورة لزيادة التفاعل.",
          Content: "المحتوي",
          "No image": "لايوجد صورة",
          "Choose Image": "اختار الصورة",
          optional: "اختياري",
          "Cover Image": "صورة الغلاف",
          Other: "أخري",
          Announcement: "اعلان",
          Tutorial: "درس تعليمي",
          News: "أخبار",
          "Select category": "اختيار الفئة",
          Category: "الفئة",
          Title: "العنوان",
          "Create a Post": "انشاء ",
          "Already have an account?": "لديك حساب بالفعل ؟",
          "Don't have an account?": "ليس لديك حساب؟",
          "Continue with Google": "التسجيل بحساب جوجل",
          "Sign Up": "التسجيل",
          Delete: "حذف",
          Edit: "تعديل",
          Cancel: "الغاء",
          Save: "حفظ",
          Posts: "المنشورات",
          "Add Post": "إضافة",
          Admin: "مؤلف",
          Reader: "قارئ",
          Logout: " الخروج",
          Login: "تسجيل الدخول",
        },
      },
    },
    lng: savedLang,
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
