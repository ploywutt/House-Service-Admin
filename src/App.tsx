import "./App.css";
import { useProduct } from "./contexts/productsContext";
import UnauthenticationApp from "./pages/UnauthenticationApp";
import AuthenticationApp from "./pages/AuthenticationApp";

function App() {
  const { isSession }: any = useProduct();

  return (
    isSession ? <AuthenticationApp /> : <UnauthenticationApp />
  );
}

export default App;
