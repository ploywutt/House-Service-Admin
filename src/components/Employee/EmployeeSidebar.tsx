// import { useNavigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomeServiceIcon from "../../assets/icon/homeservices.png";
import LogoutIcon from "../../assets/icon/logout.svg";
import { supabase } from "../../lib/supabase.ts";
// import { useState, useEffect } from "react";
import ComingIcon from "../../assets/icon/coming.svg";
import Working from "../../assets/icon/working.svg";
import Success from "../../assets/icon/success.svg";
// import { useProduct } from "@/contexts/productsContext.tsx";

export default function EmployeeSidebar(props: any) {
  // const location = useLocation();
  const navigate = useNavigate();
  // const [activeLi, setActiveLi] = useState<string>("");
  // const { setSession }: any = useProduct();

  // สร้างอาร์เรย์ของ object ที่มี key = path และ value = state
  // const pathStatePairs = [
  //   { path: "/categories", state: "categories" },
  //   { path: "/services", state: "services" },
  //   { path: "/promotions", state: "promotions" },
  // ];

  // useEffect(() => {
  //   const matchingPair = pathStatePairs.find((pair) =>
  //     location.pathname.startsWith(pair.path)
  //   );
  //   setActiveLi(
  //     matchingPair ? matchingPair.state : location.pathname.split("/")[1]
  //   );
  // }, [location.pathname]);

  async function signOutUser() {
    await supabase.auth.signOut();
    localStorage.removeItem("session");
    localStorage.removeItem("refresh");
    // setSession(false);
    navigate("/");
  }

  return (
    <div
      id="container"
      className="flex-none w-[240px] h-screen bg-blue-950 pt-6 sticky top-0"
    >
      <div
        id="logo-bg"
        className="bg-blue-100 mb-7 rounded-xl flex flex-row items-center py-2 px-2.5 gap-1 mx-6"
      >
        <img src={HomeServiceIcon} alt="HomeServices Icon" id="logo" />
        <p className="text-blue-600 text-xl font-medium">HomeServices</p>
      </div>
      <div id="menu-list-container">
        <ul className="text-gray-100 h-[calc(100vh-109px)] flex flex-col justify-between">
          <div id="menu-list">
            <li
              className={` p-4 cursor-pointer flex flex-row gap-2 pl-6 ${
                props.comingwork ? "bg-blue-900" : ""
              }`}
              onClick={props.handleComingwork}
            >
              <img src={ComingIcon} className="w-[25px]" />
              รอดำเนินการ
            </li>

            <li
              className={` p-4 cursor-pointer flex flex-row gap-2 pl-6 ${
                props.working ? "bg-blue-900" : ""
              }`}
              onClick={props.handleWorking}
            >
              <img src={Working} className="w-[25px]" />
              กำลังดำเนินการ
            </li>
            <li
              className={` p-4 cursor-pointer flex flex-row gap-2 pl-6 ${
                props.success ? "bg-blue-900" : ""
              }`}
              onClick={props.handleSuccess}
            >
              <img src={Success} className="w-[25px]" />
              ดำเนินการสำเร็จ
            </li>
          </div>
          <li className="menu">
            <img src={LogoutIcon} alt="Logout Icon" />
            <h5 onClick={signOutUser}>ออกจากระบบ</h5>
          </li>
        </ul>
      </div>
    </div>
  );
}
