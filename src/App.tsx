import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import NotFoundPage from './pages/NotFoundPage'
import CategoryAdd from "./pages/CategoryAdd";
import CategorySearch from "./pages/CategorySearch";
import CategoryEdit from "./pages/CategoryEdit";
import CategoryDetail from "./pages/CategoryDetail";
import ServiceAdd from "./pages/ServiceAdd";
import ServiceSearch from "./pages/ServiceSearch";
import ServiceEdit from "./pages/ServiceEdit";
import ServiceDetail from "./pages/ServiceDetail";
import PromotionSearch from "./pages/PromotionSearch";
import PromotionAdd from "./pages/PromotionAdd";
import PromotionEdit from "./pages/PromotionEdit";
import PromotionDetail from "./pages/PromotionDetail";

function App() {
  return (
    // <Router>
      <Routes>
        {/* ลบตัวอย่างออกแล้วใส่เฉพาะ Route ที่ทำนะคับ เพื่อป้องกัน conflict คับ */}
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/categories/*">
            <Route path="" element={<CategorySearch />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
            <Route path="detail/:id" element={<CategoryDetail />} />
          </Route>
          <Route path="/services/*">
            <Route path="" element={<ServiceSearch />} />
            <Route path="add" element={<ServiceAdd />} />
            <Route path="edit/:id" element={<ServiceEdit />} />
            <Route path="detail/:id" element={<ServiceDetail />} />
          </Route>
          <Route path="/promotions/*">
            <Route path="" element={<PromotionSearch />} /> 
            <Route path="add" element={<PromotionAdd />} /> 
            <Route path="edit/:id" element={<PromotionEdit />} /> 
            <Route path="detail/:id" element={<PromotionDetail />} /> 
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    // </Router>
  );
}

export default App;
