import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import CategorySearch from "./pages/CategorySearch";
import Services from "./pages/Services";
import Promotion from "./pages/Promotion";
import NotFoundPage from './pages/NotFoundPage'
import CategoryAdd from "./pages/CategoryAdd";
import CategoryEdit from "./pages/CategoryEdit";
import CategoryDetail from "./pages/CategoryDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* ลบตัวอย่างออกแล้วใส่เฉพาะ Route ที่ทำนะคับ เพื่อป้องกัน conflict คับ */}
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/categories/*">
            <Route path="" element={<CategorySearch />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path="edit" element={<CategoryEdit />} />
            <Route path="detail" element={<CategoryDetail />} />
          </Route>
          <Route path="/services/*" element={<Services />} />
          <Route path="/promotions/*" element={<Promotion />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
