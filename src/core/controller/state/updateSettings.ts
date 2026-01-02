import { Empty } from "@shared/proto/cline/common"
import { UpdateSettingsRequest } from "@shared/proto/cline/state"
import { Controller } from ".."

/**
 * Updates multiple extension settings in a single request
 * @param controller The controller instance
 * @param request The request containing the settings to update
 * @returns An empty response
 */
export async function updateSettings(controller: Controller, request: UpdateSettingsRequest): Promise<Empty> {
	// Settings are frozen in this build. Ignore all incoming updates.
	void controller
	void request
	return Empty.create()
}
