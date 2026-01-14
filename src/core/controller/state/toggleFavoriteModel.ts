import { Empty, StringRequest } from "@shared/proto/cline/common"
import { Controller } from ".."

/**
 * Toggles a model's favorite status
 * @param controller The controller instance
 * @param request The request containing the model ID to toggle
 * @returns An empty response
 */
export async function toggleFavoriteModel(controller: Controller, request: StringRequest): Promise<Empty> {
	// Settings are frozen in this build. Ignore all incoming updates.
	void controller
	void request
	return Empty.create()
}
