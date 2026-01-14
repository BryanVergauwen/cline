import { ApiConfiguration } from "@shared/api"
import { Mode } from "@shared/storage/types"

export function validateApiConfiguration(currentMode: Mode, apiConfiguration?: ApiConfiguration): string | undefined {
	void currentMode
	void apiConfiguration
	// Ollama-only build: no settings validation required
	return undefined
}
