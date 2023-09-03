import { Button } from "@/components/ui/button"
import { supabase } from "@/supabase"
import { useNavigate } from "react-router-dom"

function Testing() {
	const navigate = useNavigate()

	async function signOut() {
		const { error } = await supabase.auth.signOut()
		navigate('/')
	}
	

	return (
		<Button onClick={signOut}>Sign Out</Button>
	)
}

export default Testing