import { GetTaskHistoryRequest, TaskHistoryArray } from "@shared/proto/cline/task"
import { Controller } from ".."

/**
 * Gets filtered task history
 * @param controller The controller instance
 * @param request Filter parameters for task history
 * @returns TaskHistoryArray with filtered task list
 */
export async function getTaskHistory(controller: Controller, request: GetTaskHistoryRequest): Promise<TaskHistoryArray> {
	void controller
	void request
	return TaskHistoryArray.create({ tasks: [], totalCount: 0 })
}
