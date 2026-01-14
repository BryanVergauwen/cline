import type React from "react"
import { createContext, useContext } from "react"

// Define User type (you may need to adjust this based on your actual User type)
export interface ClineUser {
	uid: string
	email?: string
	displayName?: string
	photoUrl?: string
	appBaseUrl?: string
}

export interface ClineAuthContextType {
	clineUser: ClineUser | null
	organizations: null
	activeOrganization: null
}

export const ClineAuthContext = createContext<ClineAuthContextType | undefined>(undefined)

const DEFAULT_AUTH_CONTEXT: ClineAuthContextType = {
	clineUser: null,
	organizations: null,
	activeOrganization: null,
}

export const ClineAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ClineAuthContext.Provider
			value={{
				...DEFAULT_AUTH_CONTEXT,
			}}>
			{children}
		</ClineAuthContext.Provider>
	)
}

export const useClineAuth = () => {
	const context = useContext(ClineAuthContext)
	return context ?? DEFAULT_AUTH_CONTEXT
}
