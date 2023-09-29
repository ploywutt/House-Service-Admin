import "./App.css";
import { useProduct } from "./contexts/productsContext";
import UnauthenticationApp from "./pages/UnauthenticationApp";
import AuthenticationApp from "./pages/AuthenticationApp";
import { supabase } from "./lib/supabase.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const { session, setSession }: any = useProduct();
  const navigate = useNavigate();
  const restoreSession = async () => {
    const sessionData = localStorage.getItem('session');
    const refreshData = localStorage.getItem('refresh')

    // ตรวจสอบว่ามี sessionData และ refreshData ใน localStorage
    if (sessionData && refreshData) {
      const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshData })
      localStorage.setItem('session', String(data.session?.access_token))
      localStorage.setItem('refresh', String(data.session?.refresh_token))

      const isAuthenticated = Boolean(localStorage.getItem("session"));
      setSession(isAuthenticated)
    } else {
      const { error } = await supabase.auth.signOut();
      localStorage.removeItem("session")
      localStorage.removeItem("refresh")
      setSession(false)
      navigate("/")
    }
  }

  useEffect(() => {
    restoreSession()
  }, [session])

  return (
    !session ? <UnauthenticationApp /> : <AuthenticationApp />
  );
}

export default App;
