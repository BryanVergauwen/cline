import { ApiConfiguration, ApiProvider } from "@shared/api"
import PROVIDERS from "@shared/providers/providers.json"

/**
 * Returns a list of API providers that are configured (have required credentials/settings)
 * Based on validation logic from validate.ts
 */
export function getConfiguredProviders(apiConfiguration: ApiConfiguration | undefined): ApiProvider[] {
	const configured: ApiProvider[] = []

	if (!apiConfiguration) {
		return ["ollama"]
	}

	// Ollama-only build
	configured.push("ollama")

	return configured
}

/**
 * Get provider display label from provider value
 * Uses the canonical providers.json as source of truth
 */
export function getProviderLabel(provider: ApiProvider): string {
	const providerEntry = PROVIDERS.list.find((p) => p.value === provider)
	return providerEntry?.label || provider
}
