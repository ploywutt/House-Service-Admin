import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Services from "./pages/Services";
import Promotion from "./pages/Promotion";
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* ลบตัวอย่างออกแล้วใส่เฉพาะ Route ที่ทำนะคับ เพื่อป้องกัน conflict คับ */}
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/categories/*" element={<Category />} />
          <Route path="/services/*" element={<Services />} />
          <Route path="/promotions/*" element={<Promotion />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
