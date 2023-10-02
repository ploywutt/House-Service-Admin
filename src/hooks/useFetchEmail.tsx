import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

function useFetchEmail() {
  const [currentLoginEmail, setCurrentLoginEmail] = useState<string | null>(
    null
  );

  console.log("Fetch Email", currentLoginEmail);

  useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log("SPB getEmail", user?.email);
        setCurrentLoginEmail(user?.email || null);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);

  return currentLoginEmail;
}

export default useFetchEmail;
