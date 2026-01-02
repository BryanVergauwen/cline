import { Boolean } from "@shared/proto/cline/common"
import { TogglePlanActModeRequest } from "@shared/proto/cline/state"
import { Controller } from ".."

/**
 * Toggles between Plan and Act modes
 * @param controller The controller instance
 * @param request The request containing the chat settings and optional chat content
 * @returns An empty response
 */
export async function togglePlanActModeProto(controller: Controller, request: TogglePlanActModeRequest): Promise<Boolean> {
	// Settings are frozen in this build. Ignore all incoming updates.
	void controller
	void request
	return Boolean.create({ value: false })
}
