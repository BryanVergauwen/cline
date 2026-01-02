import { Empty } from "@shared/proto/cline/common"
import { UpdateTaskSettingsRequest } from "@shared/proto/cline/state"
import { Controller } from ".."

/**
 * Updates task-specific settings for the current task
 * @param controller The controller instance
 * @param request The request containing the task settings to update
 * @returns An empty response
 */
export async function updateTaskSettings(controller: Controller, request: UpdateTaskSettingsRequest): Promise<Empty> {
	// Settings are frozen in this build. Ignore all incoming updates.
	void controller
	void request
	return Empty.create()
}
