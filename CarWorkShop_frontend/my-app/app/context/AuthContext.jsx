"use client"; // للسماح باستخدام مكونات المتصفح

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // تحميل البيانات من localStorage في بيئة المتصفح
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTokens = localStorage.getItem("authTokens");
      if (storedTokens) {
        const parsedTokens = JSON.parse(storedTokens);
        setAuthTokens(parsedTokens);
        setUser(jwtDecode(parsedTokens.access));
      }
    }
    setLoading(false);
  }, []);

  const signupUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://192.168.1.3:8000/api/register/",
        formData
      );

      if (response.status === 201) {
        toast.success("تم التسجيل بنجاح! يرجى تسجيل الدخول.");
        router.push("/login");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.email) {
          toast.error(error.response.data.email); // عرض رسالة الخطأ الخاصة بالبريد الإلكتروني
        } else {
          toast.error("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
        }
      } else {
        toast.error("حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
      }
    }
  };

  const loginUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://192.168.1.3:8000/api/api/token/",
        formData
      );

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        toast.success("تم تسجيل الدخول بنجاح!");
        router.push("/home");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("كلمة المرور أو البريد الإلكتروني غير صحيح.");
        } else {
          toast.error("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.");
        }
      } else {
        toast.error("حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
      }
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    toast.success("تم تسجيل الخروج بنجاح!");
    router.push("/login");
  };

  useEffect(() => {
    const updateToken = async () => {
      if (!authTokens?.refresh) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://192.168.1.3:8000/api/api/token/refresh/",
          { refresh: authTokens.refresh }
        );

        if (response.status === 200) {
          const data = response.data;
          setAuthTokens(data);
          setUser(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
          logoutUser();
        }
      } catch (error) {
        console.error("Error during token refresh:", error);
        logoutUser();
      }

      if (loading) {
        setLoading(false);
      }
    };

    if (loading) {
      updateToken();
    }

    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 1000 * 60 * 4);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    signupUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};
