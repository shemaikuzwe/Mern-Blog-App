import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const sessionContext = createContext();

export default function SessionProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState({
    status: "unauthenticated",
    user: {},
  });
  const navigate = useNavigate();
  const getSession = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://mern-blog-app-2ha2.onrender.com/auth/session", {
        withCredentials: true,
      });
      if (res.status == 200) {
        setSession({
          status: "authenticated",
          user: res.data,
        });
        setLoading(false);
        return;
      }
    } catch (e) {
      setSession({
        status: "unauthenticated",
        user: {},
      });
      console.log(e);
    }
  };
  useEffect(() => {
    getSession();
  }, []);
  const clearSession = () => {
    setSession({
        status: "unauthenticated",
        user: {},
      });
  };
  return (
    <sessionContext.Provider value={{ session, clearSession }}>
      {children}
    </sessionContext.Provider>
  );
}
export const useSession = () => {
  return useContext(sessionContext);
};
