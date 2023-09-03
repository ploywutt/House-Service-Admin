
// declare in global space
declare global {
	// JS object in the global namespace.
	namespace NodeJS {
		interface ProcessEnv {
			SAPUABASE_URL: string
			SUPABASE_ANON_KEY: string
			NODE_ENV: 'development' | 'production'
		}
	}
}

export {} // convert the file to a module