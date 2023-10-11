import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useEffect } from 'react'

import house from "../assets/house.png";
import error from "../assets/error_icon.png";

import useLogin from "../hooks/useLogin";

function Login() {
  const {
    handleSubmit,
    isValid,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setIsValid,
    setIsHaveEmail,
    isHaveEmail,
    role, SetRole
  } = useLogin();

  const selected = "rounded-xl bg-blue-600 py-1.5 px-8 text-white"

  function handleClick(role: string) {
    if (role === 'Admin') {
      SetRole('Admin')
    } else {
      SetRole("Technician")
    }
    console.log("Role: ", role)
  }

  useEffect(() => {
    setIsHaveEmail(true)
    setIsValid(true)
  }, [password, email])

  return (
    <div className="mt-24">
      <div className="flex items-center justify-center gap-5 mb-11">
        <img src={house} alt="house" />
        <h1 className="text-[52px] font-medium text-blue-600">HomeServices</h1>
      </div>
      <div className="max-w-[620px] mx-auto pt-12 pb-24 px-[87px] border-2 bottom-2 rounded-lg bg-white">
        <h1 className="text-[32px] font-medium text-blue-950 text-center mb-4">
          เข้าสู่ระบบ
        </h1>
        <div className="flex justify-evenly my-6 text-lg font-semibold">
          <h4
            className={`duration-300 hover:rounded-xl hover:bg-blue-600 py-1.5 px-8 hover:text-white hover:cursor-pointer ${role === "Admin" && selected}`}
            onClick={() => { handleClick('Admin') }}
          >
            Admin
          </h4>
          <h4
            className={`duration-300 hover:rounded-xl hover:bg-blue-600 py-1.5 px-8 hover:text-white hover:cursor-pointer ${role === "Technician" && selected}`}
            onClick={() => { handleClick('Technician') }}
          >
            Technician
          </h4>
        </div>
        <form className="text-base font-medium" onSubmit={handleSubmit}>
          <div className="relative ">
            <Label htmlFor="email" className="block">
              <h5>
                Email<span className="text-rose-700">*</span>
              </h5>
            </Label>
            <Input
              type="email"
              id="email"
              placeholder=""
              required
              className={`mt-2 ${!isHaveEmail ? "border-rose-700 focus:border-rose-700" : ""
                } w-full`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: !isHaveEmail ? "#C82438" : "" }}
            />
            <img
              src={error}
              alt="error"
              className={`${!isHaveEmail ? "absolute right-4 bottom-4" : "hidden"}`}
            />
          </div>
          <span
            className={`${!isHaveEmail ? "text-rose-700 font-normal text-xs mt-2" : "invisible"
              }`}
          >
            Cannot found this email!!
          </span>
          <div className="relative">
            <Label htmlFor="password" className="block">
              <h5>
                Password<span className="text-rose-700">*</span>
              </h5>
            </Label>
            <Input
              type="password"
              id="password"
              placeholder=""
              required
              className={`mt-2 ${!isValid ? "border-rose-700 focus:border-rose-700" : null
                } w-full`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: !isValid ? "#C82438" : "" }}
            />
            <img
              src={error}
              alt="error"
              className={`${!isValid ? "absolute right-4 bottom-4" : "hidden"}`}
            />
          </div>
          <span
            className={`${!isValid ? "text-rose-700 font-normal text-xs mt-2" : "invisible"
              }`}
          >
            Wrong password!!
          </span>
          <Button type="submit" className=" w-full mt-7 space-x-2">
            <p>เข้าสู่ระบบ</p>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
