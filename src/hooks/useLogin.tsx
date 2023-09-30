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
  const [role, SetRole] = useState<string>('Admin')
  const { session,setSession }: any = useProduct(); 
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (role === 'Admin') {
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:4000/v1/admin/login?email=${email}&role=${role}`)
        if (result) {
          setIsHaveEmail(true)
          console.log(result)
          login('categories');
        }
      } catch (error) {
        setIsHaveEmail(false)
        console.error(error)
      }
      setLoading(false);

    } else if (role === 'Technician') {
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:4000/v1/admin/login?email=${email}&role=${role}`)
        if (result) {
          setIsHaveEmail(true)
          console.log(result)
          login('employee');
        }
      } catch (error) {
        setIsHaveEmail(false)
        console.error(error)
      }
      setLoading(false);
    }
  };

  async function login(path: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (data.session) {
        console.log(data)
        setIsValid(true);
        sessionStorage.setItem('session', JSON.stringify(data.session.access_token));
        sessionStorage.setItem('refresh', JSON.stringify(data.session.refresh_token));
        const isAuthenticated = Boolean(sessionStorage.getItem("session"));
        setSession(isAuthenticated)
        console.log("session login", session)
        navigate(`/${path}`);
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
    role, SetRole,
  };
}

export default useLogin;
