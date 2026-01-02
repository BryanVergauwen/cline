import { CheckpointRestoreRequest } from "@shared/proto/cline/checkpoints"
import { Empty } from "@shared/proto/cline/common"
import { Controller } from ".."

export async function checkpointRestore(controller: Controller, request: CheckpointRestoreRequest): Promise<Empty> {
	void controller
	void request
	return Empty.create({})
}
