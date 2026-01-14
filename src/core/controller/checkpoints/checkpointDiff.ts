import { Empty, Int64Request } from "@shared/proto/cline/common"
import { Controller } from ".."

export async function checkpointDiff(controller: Controller, request: Int64Request): Promise<Empty> {
	void controller
	void request
	return Empty.create()
}
