import { useNavigate, useLocation } from "react-router-dom";
import CategoryIcon from "../../assets/icon/category.svg";
import HomeServiceIcon from "../../assets/icon/homeservices.png";
import LogoutIcon from "../../assets/icon/logout.svg";
import PromotionIcon from "../../assets/icon/promotion.svg";
import ServiceIcon from "../../assets/icon/service.svg";
import { supabase } from '../../lib/supabase.ts'
import { useState, useEffect } from "react";
import { useProduct } from "@/contexts/productsContext.tsx";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLi, setActiveLi] = useState<string>('')
  const { setSession }:any = useProduct();

  // สร้างอาร์เรย์ของ object ที่มี key = path และ value = state
  const pathStatePairs = [
    { path: '/categories', state: 'categories' },
    { path: '/services', state: 'services' },
    { path: '/promotions', state: 'promotions' },
  ];

  function handleClick(selectedLi: string) {
    setActiveLi(selectedLi) // update state when clicked
    // navigate to path that be chosen
    const matchingPair = pathStatePairs.find(pair => pair.state === selectedLi);
    if (matchingPair) {
      // ฟังก์ชันใน JavaScript ที่ใช้ในการเปลี่ยน URL แท็บโดยไม่ต้องโหลดหน้าเว็บใหม่ (ไม่ต้อง refresh) ซึ่งเป็นสิ่งสำคัญในการสร้างแอปพลิเคชันเว็บแบบเสมือนจริง (SPA - Single Page Application) เนื่องจากสามารถบริหารจัดการการนำทางและสถานะโดยที่ไม่ต้องโหลดหน้าเว็บใหม่ทุกครั้งที่มีการคลิก.
      window.history.pushState(null, '', matchingPair.path);
      // window.history.pushState(state, title, url);
      navigate(matchingPair.path);
    }
  }

  useEffect(() => {
    const matchingPair = pathStatePairs.find(pair => location.pathname.startsWith(pair.path));
    setActiveLi(matchingPair ? matchingPair.state : location.pathname.split('/')[1]);
  }, [location.pathname]);
  

  async function signOutUser() {
    await supabase.auth.signOut();
    localStorage.removeItem("session")
    localStorage.removeItem("refresh")
    setSession(false)
    navigate('/')
  }

  return (
    <div id="container" className="flex-none w-[240px] h-screen bg-blue-950 pt-6 sticky top-0">
      <div
        id="logo-bg"
        className="bg-blue-100 mb-7 rounded-xl flex flex-row items-center py-2 px-2.5 gap-1 mx-6"
      >
        <img src={HomeServiceIcon} alt="HomeServices Icon" id="logo" />
        <p className="text-blue-600 text-xl font-medium">HomeServices</p>
      </div>
      <div id="menu-list-container">
        <ul className="text-gray-100 h-[calc(100vh-109px)] flex flex-col justify-between pb-16">
          <div id="menu-list">
            <li className={`menu ${activeLi === 'categories' ? "bg-blue-900" : ""}`} onClick={() => handleClick('categories')}>
              <img src={CategoryIcon} alt="Category Icon" />
              <h5>หมวดหมู่</h5>
            </li>
            <li className={`menu ${activeLi === 'services' ? "bg-blue-900" : ""} `} onClick={() => handleClick('services')}>
              <img src={ServiceIcon} alt="Service Icon" />
              <h5>บริการ</h5>
            </li>
            <li className={`menu ${activeLi === 'promotions' ? "bg-blue-900" : ""} `} onClick={() => handleClick('promotions')}>
              <img src={PromotionIcon} alt="Promotion Icon" />
              <h5>Promotion Code</h5>
            </li>
          </div>
          <li className="menu">
            <h3 onClick={() => navigate("/employee")}>Go to Techician Page</h3>
          </li>
          <li className="menu">
            <img src={LogoutIcon} alt="Logout Icon" />
            <h5 onClick={signOutUser}>ออกจากระบบ</h5>
          </li>
        </ul>
      </div>
    </div>
  );
}
