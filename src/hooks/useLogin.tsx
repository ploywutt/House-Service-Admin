import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.ts";
import axios from 'axios'
import { useProduct } from "@/contexts/productsContext.tsx";

function useLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isHaveEmail, setIsHaveEmail] = useState<boolean>(true)
  const { setIsSession }: any = useProduct(); 
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await axios.get(`http://localhost:4000/v1/admin/login?email=${email}`)
      if (result) {
        setIsHaveEmail(true)
        console.log(result)
        login();
      }
    } catch (error) {
      setIsHaveEmail(false)
      console.error(error)
    }
    setLoading(false);
  };

  async function login() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (data.session) {
        console.log(data)
        setIsValid(true);
        setIsSession(true)
        navigate("/categories");
      } else {
        setIsValid(false);
        console.error(error);
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isValid,
    loading,
    handleSubmit,
    setIsValid,
    setIsHaveEmail,
    isHaveEmail,
  };
}

export default useLogin;
