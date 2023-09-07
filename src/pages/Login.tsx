import house from "../assets/house.png";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import useLogin from "../hooks/useLogin";
import { Loader2 } from "lucide-react";
import error from "../assets/error_icon.png";

function Login() {
  const {
    handleSubmit,
    isValid,
    email,
    setEmail,
    password,
    setPassword,
    loading,
  } = useLogin();

  return (
    <div className="mt-24">
      <div className="flex items-center justify-center gap-5 mb-11">
        <img src={house} alt="house" />
        <h1 className="text-[52px] font-medium text-blue-600">HomeServices</h1>
      </div>
      <div className="max-w-[620px] mx-auto pt-12 pb-24 px-[87px] border-2 bottom-2 rounded-lg bg-white">
        <h1 className="text-[32px] font-medium text-blue-950 text-center mb-4">
          เข้าสู่ระบบแอดมิน
        </h1>
        <form className="text-base font-medium" onSubmit={handleSubmit}>
          <div className="relative ">
            <Label htmlFor="email">
              Email<span className="text-[#C82438]">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              placeholder=""
              required
              className={`mt-2 mb-5 ${
                !isValid ? "border-[#C82438]" : "focus:border-blue-600"
              } focus:ring-1 focus-visible:ring-0 focus-visible:ring-offset-0`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <img
              src={error}
              alt="error"
              className={`${!isValid ? "absolute right-3 bottom-3" : "hidden"}`}
            />
          </div>
          <div className="relative">
            <Label htmlFor="password">
              Password<span className="text-[#C82438]">*</span>
            </Label>
            <Input
              type="password"
              id="password"
              placeholder=""
              required
              className={`mt-2 ${
                !isValid ? "border-[#C82438]" : "focus:border-blue-600"
              } focus:ring-1 focus-visible:ring-0 focus-visible:ring-offset-0`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={error}
              alt="error"
              className={`${!isValid ? "absolute right-3 bottom-3" : "hidden"}`}
            />
          </div>
          <p
            className={`${
              !isValid ? "text-[#C82438] font-normal text-xs mt-2" : "hidden"
            }`}
          >
            Wrong password or email!!
          </p>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 active:bg-blue-800 w-full mt-11 py-6 space-x-2"
          >
            <p>เข้าสู่ระบบ</p>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
