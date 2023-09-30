import "./App.css";
import { useProduct } from "./contexts/productsContext";
import UnauthenticationApp from "./pages/UnauthenticationApp";
import AuthenticationApp from "./pages/AuthenticationApp";
import { useEffect } from "react";

function App() {
  const { session, setSession, }: any = useProduct();
  useEffect(() => {
    const isAuthenticated = Boolean(sessionStorage.getItem("session"));
    setSession(isAuthenticated);
  }, [])

  return (
    session ? <AuthenticationApp /> : <UnauthenticationApp />  
  );
}

export default App;
