import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.ts";

function useLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    login();
  };

  async function login() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (data.session) {
      console.log(data);
      setIsValid(true);
      navigate("/categories");
    } else {
      setIsValid(false);
      console.error(error);
    }
    setLoading(false);
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isValid,
    loading,
    handleSubmit,
  };
}

export default useLogin;
